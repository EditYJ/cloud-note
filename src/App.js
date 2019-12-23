import { Col, Row } from 'antd'
import FileList from 'components/FileList'
import FileSearch from 'components/FileSearch'
import 'easymde/dist/easymde.min.css'
import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import fileHelper from 'utils/fileHelper'
import uuidv4 from 'uuid/v4'
import './App.scss'
import LeftBtnGroup from './components/LeftBtnGroup'
import TabList from './components/TabList'

// 引入node.js相关
const { join } = window.require('path')
const { remote } = window.require('electron')
const Store = window.require('electron-store')

// 本地持久化
const fileStore = new Store({ name: 'Files-Data' })
const saveFilesToStore = files => {
  const filesStoreArr = files.reduce((result, file) => {
    const { id, path, title, createdAt } = file
    result.push({
      id,
      path,
      title,
      createdAt
    })
    return result
  }, [])
  fileStore.set('files', filesStoreArr)
}

function App() {
  const [files, setFiles] = useState(fileStore.get('files') || []) // 所有文件
  const [activeFileId, setActiveFileId] = useState('') //当前选中的文件
  const [openedFileIds, setOpenedFileIds] = useState([]) // 当前打开的文件
  const [unsavedFileIds, setUnsavedFileIds] = useState([]) // 未保存的文件
  const [searchFileList, setSearchFileList] = useState([]) // 搜索的文件列表

  // 默认保存文档路径
  const saveLocation = remote.app.getPath('documents')
  // 左侧列表显示的文件列表
  const leftFilesList = searchFileList.length > 0 ? searchFileList : files

  const openFiles = files.filter(file => openedFileIds.includes(file.id))

  const activeFile = files.find(file => file.id === activeFileId)

  const fileClick = fileId => {
    let clickIndex = 0
    const currentFile = files.find(file => file.id === fileId)
    const filesChange = files.filter((file, index) => {
      const T = file.id === fileId
      if (T) {
        clickIndex = index
      }
      return !T
    })
    if (!currentFile.isLoaded) {
      fileHelper.readFile(join(currentFile.path)).then(val => {
        const newFile = { ...currentFile, body: val, isLoaded: true }
        filesChange.splice(clickIndex, 0, newFile)
        setFiles(filesChange)
      })
    }
    // 设置当前激活的文件
    setActiveFileId(fileId)
    // 存入打开的文件数组
    if (!openedFileIds.includes(fileId)) {
      setOpenedFileIds([...openedFileIds, fileId])
    }
  }

  const tabClick = fileId => {
    // 设置当前激活的文件
    setActiveFileId(fileId)
  }

  const closeTab = fileId => {
    // 减去关闭的文件id
    const ids = openedFileIds.filter(openedFileId => openedFileId !== fileId)
    setOpenedFileIds(ids)

    //设置激活的tab
    if (ids.length > 0) {
      setActiveFileId(ids[0])
    } else {
      setActiveFileId('')
    }
  }

  const fileChange = (changeFileid, changeContent) => {
    // 更新文件内容
    const newFiles = files.map(file => {
      if (file.id === changeFileid) {
        file.body = changeContent
      }
      return file
    })
    setFiles(newFiles)
    // 更新未保存id
    if (!unsavedFileIds.includes(changeFileid)) {
      setUnsavedFileIds([...unsavedFileIds, changeFileid])
    }
  }

  // 删除文件
  const fileDelete = fileId => {
    const deleteFile = files.find(file => file.id === fileId)
    const deleteFileTitle = deleteFile.title
    const newFiles = files.filter(file => file.id !== fileId)
    const newSearchFiles = searchFileList.filter(file => file.id !== fileId)
    if (deleteFile.isNew) {
      setFiles(newFiles)
      setSearchFileList(newSearchFiles)
    } else {
      fileHelper
        .deleteFile(join(saveLocation, `${deleteFileTitle}.md`))
        .then(() => {
          console.log(`${deleteFileTitle}.md文件删除成功！`)
          saveFilesToStore(newFiles)
          setFiles(newFiles)
          setSearchFileList(newSearchFiles)
          closeTab(fileId)
        })
    }
  }

  const editFileTitle = (fileId, newTitle, isNew) => {
    let isExist = false
    let editIndex = -1
    const newPath = join(saveLocation, `${newTitle}.md`)
    const newFiles = files.map((file, index) => {
      const newFile = { ...file }
      if (file.id === fileId) {
        newFile.title = newTitle
        newFile.isNew = false
        newFile.path = newPath
        editIndex = index
      }
      return newFile
    })

    files.forEach(file => {
      if (file.title.trim() === newTitle.trim()) {
        isExist = true
        console.log('已存在的文件名')
      }
    })

    if (isNew && !isExist) {
      // 如果是新建
      fileHelper
        .writeFile(
          join(saveLocation, `${newTitle}.md`),
          newFiles[editIndex].body
        )
        .then(() => {
          saveFilesToStore(newFiles)
          setFiles(newFiles)
        })
        .catch(err => {
          console.log('err', err)
        })
    } else if (!isExist) {
      //如果是更新
      fileHelper
        .renameFile(
          join(saveLocation, `${files[editIndex].title}.md`),
          join(saveLocation, `${newTitle}.md`)
        )
        .then(() => {
          saveFilesToStore(newFiles)
          setFiles(newFiles)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }

  const searchFiles = keyWords => {
    const newFiles = files.filter(file => file.title.indexOf(keyWords) > -1)
    setSearchFileList(newFiles)
  }

  // 点击新建按钮
  const newFileBtnClick = () => {
    const uuid = uuidv4()
    const newFiles = [
      {
        id: uuid,
        title: '',
        description: '',
        body: '## 请输入需要记录的内容',
        createdAt: new Date().getTime(),
        isNew: true
      },
      ...files
    ]
    setFiles(newFiles)
  }

  // 保存按钮
  const saveEditText = editor => {
    console.log('修改前文件内容：', editor.options.initialValue)
    console.log('当前编辑框内容：', activeFile && activeFile.body)
    // const initContent = editor.options.initialValue
    const tempContent = activeFile && activeFile.body

    fileHelper
      .writeFile(join(saveLocation, `${activeFile.title}.md`), tempContent)
      .then(() => {
        const newUnsavedFileIds = unsavedFileIds.filter(id => {
          return id !== activeFile.id
        })
        setUnsavedFileIds(newUnsavedFileIds)
        console.log('保存成功！')
      })
  }

  const importBtnClick = () => {
    remote.dialog.showOpenDialog({
      title: '选择 MarkDown 文件',
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'MarkDown Files', extensions: ['md', 'MD'] }]
    }).then(filePaths=>{
      console.log(filePaths)
    })
  }
  return (
    <div className="App">
      <Row>
        <Col span={6} className="left-panel">
          <FileSearch onFileSearch={searchFiles} />
          <LeftBtnGroup
            newFileBtnState={files[0]?.isNew}
            onNewFileBtnClick={newFileBtnClick}
            onImportBtnClick={importBtnClick}
            className="leftBtnGroup"
          />

          <FileList
            files={leftFilesList}
            onFileClick={fileClick}
            onFileDelete={fileDelete}
            onSaveEdit={editFileTitle}
            activeId={activeFileId}
          />
        </Col>
        <Col span={18} style={{ padding: '0 7px' }}>
          {!activeFile && (
            <div className="start-page">选择或者创建新的 MarkDown 文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                activeId={activeFileId}
                files={openFiles}
                unsaveIds={unsavedFileIds}
                onTabClick={tabClick}
                onCloseTab={closeTab}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={value => {
                  console.log('SimpleMDE-onChange', value)
                  fileChange(activeFile.id, value)
                }}
                options={{
                  minHeight: '600px',
                  toolbar: [
                    'undo',
                    'redo',
                    {
                      name: 'save',
                      action: saveEditText,
                      className: 'fa fa-save',
                      title: '保存'
                    },
                    '|',
                    'bold',
                    'italic',
                    'heading',
                    '|',
                    'code',
                    'quote',
                    'unordered-list',
                    'ordered-list',
                    '|',
                    'link',
                    'image',
                    '|',
                    'preview',
                    'side-by-side',
                    'fullscreen'
                  ]
                }}
              />
            </>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default App

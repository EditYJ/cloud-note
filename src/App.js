import { Col, Row } from 'antd'
import FileList from 'components/FileList'
import FileSearch from 'components/FileSearch'
import 'easymde/dist/easymde.min.css'
import React, { useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import defaultFiles from 'utils/defaultFiles'
import { flattenArr, objToArr } from 'utils/helper'
import uuidv4 from 'uuid/v4'
import './App.scss'
import LeftBtnGroup from './components/LeftBtnGroup'
import TabList from './components/TabList'


function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles)) // 所有文件
  const [activeFileId, setActiveFileId] = useState('') //当前选中的文件
  const [openedFileIds, setOpenedFileIds] = useState([]) // 当前打开的文件
  const [unsavedFileIds, setUnsavedFileIds] = useState([]) // 未保存的文件
  const [searchFileList, setSearchFileList] = useState([]) // 搜索的文件列表
  const filesArr = objToArr(files)
  // console.log('files', files)
  // console.log('filesArr', filesArr)

  // 左侧列表显示的文件列表
  const leftFilesList = searchFileList.length > 0 ? searchFileList : filesArr
  // 打开的文件列表
  const openFiles = openedFileIds.map(openId => files[openId])
  // 当前激活的文件标签
  const activeFile = files[activeFileId]

  const fileClick = fileId => {
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
    const newFile = { ...files[changeFileid], body: changeContent }
    const newFiles = { ...files, [changeFileid]: newFile }
    // 更新文件内容
    setFiles(newFiles)
    // 更新未保存id
    if (!unsavedFileIds.includes(changeFileid)) {
      setUnsavedFileIds([...unsavedFileIds, changeFileid])
    }
  }

  const fileDelete = fileId => {
    const newSearchFiles = searchFileList.filter(file => file.id !== fileId)
    delete files[fileId]
    setFiles(files)
    setSearchFileList(newSearchFiles)
    closeTab(fileId)
  }

  const editFileTitle = (fileId, newTitle) => {
    const newFile = { ...files[fileId], title: newTitle, isNew: false }
    const newFiles = { ...files, [fileId]: newFile }
    setFiles(newFiles)
  }

  const searchFiles = keyWords => {
    const newFiles = files.filter(file => file.title.indexOf(keyWords) > -1)
    setSearchFileList(newFiles)
  }

  // 点击新建按钮
  const newFileBtnClick = () => {
    if (!filesArr[0].isNew) {
      const uuid = uuidv4()
      const newFile = {
        id: uuid,
        title: '',
        description: '',
        body: '## 请输入需要记录的内容',
        createdAt: new Date().getTime(),
        isNew: true
      }
      const newFiles = { ...files, [uuid]: newFile }
      setFiles(newFiles)
    }
  }

  return (
    <div className="App">
      <Row>
        <Col span={6} className="left-panel">
          <FileSearch onFileSearch={searchFiles} />
          <LeftBtnGroup
            newFileBtnState={filesArr[0].isNew}
            onNewFileBtnClick={newFileBtnClick}
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
                  fileChange(activeFile.id, value)
                }}
                options={{
                  minHeight: '600px'
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

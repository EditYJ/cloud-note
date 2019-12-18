import React, { useState } from 'react'
import FileSearch from 'components/FileSearch'
import FileList from 'components/FileList'
import { Row, Col } from 'antd'
import defaultFiles from 'utils/defaultFiles'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import './App.scss'
import LeftBtnGroup from './components/LeftBtnGroup'
import TabList from './components/TabList'

function App() {
  const [files, setFiles] = useState(defaultFiles) // 所有文件
  const [activeFileId, setActiveFileId] = useState('') //当前选中的文件
  const [openedFileIds, setOpenedFileIds] = useState([]) // 当前打开的文件
  const [unsavedFileIds, setUnsavedFileIds] = useState([]) // 未保存的文件

  const openFiles = files.filter(file => openedFileIds.includes(file.id))

  const activeFile = files.find(file => file.id === activeFileId)

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
    const ids = openedFileIds.filter(openedFileId => {
      return openedFileId !== fileId
    })
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

  return (
    <div className="App">
      <Row>
        <Col span={6} className="left-panel">
          <FileSearch
            onFileSearch={value => {
              console.log(value)
            }}
          />
          <LeftBtnGroup className="leftBtnGroup" />

          <FileList
            files={files}
            onFileClick={fileClick}
            onFileDelete={id => {
              console.log(id)
            }}
            onSaveEdit={(id, value) => {
              console.log(id, value)
            }}
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

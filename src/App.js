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
  const [activeId, setActiveId] = useState('1')

  return (
    <div className="App">
      <Row>
        <Col
          span={6}
          style={{ borderRight: 'solid 1px #ebedf0', padding: '0 7px' }}
        >
          <FileSearch
            onFileSearch={value => {
              console.log(value)
            }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={id => {
              console.log(id)
            }}
            onFileDelete={id => {
              console.log(id)
            }}
            onSaveEdit={(id, value) => {
              console.log(id, value)
            }}
          />
          <LeftBtnGroup />
        </Col>
        <Col span={18} style={{ padding: '0 7px' }}>
          <TabList
            activeId={activeId}
            files={defaultFiles}
            onTabClick={id => {
              console.log('Tab: ', id)
              setActiveId(id)
            }}
            onCloseTab={id => {
              console.log('Close: ', id)
            }}
          />
          <SimpleMDE
            value={defaultFiles[1].body}
            onChange={value => {
              console.log(value)
            }}
            options={{
              minHeight: '600px'
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default App

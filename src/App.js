import React from 'react'
import FileSearch from 'components/FileSearch'
import FileList from 'components/FileList'
import { Row, Col } from 'antd'
import defaultFiles from 'utils/defaultFiles'

import './App.scss'
import LeftBtnGroup from './components/LeftBtnGroup'
import TabList from './components/TabList'

function App() {
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
        <Col span={18} style={{padding: '0 7px' }}>
          <TabList files={defaultFiles}/>
        </Col>
      </Row>
    </div>
  )
}

export default App

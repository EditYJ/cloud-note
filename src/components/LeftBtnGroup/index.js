import React from 'react'
import { Button, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { NewFileIcon, ImportIcon } from 'components/icons'

import './index.scss'

const LeftBtnGroup = ({ newFileBtnState, onNewFileBtnClick, onImportBtnClick }) => {
  return (
    <Row className="leftBtnGroup">
      <Col span={12}>
        <Button
        disabled={newFileBtnState}
          onClick={e => {
            onNewFileBtnClick(e)
          }}
          type="primary"
          block
          className="newFileBtn"
        >
          <NewFileIcon className="icon" />新 建
        </Button>
      </Col>
      <Col span={12}>
        <Button
          onClick={e => {
            onImportBtnClick(e)
          }}
          type="dashed"
          block
          className="importBtn"
        >
          <ImportIcon className="icon" />导 入
        </Button>
      </Col>
    </Row>
  )
}

LeftBtnGroup.propTypes = {
  onNewFileBtnClick: PropTypes.func,
  onImportBtnClick: PropTypes.func,
  newFileBtnState: PropTypes.bool
}

LeftBtnGroup.defaultProps = {
  onNewFileBtnClick: e => {
    console.log('点击了新建按钮')
  },
  onImportBtnClick: e => {
    console.log('点击了导入按钮')
  },
  newFileBtnState: false
}

export default LeftBtnGroup

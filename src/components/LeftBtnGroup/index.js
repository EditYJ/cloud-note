import React, { useState, useEffect } from 'react'
import { Button, Icon, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { NewFileIcon, ImportIcon } from 'components/icons'

const LeftBtnGroup = () => {
  return (
    <Row>
      <Col span={12}>
        <Button
          type="primary"
          block
          style={{
            backgroundColor: '#269d40',
            borderBottomRightRadius: '0',
            borderTopRightRadius: '0'
          }}
        >
          <NewFileIcon style={{ color: 'white', fontSize: '18px' }} />新 建
        </Button>
      </Col>
      <Col span={12}>
        <Button
          type="primary"
          block
          style={{ borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}
        >
          <ImportIcon style={{ color: 'white', fontSize: '18px' }} />导 入
        </Button>
      </Col>
    </Row>
  )
}

export default LeftBtnGroup

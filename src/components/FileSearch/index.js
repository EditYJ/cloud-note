import React, { useState } from 'react'
import { Input, Icon } from 'antd'
import PropTypes from 'prop-types'

import './index.scss'

const FileSearch = ({ onFileSearch }) => {
  const { Search } = Input

  const [inputValue, setInputValue] = useState('')

  return (
    <div className="FileSearch">
      <Search
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value)
        }}
        placeholder="搜索我的云文档"
        onSearch={value => onFileSearch(value)}
        enterButton={<Icon type="file-search" />}
        allowClear
      />
    </div>
  )
}

FileSearch.propTypes = {
  onFileSearch: PropTypes.func
}

FileSearch.defaultProps = {
  onFileSearch: value => {
    console.log('搜索关键字为：', value)
  }
}

export default FileSearch

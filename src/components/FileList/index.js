import React, { useState, useEffect } from 'react'
import { List, Icon, Button, Input } from 'antd'
import useKeyPress from 'hooks/useKeyPress'
import PropTypes from 'prop-types'

import './index.scss'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  // eslint-disable-next-line
  useEffect(() => {
    if (enterPressed && editStatus) {
      const editItem = files.find(file => file.id === editStatus)
      onSaveEdit(editItem.id, value)
      setEditStatus(false)
      setValue('')
    } else if (escPressed && editStatus) {
      setEditStatus(false)
      setValue('')
    }
  })

  const actionsButtonGroup = file => [
    <Button
      icon="edit"
      size="small"
      onClick={() => {
        setEditStatus(file.id)
        setValue(file.title)
      }}
    />,
    <Button
      type="danger"
      icon="delete"
      size="small"
      onClick={() => {
        onFileDelete(file.id)
      }}
    />
  ]

  const itemTitleContent = file => {
    return file.id !== editStatus ? (
      <span
        className="fileList-title"
        onClick={() => {
          onFileClick(file.id)
        }}
      >
        {file.title}
      </span>
    ) : (
      <Input
        value={value}
        size="small"
        onChange={e => {
          setValue(e.target.value)
        }}
        placeholder="edit title"
        allowClear
      />
    )
  }

  return (
    <div className="fileList">
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={files}
        renderItem={file => (
          <List.Item actions={actionsButtonGroup(file)}>
            <List.Item.Meta
              avatar={
                <Icon
                  className="fileList-icon"
                  type="file-markdown"
                  theme="filled"
                />
              }
              title={itemTitleContent(file)}
              // description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func
}

FileList.defaultProps = {
  onFileClick: fileId => {
    console.log('点击的列表项id为：', fileId)
  },
  onFileDelete: fileId => {
    console.log(`点击了id为 ${fileId} 列表项的删除按钮`)
  },
  onSaveEdit: (fileId, value) => {
    console.log(`保存id为 ${fileId} 列表项的新文件名 ${value}`)
  }
}

export default FileList

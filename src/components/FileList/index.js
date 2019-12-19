import { Button, Icon, Input, List } from 'antd'
import classNames from 'classnames'
import useKeyPress from 'hooks/useKeyPress'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import './index.scss'

const FileList = ({
  activeId,
  files,
  onFileClick,
  onSaveEdit,
  onFileDelete
}) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  // eslint-disable-next-line
  useEffect(() => {
    const editItem = files.find(file => file.id === editStatus)
    if (enterPressed && editStatus && value.trim() !== '') {
      onSaveEdit(editItem.id, value)
      setEditStatus(false)
      setValue('')
    } else if (escPressed && editStatus) {
      setEditStatus(false)
      setValue('')
      // 如果有isNew属性
      if (editItem.isNew) {
        onFileDelete(editItem.id)
      }
    }
  })

  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    console.log('newFile==>', newFile)
    if (newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])

  const actionsButtonGroup = file =>
    file.id === editStatus || file.isNew
      ? [
          <Button
            type="danger"
            icon="delete"
            size="small"
            onClick={() => {
              onFileDelete(file.id)
            }}
          />
        ]
      : [
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
    return file.id === editStatus || file.isNew ? (
      <Input
        keyCode={file.id}
        value={value}
        size="small"
        onChange={e => {
          setValue(e.target.value)
        }}
        placeholder="输入名称"
        allowClear
      />
    ) : (
      <span
        className="fileList-title"
        onClick={() => {
          onFileClick(file.id)
        }}
      >
        {file.title}
      </span>
    )
  }

  return (
    <div className="fileList">
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={files}
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 14,
          simple: true
        }}
        renderItem={file => {
          const activeClassName = classNames({
            active: activeId === file.id
          })
          return (
            <List.Item
              actions={actionsButtonGroup(file)}
              className={activeClassName}
            >
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
          )
        }}
      />
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func,
  activeId: PropTypes.string
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
  },
  activeId: ''
}

export default FileList

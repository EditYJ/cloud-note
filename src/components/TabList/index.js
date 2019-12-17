import React from 'react'
import { Tabs, Icon } from 'antd'
import { DiscIcon } from 'components/icons'

const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
  const { TabPane } = Tabs

  const callback = key => {
    console.log(key)
  }

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={callback}
      size="small"
      animated={false}
      tabBarGutter={2}
    >
      {files.map(file => {
        return (
          <TabPane
            tab={
              <div>
                <span>{file.title}</span>
                <Icon type="close" style={{marginLeft: '5px'}}/>
                {/* <DiscIcon /> */}
              </div>
            }
            key={file.id}
          >
            {file.body}
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default TabList

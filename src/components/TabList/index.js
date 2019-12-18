import { Tabs } from 'antd'
import classNames from 'classnames'
import { DiscIcon, TimesIcon } from 'components/icons'
import PropTypes from 'prop-types'
import React from 'react'
import './index.scss'


const TabList = ({ files, activeId, unsaveIds, onTabClick, onCloseTab }) => {
  const { TabPane } = Tabs

  return (
    <Tabs
      className="tabList"
      defaultActiveKey="1"
      onChange={id => onTabClick(id)}
      activeKey={activeId}
      size="small"
      animated={false}
      tabBarGutter={2}
      tabBarStyle={{margin: '0px'}}
    >
      {files.map(file => {
        const withUnsavedMark = unsaveIds.includes(file.id)
        const TabPaneClassName = classNames({
          tabPane: true,
          withUnsaved: withUnsavedMark
        })
        const TimesIconClassName = classNames({
          'close-icon': true,
          active: file.id === activeId
        })
        return (
          <TabPane
            tab={
              <div className={TabPaneClassName}>
                <span>{file.title}</span>
                <TimesIcon
                  className={TimesIconClassName}
                  onClick={e => {
                    e.stopPropagation()
                    onCloseTab(file.id)
                  }}
                />
                {withUnsavedMark && <DiscIcon className="unsave-icon" />}
              </div>
            }
            key={file.id}
          >
            
          </TabPane>
        )
      })}
    </Tabs>
  )
}

TabList.propTypes = {
  files: PropTypes.array,
  activeId: PropTypes.string.isRequired,
  unsaveIds: PropTypes.array,
  onTabClick: PropTypes.func,
  onCloseTab: PropTypes.func
}

TabList.defaultProps = {
  files: [],
  unsaveIds: [],
  onTabClick: () => {},
  onCloseTab: () => {}
}

export default TabList

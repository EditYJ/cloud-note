import { Icon } from 'antd'
import React from 'react'

// 实心圆图标
const DiscSVG = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path
      d="M518.189979 512m-446.883957 0a436.706 436.706 0 1 0 893.767913 0 436.706 436.706 0 1 0-893.767913 0Z"
      p-id="10085"
    ></path>
  </svg>
)

const DiscIcon = props => <Icon component={DiscSVG} {...props} />

export default DiscIcon

import { Icon } from 'antd'
import React from 'react'

// ×图标
const TimesSVG = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path
      d="M726.484852 660.650694a46.549275 46.549275 0 0 1-65.834584 65.834585L511.999787 577.877464l-148.650481 148.607815a46.421275 46.421275 0 0 1-65.834585 0 46.549275 46.549275 0 0 1 0-65.834585L446.122536 512.000213 297.514721 363.349732a46.549275 46.549275 0 1 1 65.834585-65.834584L511.999787 446.122962l148.650481-148.607814a46.549275 46.549275 0 0 1 65.834584 65.834584L577.877038 512.000213l148.607814 148.650481z m257.279678-347.946232a510.250029 510.250029 0 0 0-109.738529-162.730463A510.207362 510.207362 0 0 0 511.999787 0.000853a510.207362 510.207362 0 0 0-362.026214 149.973146A510.250029 510.250029 0 0 0 0.000427 512.000213a510.250029 510.250029 0 0 0 149.973146 362.026214A510.250029 510.250029 0 0 0 511.999787 1023.999573a510.250029 510.250029 0 0 0 362.026214-149.973146A510.250029 510.250029 0 0 0 1023.999147 512.000213c0-69.119914-13.525316-136.149163-40.234617-199.295751z"
      p-id="3191"
    ></path>
  </svg>
)

const TimesIcon = props => <Icon component={TimesSVG} {...props} />

export default TimesIcon
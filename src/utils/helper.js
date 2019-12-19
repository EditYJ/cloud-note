// 数组转obj， 打平数据结构
export const flattenArr = arr => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}

// 排序函数
const sortFunc = (a, b) => b.createdAt - a.createdAt

export const objToArr = obj => {
  return Object.keys(obj).map(key => obj[key]).sort(sortFunc)
}

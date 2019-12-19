const fs = window.require('fs').promises

const fileHelper = {
  readFile: path => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content)
  },
  renameFile: (path, newName) => {
    return fs.rename(path, newName)
  },
  deleteFile: path => {
    return fs.unlink(path)
  }
}

export default fileHelper

// const testPath = path.join(__dirname, 'defaultFiles.js')
// const testWritePath = path.join(__dirname, 'update.md')

// fileHelper
//   .readFile(testPath)
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.log(`发生错误: ${err}`)
//   })

// fileHelper
//   .writeFile(testWritePath, '## hello world')
//   .then(() => {
//     console.log('写入成功')
//   })
//   .catch(err => {
//     console.log(`发生错误: ${err}`)
//   })

// fileHelper.renameFile(testWritePath, 'update.md').then(() => {
//   console.log('重命名成功')
// })

// fileHelper.deleteFile(testWritePath).then(() => {
//   console.log('删除文件成功')
// })

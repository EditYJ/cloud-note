const { addWebpackAlias, override, fixBabelImports } = require('customize-cra')

const path = require('path')

function pathResolve(pathUrl) {
  return path.join(__dirname, pathUrl)
}

module.exports = override(
  addWebpackAlias({
    '@': pathResolve('./src'),
    assets: pathResolve('./src/assets'),
    components: pathResolve('./src/components'),
    utils: pathResolve('./src/utils'),
    layout: pathResolve('./src/layout'),
    pages: pathResolve('./src/pages'),
    style: pathResolve('./src/assets/style'),
    reducer: pathResolve('./src/reducer'),
    store: pathResolve('./src/store'),
    action: pathResolve('./src/action'),
    hooks: pathResolve('./src/hooks')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)

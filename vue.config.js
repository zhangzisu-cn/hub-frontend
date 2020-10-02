/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require('webpack')
const gitRevision = require('git-revision')

module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        GIT_HASH: JSON.stringify(gitRevision('hash')),
        GIT_BRANCH: JSON.stringify(gitRevision('branch')),
        BUILD_DATE: JSON.stringify(new Date().toLocaleString())
      })
    ]
  },
  transpileDependencies: ['vuetify']
}

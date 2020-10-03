/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require('webpack')
const gitRevision = require('git-revision')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      title: 'ZhangZisu.CN Hub'
    },
    embed: {
      entry: 'src/embed.ts',
      template: 'public/embed.html',
      title: 'ZhangZisu.CN Hub Embed'
    }
  },
  devServer: {
    proxy: 'http://localhost:3000',
    allowedHosts: ['.zhangzisu.cn']
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

'use strict'
const fs = require('fs')

class PathReplacePlugin {

  constructor(sourcePath) {
    this.sourcePath = sourcePath
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      const data = fs.readFileSync(this.sourcePath, 'utf-8').replace(/([\/,\w,\.]*\.css)|([\/,\w,\.]*\.js)/gi, (match, location) => {
        return match.replace(/^\//, '')
      })
      fs.writeFileSync(this.sourcePath, data, 'utf-8')
    })
  }
}

module.exports = PathReplacePlugin
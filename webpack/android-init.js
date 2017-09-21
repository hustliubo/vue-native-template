'use strict'
const fs = require("fs")
const path = require("path")
const rmdir = require("rmdir")
const mkdirp = require("mkdirp")
const copydir = require("copy-dir")

class AndroidInitPlugin {

  constructor(assetPath, androidPath, configPath) {
    this.assetPath = assetPath
    this.androidPath = androidPath
    this.configs = JSON.parse(fs.readFileSync(configPath, "utf8"))
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      const  { name, version, applicationId } = this.configs
      const packageNameReplacePaths = [
        path.join(this.androidPath, "app", "src", "main", "AndroidManifest.xml"),
        path.join(this.androidPath, "app", "src", "main", "java", "me", "tom", "vue", "template", "MainActivity.java"),
      ]
      packageNameReplacePaths.forEach((packageNameReplacePath) => {
        fs.writeFileSync(
          packageNameReplacePath,
          fs.readFileSync(packageNameReplacePath, "utf8").replace(/{{PackageName}}/g, applicationId),
          "utf8"
        )
      })
      const appValuesResPath = path.join(this.androidPath, "app", "src", "main", "res", "values", "strings.xml")
      fs.writeFileSync(
        appValuesResPath,
        fs.readFileSync(appValuesResPath, "utf8").replace(/{{AppName}}/g, name),
        "utf8"
      )

      const buildGradlePath = path.join(this.androidPath, "app", "build.gradle")
      fs.writeFileSync(
        buildGradlePath,
        fs.readFileSync(buildGradlePath, "utf8")
          .replace(/{{PackageName}}/g, applicationId)
          .replace(/{{versionName}}/g, version)
          .replace(/{{versionCode}}/g, `${version.replace(/\./g, '0')}2`),
        "utf8"
      )

      const androidAssetsPath = path.join(this.androidPath, "app", "src", "main", "assets", "www")
      rmdir(androidAssetsPath, () => {
        mkdirp.sync(androidAssetsPath)
        copydir.sync(this.assetPath, androidAssetsPath)
      })
    })
  }
}

module.exports = AndroidInitPlugin
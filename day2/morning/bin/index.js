#! node

import fs from 'fs'
import { createIndexTemplate } from './indexTemplate.js'
import { createPackage } from './packageTemplate.js'
import customInput from './getCustomConfig/index.js'
import execa from 'execa'
import path from 'path'
import open from 'open'
// // 创建文件夹
fs.mkdirSync(getRootPath())

// // 创建各自对应的文件

fs.writeFileSync(getRootPath()+'/index.js',createIndexTemplate(customInput))
fs.writeFileSync(getRootPath()+'/package.json',createPackage(customInput))
// 安装依赖
await execa('npm install', {
    cwd: getRootPath(),
    stdio: [2,2,2]
})
// await spawn('node', {cmd: `./${customInput.packageName}/index.js`})
open(`http://localhost:${ customInput.port }`)

function getRootPath(){
    // console.log(process.cwd());
    return path.resolve(process.cwd(),customInput.packageName)
}

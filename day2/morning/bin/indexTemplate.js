import ejs from 'ejs'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import prettier from 'prettier'
 export function createIndexTemplate(inputConfig){
    const __dirname = fileURLToPath(import.meta.url)
    const template = fs.readFileSync(path.resolve(__dirname, '../template/index.ejs'),'utf-8')
    const code = ejs.render(template, {
        static: inputConfig.middleware[0] || '',
        router: inputConfig.middleware[1] || '',
        port: inputConfig.port
    })
    return prettier.format(code, {
        parser: "babel",
      });
}
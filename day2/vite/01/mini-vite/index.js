

const Koa = require('koa')
const fs = require('fs')
const path = require("path")
const app = new Koa();
app.use((ctx) => {
  const { url } = ctx.request
  if (url === '/'){
    const data = fs.readFileSync('./index.html', 'utf-8')
    ctx.body = data
  } else if(url.endsWith('.js')){
    const jsPath = path.resolve(__dirname, url.slice(1))
    ctx.type = 'text/javascript'
    const source = fs.readFileSync(jsPath, 'utf-8')
    ctx.body = getScource(source)
    // from '/@modules
  } else if(url.startsWith('/@modules')){
    const packName = url.replace('/@modules/', '');
    ctx.type = 'text/javascript'
    const packPath = path.resolve(__dirname, `node_modules/${ packName }`)
    const module = require(packPath+'/package.json').module
    const data = fs.readFileSync(path.resolve(packPath, module), 'utf-8')
    ctx.body = getScource(data)

  }
})
function getScource (data) {

 return data.replace(/(from\s+["'])(?![.\/])(\w+)(["'])/g, '$1/@modules/$2$3')
            .replace(/process\.env\.NODE_ENV/g,"'development'")
}
app.listen(8081, () => {
  console.log("open server localhost:8081");
});
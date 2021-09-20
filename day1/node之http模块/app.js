const http = require('http');
const fs = require('fs');
http.createServer((req,res) => {
    const { method, url, headers } = req
    // console.log(method,url);
    if (method === 'GET' && url === '/') {
        fs.readFile('./index.html', (err,data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain;charset=utf-8'})
                res.end('服务器离家出走了~')
                return
            }
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html')
            res.end(data)
        })
       
    }
    else if(method === 'GET' && headers.accept.indexOf('image/*')!==-1 ){
        //用流的方式可以减少服务器的开销
        fs.createReadStream('.'+url).pipe(res)
    }
   

})
.listen(3000,() => {
    console.log('Serve at 3000');
})
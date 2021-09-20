const { promisify } = require("util");
const figlet = promisify(require('figlet'));
const clear = require('clear');
const chalk = require('chalk');
const { clone } = require('./download');
const open = require('open')
const log = data => console.log(chalk.green(data));
const spawn = async(...args) => {
    const options = args[args.length-1];
    const { spawn } = require('child_process');
    if(process.platform === 'win32') {
        console.log('win32');
        options.shell = true
    } else { 
        console.log('linux/Unix');
     }
    return new Promise(resolve => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout)
        const ret = [];
        proc.stdout.on('data', data => {
            ret.push(data)
        })
        proc.on('close', () => {
            resolve(Buffer.concat(ret).toString())
        })
    })
}
module.exports = async name => {
    clear()
    const data = await figlet('kkb welcome')
    log(data);
    log('创建项目...'+name)
    await clone('github:su37josephxia/vue-template',name)
    log("安装依赖...")
    try {
        open('http://localhost:8080')
        await spawn('npm',['run','serve'],{cmd: `./${name}`})
        console.log(chalk.green('项目创建成功'));
    }catch(e) {
        console.log(e);
    }
}
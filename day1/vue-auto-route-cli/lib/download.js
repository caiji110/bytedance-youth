const { promisify } = require('util')
// import ora from 'ora';
module.exports.clone = async function (repo,des) {
   
    const download = promisify(require('download-git-repo'));
    // const spinner = ora('Loading unicorns').start()
    // spinner.color = 'yellow';
    // spinner.text = 'Loading'
    await download(repo,des)
    // spinner.stop()
}
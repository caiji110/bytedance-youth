#! node
const program = require('commander');
program.version(require('../package').version)
program.command('init <name>')
       .description('init porject')
        .action(require('../lib/init.js'))
program.parse(process.argv)
import inquirer from 'inquirer'
// input
// 由用户输入动态动态生成项目的配置
export default await inquirer.prompt([
     { type: 'input', name: 'packageName', message: 'please input your project name', default: 'moyu'},
     {
        type: "checkbox",
        name: "middleware",
        choices: [
          {
            name: "koaStatic",
          },
          {
            name: "koaRouter",
          },
        ],
      },
      {
        type: "number",
        name: "port",
        message: "set port number",
        default: 8080,
      },
])
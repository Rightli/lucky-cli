import program from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';
import chalk from 'chalk';

/**
 * lucky commands
 *    - config
 *    - init 
 *    - mock
 *    - dev
 *    - build
 */
console.log('process.argv', process.argv);
let actionMap = {
    init: {
        description: '从模版创建一个新项目',
        usages: [
            'lucky init templateName projectName'
        ]
    },
    config: {
        alias: 'cfg',
        description: 'config .luckyrc',
        usages: [
            'lucky config set <k> <v>',
            'lucky config get <k>',
            'lucky config remove <k>'
        ]

    },
    // mock: {
    //     description: '数据mock【线上 -> mock服务器 -> 本地】',
    // },
    dev: {
        description: '本地开发环境【语法检查、代码编译打包、热重载、代理、mock】',
        usages: [
            'lucky dev ',
            'lucky dev --proxy=<k>',
            'lucky dev --mock=<k>',
            'lucky dev --hotreload=<k>'
        ]
    },
    build: {
        description: '生成线上代码【语法检查、代码编译、代码打包及压缩】',
        usages: [
            'lucky build'
        ]
    }
    //other commands
}

Object.keys(actionMap).forEach((action) => {
    program.command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias) //别名
        .action(() => {
            switch (action) {
                case 'config':
                    //配置
                    apply(action, ...process.argv.slice(3));
                    break;
                case 'init':
                    apply(action, ...process.argv.slice(3));
                    break;
                case 'dev':
                    apply(action, ...process.argv.slice(3));
                    break;
                case 'build':
                    apply(action, ...process.argv.slice(3));
                    break;
                default:
                    break;
            }
        });
});

function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}


program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

// 不带参数时
if (!process.argv.slice(2).length) {
    program.outputHelp(make_green);
}

function make_green(txt) {
    return chalk.green(txt);
}
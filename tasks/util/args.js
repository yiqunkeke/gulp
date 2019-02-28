import yargs from 'yargs'; // 处理命令行参数包

const args = yargs

    // 比如 gulp -production命令中，-production 就是命令行参数
    .option('production', {
        boolean: true, // 选项是布尔类型
        default:false, // 默认值（如果无此参数时）
        describe:'min all scripts'
    })

    // 是否监听文件的修改--watch参数
    .option('watch', {
        boolean: true,
        default:false,
        describe:'watch all files'
    })

    // 是否详细输出命令行日志--verbose
    .option('verbose', {
        boolean: true,
        default:false,
        describe:'log'
    })

    // 强制生成 sourcemaps
    .option('sourcemaps', {
        describe:'force the creation of sourcemaps'
    })

    // 服务器端口
    .option('port', {
        string: true,
        default:8080,
        describe:'server port'
    })

    // .argv表示对输入的命令行内容以字符串作为解析
    .argv

import gulp from 'gulp'; // gulp构建基本包
import gulpif from 'gulp-if'; // gulp语句中做判断
import concat from 'gulp-concat'; // gulp中处理文件拼接
import webpack from 'webpack'; // 打包
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named'; // 文件命名
import livereload from 'gulp-livereload'; // 文件修改以后，浏览器自动刷新（热更新包）
import plumber from 'gulp-plumber'; // 处理文件信息流
import rename from 'gulp-rename'; // 对文件重命名
import uglify from 'gulp-uglify'; // 处理js和css压缩
import {log,colors} from 'gulp-util'; // 在命令行工具输出的包
import args from './util/args'; // 刚才写好的，对命令行参数解析的包(用到yargs包)

// 使用 npm i --save-dev 来安装上面的包

// 创建gulp任务
gulp.task('scripts',() => {
        // 打开目录app/js/index.js文件
    return gulp.src(['app/js/index.js'])
        // 处理常规错误逻辑，改变默认处理错误机制
        .pipe(plumber({
            errorHandle: function () {
                
            }
        }))
        // 重命名
        .pipe(named())
        // 编译
        .pipe(gulpWebpack({
            mode:'production',
            module:{
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader'
                    }
                ]
            }
        }),null,(err,stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks:false
            }))
        })
        // 把编译好的文件，放入指定路径
        // 解释下：为什么要把编译好的文件放入server目录中
        // 因为server中需要拿到最新编译好的js后才能在整个服务中跑起来
        // 所以这里指定的路径是 server/public/js
        .pipe(gulp.dest('server/public/js'))
        // 复制一份编译好的js文件
        .pipe(rename({
            basename:'cp',
            extname:'.min.js'
        }))
        // 并压缩
        .pipe(uglify({
            compress: {
                properties: false
            },
            output:{
                'quote_keys': true
            }
        }))
        // 重新保存到server/public/js 目录
        .pipe(gulp.dest('server/public/js'))
        // 监听
        .pipe(gulpif(args.watch,livereload()))
})
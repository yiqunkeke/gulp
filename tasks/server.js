import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server'; // 启动脚本作为服务器
import args from './util/args';

gulp.task('serve',(cb) => {
    // 如果处于非监听状态下，返回回调函数
    if(!args.watch) return cb();
    // 如果处于监听状态，则创建一个服务器
    var server = liveserver.new(['--harmony','server/bin/www']);
    // --harmony 表示要在当前命令行下执行后面的脚本‘server/bin/www’
    // server/bin/www 是一个脚本（在server/bin/www目录中）
    // 其实最终服务器启动的是express中的默认的www这个脚本

    server.start(); // 启动服务器

    // 监听 server下的所有文件（包括js、模板ejs、css），这些文件发生改变时，要让浏览器自动刷新
    // 这是 server任务脚本的目的

    // 实现热更新
    gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'], function (file) {
        // 第一个参数：数组--表示要监听的路径下的文件
        // 监听之后，通知服务器做出相应的处理
        server.notify.apply(server,[file]);
    });

    // 监听需要重启服务的改变
    // （比如接口的改变或者路由的变化---这些变化仅靠刷新浏览器无法实现热更新，而是需要重启服务）
    gulp.watch(['server/routes/**/*.js','server/app.js'],function () {
        server.start.bind(server)();
    });
})
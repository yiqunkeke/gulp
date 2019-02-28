import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser',(cb) => {
    if(!args.watch) return cb();

    // 1. 监听 app（原始目录下的所有js），启动 scripts构建脚本
    gulp.watch('app/**/*.js',['scripts']);
    gulp.watch('app/**/*.ejs',['pages']);
    gulp.watch('app/**/*.css',['css']);
});
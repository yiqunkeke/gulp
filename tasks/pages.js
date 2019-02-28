import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('pages',() => {
    // 所有的gulp任务第一步都是先打开文件---使用gulp.src
    return gulp.src('app/**/*.ejs')
        // 把所有文件原封不动的拷贝到 server目录下
        .pipe(gulp.dest('server'))
        // 监听，并决定是否热更新
        .pipe(gulpif(args.watch,livereload()))
})
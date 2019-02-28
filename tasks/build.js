import gulp from 'gulp';
import gulpSequence from 'gulp-sequence'; // 处理包的顺序

gulp.task('build', gulpSequence('clean','css','pages','scripts',['browser','serve']));
// 1. serve一定要放在最后执行
// 2. default.js // 默认执行build 任务
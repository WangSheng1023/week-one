var gulp = require('gulp');
var sass = require('gulp-sass');
var minCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');

//编译scss 压缩css
gulp.task('default', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('min/scss'))
});
//监听scss
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', gulp.series('default'))
});
//压缩js
gulp.task('minJs', function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('min/js'))
});
//创建服务
gulp.task('webServer', function() {
    gulp.src('src')
        .pipe(webserver({
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end();
                }
                var pathname = url.parse(req.url, true).pathname;
                if (pathname === '/') {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', 'index.html')))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
});
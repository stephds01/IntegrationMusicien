var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');





//Tache SASS
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


//Tache crée le server BrowserSync 
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: '/'
        }
    })
});

//Tache qui autoprefixe le css
gulp.task('default', function () {
    return gulp.src('style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});




//J'automatise dès le rafraichissement dès la modification d'un fichier 
gulp.task('watch',['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);

    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});


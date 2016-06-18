/**
 * Created by Utilisateur on 17/06/2016.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');


//Tache Saas
gulp.task('sass', function() {

    return gulp.src('style.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))

});

//Tache Auto prefixer
gulp.task('autoprefixer', function () {
    return gulp.src('dist/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});



//Tache crée le server BrowserSync
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: ''
        }
    })
});




//J'automatise dès le rafraichissement dès la modification d'un fichier
gulp.task('watch',['browserSync', 'sass', 'autoprefixer'], function() {

    gulp.watch('sass/**/*.scss', ['sass']).on('change', function(event) {
        console.log('le fichier ' + event.path + ' a ete modifie');
    });
    gulp.watch('dist/style.css', ['autoprefixer']).on('change', function(event) {
        console.log('le fichier ' + event.path + ' a ete autoprefixer');
    });
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

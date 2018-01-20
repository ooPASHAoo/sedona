var gulp = require('gulp');         // npm i gulp --save-dev
var scss = require('gulp-sass');    //npm i gulp-sass --save-dev
var browserSync = require('browser-sync');  // npm i browser-sync --save-dev
var cssnano = require('gulp-cssnano');  // npm i gulp-cssnano --save-dev
// var rename = require('gulp-rename');    // npm i gulp-rename --save-dev
var autoprefixer = require('gulp-autoprefixer');    // npm i --save-dev gulp-autoprefixer


gulp.task('scss', function () {             // Создаем таск scss
    return gulp.src('src/scss/style.scss')  // Берем источник
        .pipe(scss())                       // Преобразуем Sass в CSS посредством gulp-sass
        // .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true})) // Создаем префиксы
        // .pipe(cssnano())                // Сжимаем
        .pipe(gulp.dest('src/css'))         // Выгружаем результата в папку src/css
        .pipe(browserSync.reload({stream: true}))   // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'src' // Директория для сервера - app
        },
        ui: false,  // Отключаем админку browserSync при входе
        open: false,    // Отключаем автооткрытие новой вкладке при обновлении
        notify: false   // Отключаем уведомления
    });
});

gulp.task('watch', ['browser-sync', 'scss'], function () {
    gulp.watch('src/scss/**/*.scss', ['scss']); // Наблюдение за scss файлами
    gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);
/*
 * Файл сборщика Gulp
 * следит за изменениями кода, делает LiveReload-перезагрузку браузера
 * конкатенацию скриптов и стилей
 * позволяет делать include файла-в-файле
 *
 * КОМАНДЫ:
 * gulp - запускает LiveReload-сервер в режиме разработки, следит за изменениями кода
 * gulp run:production - запускает сервер с конкатенацией + минификацией скриптов и стилей
 * gulp build - делает билд для production-сервера с конкатенацией и минификацией
*/

'use strict';

    // сам сборщик
var gulp = require('gulp'),
    // просмотр изменений файлов
    watch = require('gulp-watch'),
    // добавление браузерных префиксов для CSS
    prefixer = require('gulp-autoprefixer'),
    // конкатенация JS-файлов
    uglify = require('gulp-uglify'),
    // SASS-компилятор
    sass = require('gulp-sass'),
    // создание карт-хэшей навигации по минифицированному коду
    sourcemaps = require('gulp-sourcemaps'),
    // импорт одного файла в другой
    rigger = require('gulp-rigger'),
    // минификация CSS
    cssmin = require('gulp-minify-css'),
    // удаление 'rm' (like Linux)
    rimraf = require('rimraf'),
    // liveReload-перезагрузка браузера
    browserSync = require("browser-sync"),
    //метод перезагрузки браузера
    reload = browserSync.reload,
    // уведомления (красоты ради)
    notify = require('gulp-notify'),
    // подключение bower-компонентов
    wiredep = require('wiredep').stream,
    // отлов ошибок
    plumber = require('gulp-plumber'),
    // передача в поток измененных файлов
    gulpif = require('gulp-if'),
    // конкатенация скриптов в один файл (ну, или несколько)
    useref = require('gulp-useref');

var path = {
    //релизный билд
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },

    //директория разработки
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/css/*.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },

    //файлы для наблюдения за изменениями
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        bower: './bower.json'
    },

    // настройки bower
    bower: {
        directory: 'build/bower_components',
        ignorePath: '../build/'
    },

    //папка билда
    clean: './build'
};

var config = {
    // proxy: host,
    server: {
        baseDir: "./build"
    }
    // tunnel: true,
    // host: host,
    // port: 9000
};

gulp.task('default', ['run:dev'], function () {});

gulp.task('run:dev', ['build:dev', 'server', 'watch:dev'], function () {
    gulp.src('.')
        .pipe(notify({title: 'Workflow', message: 'Билд разработки завершен. Сервер запущен.'}))
});

gulp.task('run:production', ['build', 'server', 'watch'], function () {
    gulp.src('.')
        .pipe(notify({title: 'Workflow', message: 'Продакшн-билд завершен. Сервер запущен.'}))
});

gulp.task('watch:dev', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:dev');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('scss:dev');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:dev');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('img');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts');
    });
    watch([path.watch.bower], function (event, cb) {
        gulp.start('build:dev');
    })
});

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('scss');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('img');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts');
    });
    watch([path.watch.bower], function (event, cb) {
        gulp.start('build');
    })
});

/* СЕРВЕР
 * делает serve (раздачу) файлов по HTTP
*/
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

/* УДАЛЕНИЕ ПАПКИ БИЛДА */
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

/* BUILD РАЗРАБОТКИ */
gulp.task('build:dev', ['scss:dev', 'js:dev', 'html:dev',  'img', 'fonts'], function () {
    gulp.src('.')
        .pipe(notify({title: 'Workflow', message: 'Dev-построение завершено!'}))
});

/* BUILD PRODUCTION */
gulp.task('build', ['scss', 'js', 'html', 'img', 'fonts'], function () {
    gulp.src('.')
        .pipe(notify({title: 'Workflow', message: 'Production-построение завершено!'}))
});

/* HTML
 * для билда разработки
*/
gulp.task('html:dev', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(wiredep(
            {
                directory: path.bower.directory,
                ignorePath: path.bower.ignorePath
            }
        ))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(wiredep(
            {
                directory: path.bower.directory,
                ignorePath: path.bower.ignorePath
            }
        ))
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cssmin()))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

/* JAVASCRIPT */
gulp.task('js:dev', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber()) //отлов ошибок
        .pipe(rigger()) //Прогоним через rigger
        .pipe(plumber.stop()) //тормозим отлов ошибок
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('js', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(plumber()) //отлов ошибок
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(plumber.stop()) //тормозим отлов ошибок
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

/* SCSS-STYLES */
gulp.task('scss:dev', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(plumber()) //отлов ошибок
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        //.pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}))
});

gulp.task('scss', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(plumber()) //отлов ошибок
        .pipe(sass()) //Скомпилируем
        //.pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}))
});

/* IMAGES */
gulp.task('img', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

/* FONTS */
gulp.task('fonts', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
/*****************
 * Gulp Requires
 *****************/
  const { src, dest, watch, series, parallel } = require('gulp'),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        gulpif = require('gulp-if'),
        bs = require('browser-sync'),
        babel = require('gulp-babel'),
        clean = require('gulp-clean'),
        // concat = require('gulp-concat'),
        plumber = require('gulp-plumber'),
        imagemin = require('gulp-imagemin'),
        // cleanCSS = require('gulp-clean-css'),
        prefix = require('gulp-autoprefixer');
        // concatCSS = require('gulp-concat-css');

  const critical = require('critical').stream;
  const reload = bs.reload;

/*****************
 * Paths
 *****************/

  // Main Paths
  const srcRoot = './src/',
        buildRoot = './public/';

  // Source Files
  const srcPaths = {
    js: srcRoot + 'js/',
    css: srcRoot + 'sass/',
    mail: srcRoot + 'mail/',
    views: srcRoot + 'views/',
    img: srcRoot + 'assets/img/',
    pages: srcRoot + 'views/pages/',
    videos: srcRoot + 'views/videos/',
    assets: srcRoot + 'assets/',
  }
  // Build Files
  const buildPaths = {
    js: buildRoot + 'js/',
    css: buildRoot + 'css/',
    img: buildRoot + 'img/',
    mail: buildRoot + 'mail/',
    fonts: buildRoot + 'fonts/',
    videos: {
      raiox: buildRoot + 'raio-x/',
      linha: buildRoot + 'linha-do-tempo/',
      estudo: buildRoot + 'estudo-de-caso/',
      fronteiras: buildRoot + 'sem-fronteiras/',
    },
    assets: buildRoot + '_assets/',
  }

var env = process.env.NODE_ENV;

/*****************
 * Views
 *****************/
  function views() {

    return src([
        srcPaths.views + '*.pug',
        srcPaths.pages + '**/*.pug',
        srcPaths.videos + '**/*.pug'
      ])
      .pipe(gulpif(env === 'production', pug({
        pretty: false
      }), pug({
        pretty: true
      })))
      .pipe(plumber())
      .pipe(dest(buildRoot));
  }

/*****************
 * Styles
 *****************/
  function styles() {

    // Main Styles
    return src(srcPaths.css + 'main.scss')
      .pipe(plumber())
      .pipe(gulpif(env === 'production', sass.sync({
        outputStyle: 'compressed',
        precision: 10,
        includePaths: ['.'],
      }), sass.sync({
        outputStyle: 'nested',
        precision: 10,
        includePaths: ['.'],
      })))
      .pipe(gulpif(env === 'production', prefix({
        browsers: [
          'last 4 versions',
          'android 4',
          'opera 12',
        ]
      }), prefix({
        browsers: [
          'last 2 versions',
          'android 4',
          'opera 12',
        ]
      })))
      .pipe(dest(buildPaths.css));
  }

/*****************
 * Scripts
 *****************/
  function scripts(cb) {
    src(srcPaths.js + '*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(dest(buildPaths.js));

    cb();
  }

/*****************
 * Move Files
 *****************/
  function move(cb) {
    // Move Favicon
    src([
      srcRoot + '*.ico',
      srcPaths.assets + 'favicon/*',
    ], { allowEmpty: true })
      .pipe(dest(buildRoot));
    
    // Move Fonts
    src(srcPaths.assets + 'fonts/**/*')
      .pipe(dest(buildPaths.fonts));

    cb();
  }

/*****************
 * Images
 *****************/
  function images() {
    return src(srcPaths.img + '**/**/*')
      .pipe(gulpif(env === 'production', imagemin([
        imagemin.gifsicle({
          interlaced: true,
          optimizationLevel: 3
        }),
        imagemin.jpegtran({
          progressive: true
        }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: true,
            removeComments: true,
            removeMetadata: true,
            removeTitle: true,
            removeDesc: true,
            cleanupAttrs: true
          }]
        })], {
        verbose: true
      }), imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 0 }),
        imagemin.svgo({ plugins: [{ removeViewBox: true }] })
      ])))
      .pipe(dest(buildPaths.img))
  }

 /*****************
 * Clean Build
 *****************/
  function cleanBuild() {
    return src(buildRoot, {
      allowEmpty: true
    }).pipe(clean());  
  }


/*****************
 * Watchers
 *****************/
  function watcher(cb) {
    bs({
      server: buildRoot,
      files: [srcRoot + '**/**/**/**/*', buildRoot + '**/**/**/**/*'],
    });

    watch(srcRoot + '**/**/**/*.pug', views);
    watch(srcPaths.css + '**/**/*.scss', styles);
    watch(srcPaths.js + '**/**/*.js', scripts);
    // watch(srcPaths.js + 'lib/**/*.js', ['jsLib']);
    watch(srcPaths.assets + 'img/**/**', images);

    cb();
  }

/*****************
* Critic CSS
*****************/
  function critic() {
    return src(buildRoot + '*.html')
      .pipe(critical({
        base: 'public/',
        inline: true,
        css: ['public/css/main.css']
      }))
      .pipe(dest('public'));
  }

/*****************
 * Gulp Exports
 *****************/
exports.clean = cleanBuild;
exports.views = views;
exports.critic = critic;
exports.dev = function(cb){
  series(cleanBuild, parallel(views, styles, scripts, move, images), watcher)();
  cb();
}

exports.build = function(cb){
  series(cleanBuild, views, styles, scripts, move, critic, images)();
  cb();
}


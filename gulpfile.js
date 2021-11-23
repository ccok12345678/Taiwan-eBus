const { src, dest, watch, series } = require('gulp');
const $ = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('node-sass'));
const del = require('del');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const path = require('path');
const minimist = require('minimist');
const { pipe } = require('stdout-stream');
const { on } = require('events');
// import imagemin from 'node_modules/gulp-imagemin/index.js';
// const imagemin = require('gulp-imagemin');

// 環境設定
const envOpts = {
  string: 'env',
  default: { env: 'develop' }
};
const opts = minimist(process.argv.slice(2), envOpts);
console.log(opts);

function clean() {
  return del([
    './public'
  ]);
}

exports.clean = clean;

function buildTemplate() {
  return src('./src/**/*.pug')
    .pipe($.pug({
      pretty: true
    }))
    .pipe(dest('./public/'))
    .pipe(browserSync.stream());
}

exports.pug = buildTemplate;


function buildStyle() {
  const plugins = [
    autoprefixer()
  ];
  return src('./src/stylesheets/*.scss')
    .pipe($.sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nest',
      includePaths: [
        './node_modules/bootstrap/scss'
      ]
    }))
    .on('error', sass.logError)
    .pipe($.postcss(plugins))
    .pipe($.if(opts.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./public/stylesheets'))
    .pipe(browserSync.stream());
}

exports.sass = buildStyle;

function buildScript() {
  return src('./src/js/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.if(opts.env === 'production', $.uglify({
      compress : {
        drop_console: true
      }
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./public/js'))
    .pipe(browserSync.stream());
}

exports.script = buildScript;

function vendorJS() {
  return src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/axios/dist/axios.min.js'
  ])
  .pipe($.order([
    'bootstrap.min.js',
    'axios.min.js'
  ]))
  .pipe($.concat('vendor.js'))
  .pipe($.if(opts.env === 'production', $.uglify()))
  .pipe(dest('./public/js'))
  .pipe(browserSync.stream());
}

exports.vendor = vendorJS;

function imageMin() {
  return src('./src/images/**/*')
    // .pipe($.if(opts.env === 'production', $.imagemin()))
    .pipe(dest('./public/images'))
    .pipe(browserSync.stream());
}

exports.image = imageMin;

function browser_sync() {
  browserSync.init({
    server: {
      baseDir: './public',
      index: 'index.html'
    },
    reloadDebounce: 3
  })
}

exports.bs = browser_sync;

function watching() {
  watch('./src/stylesheets/**/*.scss', buildStyle)
    .on('unlink', e => del(`./public/stylesheets/**/${path.basename(e, 'scss')}.css`));
  watch('./src/js/**/*.js', buildScript)
    .on('unlink', e => del(`./public/**/${path.basename(e)}`));
  watch('./src/pages/**/*.pug', buildTemplate)
    .on('unlink', e => del(`./public/pages/**/${path.basename(e, 'pug')}.html`));
  watch('./src/images/**/*', imageMin)
    .on('unlink', e => del(`./public/images/**/${path.basename(e)}`));

  browser_sync();
}

exports.watch= watching;

exports.build = series(
  clean,
  buildTemplate,
  buildStyle,
  buildScript,
  vendorJS,
  imageMin
);

exports.default = series(
  buildTemplate,
  buildStyle,
  buildScript,
  vendorJS,
  imageMin,
  watching,
  browser_sync
)
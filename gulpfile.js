const { src, dest, watch, series } = require('gulp');
const $ = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('node-sass'));
const monimist = require('minimist');
const del = require('del');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const path = require('path');
const minimist = require('minimist');
const { pipe } = require('stdout-stream');
const { on } = require('events');

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
    .pipe(dest('./public'))
    .pipe(browserSync.stream());
}

exports.pug = buildTemplate;

function buildStyle() {
  return src('/stylesheets/*scss')
    .pipe($.sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nest',
      includePaths: [
        './node_modeles/bootstrap/scss'
      ]
    }))
    .on('error', sass.logError)
    .pipe($.postcss({
      autoprefixer()
    }))
    .pipe($.if(opts.env === 'production', $.cleanCss()))
    .pipe($.sourcrmaps.write('.'))
    .pipe(dest('./public/stylesheets'))
    .pipe(browserSync.stream());
}

exports.sass = buildStyle;

function buildScript() {
  return src('./js/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.if(opts.env === 'production', $.uglify({
      compress : {
        drop_console: true
      }
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./public/js'))
    .pipe(browserSync());
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
  return scr('./images/**/*')
    .pipe($.if(opts.env === 'production', $.imagemin()))
    .pipe(dest('./public/images'))
    .pipe(browserSync.stream());
}

exports.image = imageMin;

function browser_sync() {
  browserSync.init({
    server: {
      basDir: './public',
      index: 'index.html'
    },
    reloadDebounce: 3
  })
}

exports.bs = browser_sync;

function watch() {
  watch('./src/stylesheets/**/*.scss', buildStyle)
    .on('unlink', e => del(`./public/stylesheets/**/${path.basename(e, 'scss')}.css`));
  watch('./src/js/**/*.js', buildScript)
    on('unlink', e => del(`./public/**/${path.basename(e)}`));
  watch('./src/pages/**/*.pug', buildTemplate)
    on('unlink', e => del(`./public/pages/**/${path.basename(e, 'pug')}.html`));
  watch('./src/images/**/*', imageMin)
    on('unlink', e => del(`./public/images/**/${path.basename(e)}`));

  browser_sync();
}

exports.watch= watch;

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
  browser_sync
)
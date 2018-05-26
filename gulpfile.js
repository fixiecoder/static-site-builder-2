const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var through = require('through2');
const path = require('path');
var rs = require('replacestream');
const data = require('./src/templates/data/data.json');

console.log(data)

const cacheBust = Date.now().toString(16);
const env = process.env.buildEnv || 'production';

console.log(env)

let devServerScript = env === 'development' ? `<script>{{> dev-server-script}}</script></body>` : '';

function setScript(search = '// REPLACE_ME') {
  function parsePath(_path) {
    var extname = path.extname(_path);
    return {
      dirname: path.dirname(_path),
      basename: path.basename(_path, extname),
      extname: extname
    };
  }

  function getName(_path) {
    const replaceRX = /\//g;
    const pathObject = parsePath(_path)
    return pathObject.dirname.replace(replaceRX, '-');
  }

  return through.obj((file, encoding, callback) => {
    const name = getName(file.relative);
    const replacement = `{{> ${name}}}`;

    if (file.isStream()) {
      file.contents = file.contents.pipe(rs(search, replacement));
      file.contents = file.contents.pipe(rs(search, replacement));
    } else if (file.isBuffer()) {
      file.contents = new Buffer(String(file.contents).replace(search, replacement));
      file.contents = new Buffer(String(file.contents).replace('</body>', devServerScript));
    }
    callback(null, file);
  });
}

const options = {
  batch : ['src/templates/partials', 'dist/partial-scripts'],
  helpers : {
    cacheBuster : (str) => {
      return cacheBust;
    },

    selected : (page, link) => {
      return page === link ? 'selected' : 'unselected';
    }
  }
};

gulp.task('clean', () => {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('templates', () => {
  return gulp.src('src/templates/pages/**/*.handlebars')
    .pipe(setScript())
    .pipe(handlebars({data}, options))
    .pipe(rename(path => {
      path.extname = '.html';
      path.dirname = path.dirname;
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'templates']);
browserify   = require 'browserify'
riotify      = require 'riotify'
babelify     = require 'babelify'
through2     = require 'through2'

gulp         = require 'gulp'
concat       = require 'gulp-concat'
riot         = require 'gulp-riot'
rename       = require 'gulp-rename'
uglify       = require 'gulp-uglify'
wrap         = require 'gulp-wrap'
header       = require 'gulp-header'
shell        = require 'gulp-shell'
streamqueue  = require 'streamqueue'
runSequence  = require 'run-sequence'
path         = require 'path'
browserSync  = require 'browser-sync'
reload       = browserSync.reload

$ =
  root:       './'
  dist:       './dist'
  tags:       './components'
  demo:       './demo'
  demoComps:  './demo/*.html'
  demoSrc:    ['./demo/*.html', './demo/*.es', './lib/*.es']
  riot:       './dist/riot-dev.js'
  riotSrc:    './node_modules/riot/lib/riot.js'
  tagsSrc:    ['./components/*.html']
  mixinSrc:   ['./mixins/*.js']
  watch:      ['index.html', 'dist/*', 'demo/app.js']

gulp.task 'default', (cb) -> runSequence 'smash', 'build', 'demo', cb

gulp.task 'smash', shell.task "smash #{ $.riotSrc } > #{ $.riot }"

gulp.task 'demo', ->
  gulp.src $.demoComps
  .pipe riot()
  .pipe concat 'app.es'
  .pipe header "var regeneratorRuntime = require('regenerator/runtime');"
  .pipe gulp.dest $.demo
  .pipe through2.obj (file, enc, next) ->
    browserify file.path
    .transform babelify
    .bundle (err, res) ->
      return next err if err
      file.contents = res
      next null, file
  .pipe rename 'app.js'
  .pipe gulp.dest $.demo

gulp.task 'build', ->
  streamqueue objectMode: true,
    gulp.src $.tagsSrc
    .pipe riot()
    gulp.src $.mixinSrc
  .pipe concat 'ikki.js'
  .pipe wrap src: 'template.txt'
  .pipe gulp.dest $.dist
  .pipe uglify()
  .pipe rename extname: '.min.js'
  .pipe gulp.dest $.dist

gulp.task 'watch', ->
  browserSync.init
    notify: false
    server: baseDir: './'
  o = debounceDelay: 3000
  gulp.watch [$.tagsSrc, $.mixinSrc], o, ['build']
  gulp.watch $.demoSrc, o, ['demo']
  gulp.watch $.watch, o, reload

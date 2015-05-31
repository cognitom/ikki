browserify   = require 'browserify'
riotify      = require 'riotify'
babelify     = require 'babelify'
through2     = require 'through2'
buffer       = require 'vinyl-buffer'
source       = require 'vinyl-source-stream'

gulp         = require 'gulp'
babel        = require 'gulp-babel'
concat       = require 'gulp-concat'
riot         = require 'gulp-riot'
rename       = require 'gulp-rename'
uglify       = require 'gulp-uglify'
wrap         = require 'gulp-wrap'
header       = require 'gulp-header'
shell        = require 'gulp-shell'
uglify       = require 'gulp-uglify'
regenerator  = require 'gulp-regenerator'
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
  demoTags:   './demo/*.html'
  demoBabel:  './demo/temp.js'
  helperSrc:  ['./lib/*.js']
  riot:       './dist/riot-dev.js'
  riotSrc:    './node_modules/riot/lib/riot.js'
  tagsSrc:    ['./components/*.html']
  mixinSrc:   ['./mixins/*.js']
  watch:      ['index.html', 'dist/*', 'demo/app.js']

gulp.task 'default', (cb) ->
  runSequence 'smash', 'build', 'demo-riot', 'demo-babel', cb

gulp.task 'smash', shell.task "smash #{ $.riotSrc } > #{ $.riot }"

gulp.task 'demo-riot', ->
  gulp.src $.demoTags
  .pipe riot()
  .pipe concat 'temp.js'
  .pipe gulp.dest $.demo

gulp.task 'demo-babel', ->
  browserify()
  .transform babelify.configure blacklist: ['regenerator']
  .add $.demoBabel
  .bundle()
  .pipe source 'app.js'
  .pipe buffer()
  .pipe regenerator includeRuntime: true
  #.pipe uglify()
  .pipe gulp.dest $.demo

gulp.task 'build', ->
  streamqueue objectMode: true,
    gulp.src $.tagsSrc
    .pipe riot()
    gulp.src $.mixinSrc
    gulp.src $.helperSrc
    .pipe concat 'helpers.js'
    .pipe babel()
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
  gulp.watch [$.tagsSrc, $.mixinSrc, $.helperSrc], o, ['build']
  gulp.watch [$.demoTags], o, ['demo-riot']
  gulp.watch [$.demoBabel], o, ['demo-babel']
  gulp.watch $.watch, o, reload

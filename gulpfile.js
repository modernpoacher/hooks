require('@babel/register')({
  ignore: [
    /node_modules/
  ]
})

const gulp = require('gulp')

const postCommit = require('@modernpoacher/hooks/post-commit')

gulp
  .task('post-commit', postCommit)

gulp
  .task('default', gulp.series('post-commit'))

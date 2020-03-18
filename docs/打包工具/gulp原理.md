# gulp
gulp是一个基于流(Stream)的前端自动化构建工具，这里简单介绍下原理，详细API使用方式可以点[这里](https://www.gulpjs.com.cn/)

## src
创建一个Transform流，可读可写可修改

## pipe
流的管道，可以讲流传到下一目标

## dist
输出入到目标位置

## watch
检测到文件变化则执行回调，其原理是fs.watch
```js
function watch(cb) {
  gulp.watch('./demo.js', () => {
    console.log('change')
    cb()
  })
}

gulp.task('watch', watch)
```

## task
gulp继承undertaker，然后undertaker.prototype上有task方法，他分为两种方式  
先看下调用方式
```js
function demo(cb) {
  console.log('demo')
}
// 第一个参数name(必须)，第二参数fn(可选)
gulp.task('demo', demo) 
```
- 带fn，则进行保存
  - 内部用了了WakeMap简历了一个map对象
  - 如果name已经在WakeMap中存在，则将fn塞入数组中
  - 如果name不存在，则简历个对象，保存[fn]

## series
使用方式
```js
function a(cb) {
  console.log('a')
  cb()
}
// series中参数是个数组，不是数组内部会封装转成
gulp.task('demo', gulp.series(a))
```
函数将串行执行，内部原理是依赖了一个async-done包  
async-done包中主要用到domain模块，用来捕获异常  
然后就是封装函数，然后遍历数组用process.nextTick执行函数  
等上一个函数执行完，判断数组中是否还有

## parallel
使用方式
```js
function a(cb) {
  console.log('a')
  cb()
}
// parallel中参数是个数组，不是数组内部会封装转成
gulp.task('demo', gulp.parallel(a))
```
与series不同的是，函数将并行执行  

## gulp-changed
gulp-changed是gulp中的一个插件，可以过滤掉未修改的文件，提交task效率
```js
const gulp = require('gulp')
const changed = require('gulp-changed')

function build() {
  return gulp.src('./src')
          .pipe(changed('/dist'))
          .dist(gulp.dist('./dist'))
}

gulp.task('build', build)
```
原理: 通过fs.stat来判断当前流的文件和输出文件夹中的文件的modified time
```js
async function compareLastModifiedTime(stream, sourceFile, targetPath) {
	// TODO: Use the `stat` `bigint` option when targeting Node.js 10 and Gulp supports it
	const targetStat = await stat(targetPath);

	if (sourceFile.stat && Math.floor(sourceFile.stat.mtimeMs) > Math.floor(targetStat.mtimeMs)) {
		stream.push(sourceFile);
	}
}
```

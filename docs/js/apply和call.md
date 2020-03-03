# apply和call
有一篇文章写到了自己实现[bind](/js/bind.md)，里面用到apply和call，虽然这两个函数现在没有兼容性问题，但是IE5之前是不支持的  
本着学习的态度，还是来手写下好了

## 使用方法
首先得知其然，然后才能知其所以然，先看看怎么用的
```js
name = 'window'
var obj = {
  name: 'obj'
}
function sayName(a) {
  console.log(this.name)
  console.log(a)
}

sayName('青天明月有几时') // window 青天明月有几时
sayName.call(obj, '青天明月有几时') // obj 青天明月有几时
sayName.apply(obj, ['青天明月有几时']) // obj 青天明月有几时
```
可以看到call和apply都改变了this的指向，并且可以传递参数进去，只不过传参的方式不同  
call是通过直接写参数，apply则是传一个数组，在数组里面添加参数

## call实现
```js
Function.prototype.myCall = function(ctx) {
  if (!ctx) {
    ctx = window
  }

  var name = '_' + this.name // 私有命名
  ctx[name] = this // 将方法添加到对象上
  var arr = []

  // 传入参数，从1开始，因为0是ctx
  for (var i = 1; i < arguments.length; i++) {
    arr.push('arguments[' + i + ']')
  }

  eval('obj.' + name + '(' + arr.join(',') + ')') // 执行
  delete ctx[name] // 删除添加的方法
}
```
然后我们调用下
```js
name = 'window'
var obj = {
  name: 'obj'
}
function sayName(a, b) {
  console.log(this.name)
  console.log(a + ', ' + b)
}

sayName.myCall(obj, '青天明月有几时', '我今停杯一问之') // obj 青天明月有几时, 我今停杯一问之
```
这样子就实现了this的绑定，并且传入的参数也有效

## apply实现
其实和call的实现差不多，也是遍历参数，然后用eval执行，就不多赘述了
```js
Function.prototype.myApply = function (ctx) {
  var name = '_' + this.name
  ctx[name] = this || window
  var args = arguments[1] || []
  var arr = []
  
  for (var i = 0; i < args.length; i++) {
    arr.push('args[' + i + ']')
  }

  eval('ctx.' + name + '(' + arr.join(',') + ')' )
  delete ctx[name]
}
```
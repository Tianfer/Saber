# bind实现
es6支持通过bind来改变函数的this指向，并且与call和apply有所不同，它绑定之后并不会立即执行
```js
const name = 'window'
const obj = { name: 'obj' }
function sayName(a) {
  console.log(this.name)
}

sayName() // 输出window
sayName.bind(obj)() // 输出obj
```

## 实现
首先看下它的基本用法: 函数.bind(被绑定对象, 参数1, ...)(参数1, ...)
然后实现
```js
Function.prototype.myBind = function() { // 绑定到原型上，函数可以直接调用
  var that = this
  var slice = Array.prototype.slice
  var args = slice.call(arguments, 1) // 绑定时的参数

  return function() {
    var _args = slice.call(arguments) // 执行时参数
    that.apply(context, args.concat(_args))
  }
}
```
再调用
```js
var obj = { name: 'obj' }
function sayName(a, b) {
  console.log(this.name) // 输出obj
  console.log(a) // 输出a
  console.log(b) // 输出b
}

sayName.myBind(obj, 'a')('b')
```
这样就基本实现了，无论是绑定时的参数，还是执行时的参数，都有兼容到

## new的坑
本来以为实现了可以高枕无忧了，但是没想到还有一个坑，new可以改变bind的this指向  
Talk is cheap, show me the code
```js
var obj = { name: 'obj' }
function sayName() {
  console.log(this.name)
}

new (sayName.myBind(obj))() // 应该输出undefined
;(sayName.myBind(obj))() // 应该输出obj
```
在new的时候，this应该指向被创建的对象，对象上没有name，所以应该输出undefined  
那没办法了，作为一个完整的polyfill，肯定是都要兼容的，不然给别人用要被diao的

## 最终实现
```js
Function.prototype.myBind = function(context) { // 绑定到原型上，函数可以直接调用
  var fn = this
  var slice = Array.prototype.slice
  var args = slice.call(arguments, 1) // 绑定时的参数

  return function F() {
    var _args = slice.call(arguments) // 执行时参数

    if (this instanceof F) { // 若是new执行, 则this指向被创建的对象
      return fn.apply(this, args.concat(_args))
    }

    fn.apply(context, args.concat(_args))
  }
}
```

## 最后
去github上面看了下，跟别人的实现基本上一样了，不过看到挺多人建了仓库，发布到了npm，同样的代码不知道发了多少个包  
何必呢，程序员不造重复的轮子，多好  

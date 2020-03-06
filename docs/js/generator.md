# generator
Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。如果你对语法不太熟悉，点[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

## 使用方式
```js
function doSomething(thing) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('I\'m gona to ' + thing)
      resolve(thing)
    }, 300)
  })
}

function* myGenerator(thing0) {
  var thing1 = yield doSomething(thing0)
  var thing2 = yield doSomething(thing1)
  var thing3 = yield doSomething(thing2)
  return thing3
}

var g = myGenerator('study1')
// 可以通过next往generator里传参数，但是第一个next无效
console.log(g.next().value) // 输出 I\'m gona to study1
console.log(g.next('study2').value) // 输出 I\'m gona to study2
console.log(g.next('study3').value) // 输出 I\'m gona to study3
```

## 遍历
我们可以尝试遍历下
```js
var g = myGenerator('study1')

g.next().value.then((val) => { // 因为中间没有做什么操作，所以val都是study1
  g.next(val).value.then((val) => {
    g.next(val).value.then(() => {
      console.log('finally val', val) // finally val study1
    })
  })
})
```
输出结果和上面一样，但是不太美观，看起来还是回调地狱

## 第三方库的执行
这里引入第三方库co
```js
const co = require('co')

var g = myGenerator('study1')
co(g).then((val) => {
  console.log('finally val', val) // finally val study1
})
```
乍一看，如此美观，而且代码也极少，那么他是怎么实现的呢

## co简单版
```js
function coSimple(generator) {
  return new Promise((resolve, reject) => {
    function next(val) {
      var g = generator.next(val)

      if (g.done) {
        resolve(g.value)
        return
      }

      g.value.then((val) => {
        next.call(null, val)
      })
    }
  })
}

coSimple(g).then((val) => {
  console.log('finally val', val) // finally val study1
})
```

## throw和return
```js
function* myGenerator(thing0) {
  try {
    var thing1 = yield doSomething(thing0)
  } catch(err) {
    console.log('err', err)
  }
  var thing2 = yield doSomething(thing1)
  var thing3 = yield doSomething(thing2)
  return thing3
}

var g = myGenerator('study1')

var value1 = g.next().value
 // 可以往generator抛出异常
g.throw('123')
console.log(g.next('study1').value) // 输出 I\'m gona to study1
// 可以直接退出
console.log(g.return(2)) // { value: 2, done: true }
console.log(g.next('study2').value) // undefined
console.log(g.next('study3').value) // undefined
```

## babel打包后
![babel-generator](/generator.png)
可以看到babel打包之后，generator被他实现的方法包裹起来，并被switch分割开，通过sent传递数据

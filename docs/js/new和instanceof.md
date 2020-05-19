# new和instanceof
new是前端常用操作符，加上构造函数可以创建一个对象  
instanceof可以判断对象是否是目标函数的实例

## 实现new
```js
function mockNew(Constructor, ...argus) {
  var obj = {}
  Constructor.apply(obj, argus)
  obj.__proto__ = Constructor.prototype
  return obj
}
```

## 实现instanceof
```js
function myInstanceof(a, B) {
  if (Object.prototype.toString.call(B) !== '[object Function]') {
    throw 'B must be a constructor'
  }

  if (a == null) {
    return false
  }

  var A = a.__proto__
  var _B = B.prototype
  while(A) {
    if (A === _B) {
      return true
    }

    A = A.__proto__
  }

  return false
}
```
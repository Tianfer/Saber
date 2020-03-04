// 手写promise及promise-parse
# promise
关于promise，相信大家都很熟悉了，那你不熟悉也没关系，先看一遍[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)再来

## promise实现
```js
const isFunction = (func) => typeof func === 'function'
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(cb) {
    this._status = PENDING // 初始状态
    this._value = undefined // 初始值
    this._fulFilledQueues = [] // FULFILLED状态的回调队列
    this._rejectedQueues = [] // REJECTED状态的回调队列

    try {
      cb(this._resolve.bind(this), this._reject.bind(this)) // 执行new时传入的函数
    } catch(err) {
      this.reject(err)
    }
  }

  _resolve(val) {
    if (this._status !== PENDING) { // 如果已经转变过状态，则return
      return
    }

    const func = () => {
      const funcFulfilled = (value) => {
        let cb
        while(cb = this._fulFilledQueues.shift()) {
          cb(value)
        }
      }

      const funcRejected = (err) => {
        let cb
        while(cb = this._rejectedQueues.shift()) {
          err = cb(err)
        }
      }

      if (val instanceof MyPromise) {
        val.then((value) => {
          this._value = value
          this._status = FULFILLED
          funcFulfilled(value)
        }, (err) => {
          this._value = err
          this._status = REJECTED
          funcRejected(err)
        })
      } else {
        this._value = val
        this._status = FULFILLED
        funcFulfilled(val)
      }
    }

    setTimeout(func, 0) // 模拟异步
  }

  _reject(err) {
    if (this._status !== PENDING) {
      return
    }

    const func = () => {
      this._status = REJECTED
      this._value = err
      let cb = null
      while(cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }

    setTimeout(func, 0)
  }

  then(onFulfilled, onRejected) {
    const { _value, _status } = this


    return new MyPromise((resolve, reject) => {
      const fulfilled = (value) => { // resolve中的值
        try {
          if (!isFunction(onFulfilled)) {
            resolve(value)
          } else {
            const res = onFulfilled(value)
            if (res instanceof MyPromise) { // 如果返回值是一个promise
              res.then(resolve, reject)
            } else {
              resolve(res)
            }
          }
        } catch(err) {
          reject(err)
        }
      }

      const rejected = (value) => {
        try {
          if (!isFunction(onRejected)) {
            reject(value) // 跳过非function的参数
          } else {
            const res = onRejected(value)
            if (res instanceof MyPromise) {
              res.then(resolve, reject)
            } else {
              resolve(res)
            }
          }
        } catch(err) {
          reject(err)
        }
      }

      switch(_status) { // 根据不同的状态，做不同的操作
        case PENDING:
          this._fulFilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
        default:
          break
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}
```

## Promise.resolve和Promise.reject
```js
class Promise {
  static resolve(val) { // 如果是promise，则直接返回该promise
    if (val instanceof Promise) {
      return val
    }

    return new Promise((resolve) => resolve(val))
  }

  static reject(err) {
    return new Promise((resolve, reject) => reject(err))
  }
}
```

## Promise.all和Promise.race
```js
class Promise {
  static all(arr) {
    return new Promise((resolve, reject) => {
      const values = []
      let count = 0
      for (let [i, p] of arr.entries()) {
        this.resolve(p).then((res) => {
          values[i] = res // 对应的位置保存返回值
          count++

          if (count === arr.length) { // 都请求完成时状态变为fulfilled
            resolve(values) 
          }
        }, err => {
          reject(err) // 有一个错误时，状态变为rejected
        })
      }
    })
  }

  static race(arr) {
    return new Promise((resolve, reject) => {
      for (let p of arr) {
        this.resolve(p).then((res) => {
          resolve(res) 
        }, err => {
          reject(err) // 有一个错误时，状态变为rejected
        })
      }
    })
  }
}
```

## promisify实现
将一个函数转为promise
```js
function promisify(func) {
  return function(...args) {
    const that == this
    return new Promise((resolve, reject) => {
      if (that = global) {
        const cb = (err, val) => { // node错误优先回调
          if (err) {
            reject(err)
          } else {
            resolve(val)
          }
        }
        args.push(cb)
        func.apply(null, args)
      } else {
        resolve(func.apply(null, args))
      }
    })
  }
}
```

## isPromise
```js
function isPromise(promise) {
  return Object.prototype.toString.call(promise) === '[object Promise]'
}
```

## 最后
这应该是我博客里篇幅最长的了，感动到落泪

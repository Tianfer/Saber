# lazyMan
这是一道笔试题，主要考察面试者的设计思维

## 设计要求
```
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
// 等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")输出
// 等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
```

## 实现
```js
class Man {
  constructor(name) {
    this.queues = []

    this.sayName(name)

    setTimeout(() => {
      this.next()
    })
  }

  sayName(name) {
    const fn = () => {
      console.log(`Hi! This is ${name}`)
      this.next()
    }
    this.queues.push(fn)
  }

  sleep(time = 0) {
    const fn = (next) => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.queues.push(fn)
  }

  sleepFirst(time = 0) {
    const fn = (next) => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`)
        this.next()
      }, time * 1000)
    }
    this.queues.unshift(fn)
  }

  eat(launch) {
    const fn = (next) => {
      console.log(`Eat ${launch}`)
      this.next()
    }
    this.queues.push(fn)
  }

  next() {
    const fn = this.queues.shift()
    fn && fn()
  }
}

function LazyMan(name) {
  return new Man(name)
}
```
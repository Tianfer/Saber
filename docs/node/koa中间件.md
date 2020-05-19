# koa中间件
这里简单实现下koa中使用频率高的中间件

## 实现koa-bodyparse
```js
// koa中间件一定是个函数
const bodyParse = (ctx, next) => {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      let arr = []
      ctx.req.on('data', (chunk) => {
        arr.push(chunk)
      })
      ctx.req.on('end', () => {
        // 可以判断是否是json，然后转换
        ctx.request.body = Buffer.concat(arr).toString()
      })
    })
    await next() // 需要执行后面的函数
  }
}
```

## 实现koa-router
使用方式
```js
const Koa = require('koa')
const Router = require('router')
const app = new Koa()
const router = new Router()

router.get('/demo', async (ctx, next) => {
  ctx.body = 'hello world'
})

app.use(router.routes())
app.use()
```

实现
```js
class Layer {
  constructor(method, pathname, cb) {
    this.method = method
    this.pathname = pathname
    this.cb = cb
  }
  match(path, method) {
    return this.path === path && this.method === method.toLowerCase()
  }
}

class Router {
  constructor() {
    this.stack = []
  }
  get(pathname, cb) {
    const layer = new Layer('get', pathname, cb)
    this.stack.push(layer)
  }
  compose(fns, ctx, next) {
    const dispatch = (index) => {
      if (index === fns.length) next()
      const cb = fns[index].cb
      cb(ctx, () => dispatch())
    }
    dispatch(0)
  }
  routes() {
    return async(ctx, next) => {
      const path = ctx.path
      const method = ctx.method
      const fns = this.stack.filter((layer) => layer.match(path, method))
      this.compose(fns, ctx, next)
    }
  }
}
```
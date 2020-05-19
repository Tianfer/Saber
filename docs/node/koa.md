# koa

## 使用方式
```js
const Koa = require('koa')

const app = new Koa()
app.use((ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000)
```

## application.js
```js
const http = require('http')
const Event = require('event')
const Stream = require('stream')
const context = require('context') // 上下文对象
const request = require('request')
const response = require('response')

class Koa extends Event {
  constructor() {
    // 避免被this.context直接被修改
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
    this.middlewares = []
  }
  use(fn) {
    this.middlewares.push([])
  }
  createContext(req, res) {
    const ctx = this.content
    ctx.request = this.request
    ctx.request.req = ctx.req = req

    ctx.response = this.response
    ctx.response.res = response.res = res

    return ctx
  }
  compose(ctx) { // 执行use中的方法
    let index = 0
    let i = -1
    const dispatch = () => {
      if (i >= index) {
        return Promise.reject('multiple call next()')
      }

      if (index === this.middlewares.length) {
        return Promise.resolve()
      }

      const middleware = this.middlewares(index++)
      return Promise.resolve(middleware(ctx, () => dispatch()))
    }
  }
  handleRequest(req, res) {
    const ctx = this.createContext(req, res)

    res.statusCode = 404
    this.compose(ctx).then(() => {
      const body = ctx.body
      if (typeof body === 'string' || Buffer.isBuffer(body)) {
        return res.end(body)
      } else if (typeof body === 'number') {
        return res.end(body.toString())
      } else if (body instanceof Stream) {
        return body.pipe(res)
      } else if (typeof body === 'object') {
        return JSON.stringify(body)
      }
      res.end('Not Found')
    }).catch((err) => {
      this.emit('error', err) // 防止报错
    })
  }
  listen(port, cb) {
    const server = http.createServer(this.handleRequest.bind(this))
  }
}

module.exports = Koa
```

## context.js
```js
let context = {}

function defineGetter(property, key) {
  context.__defineGetter(key, function() {
    return this.[property][key]
  })
}
function defineSetter(property, key) {
  context.__defineSetter(key, function(val) {
    this[property][key] = val
  })
}

defineGetter('request', 'path')
defineGetter('request', 'url')
defineGetter('response', 'body')
defineSetter('response', 'body')
module.exports = context
```

## request.js
```js
const url = require('url')

module.exports = {
  get url() {
    return this.req.url
  }
  get path() {
    return url.parse(this.url).pathname
  }
}
```

## response.js
```js
module.exports = {
  _body: '',
  get body() {
    return this._body
  }
  set body(val) {
    this.res.statusCode = 200
    this._body = val
  }
}
```
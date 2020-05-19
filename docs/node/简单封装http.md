# 简单封装http
http模块作为node主要功能之一，如果直接写会有点麻烦，各种回调的。这里就学习简单的封装下http

## 实现
```js
const http = require('http')
const url = require('url')
const path = require('path')
const mine = require('mine')
const fs = require('mz/fs') // 支持promise

Class Server {
  async handleRequest(req, res) {
    try {
      const { pathname } = url.parse(req.url, true)
      let { currentPath } = path.join(__dirname, pathname)
      const statObj = await fs.stat(currentPath)

      if (statObj.isDirectory()) {
        currentPath = path.join(__dirname, 'index.html')
        await fs.access(currentPath) // 如果不存在会报错，然后被catch到
      }

      this.sendFile(req, res, statObj, currentPath)
    } catch(err) {
      this.handleError(err, req, res)
    }
  }

  sendFile(req, res, statObj, currentPath) {
    res.setHeader('Content-type', `${mime.getType(currentPath)};charset=utf8`)
    fs.createReadStream(currentPath).pipe(res)
  }

  handerError(err, req, res) { // 如果找不到文件，就404
    res.statusCode = 404
    res.end('Not Found')
  }

  start(port, cb) {
    const handle = this.handleRequest.bind(this)
    http.createServer(handle)
  }
}

const server = new Server() // 在另外的模块中，只需要简单的new一下，服务就起来了
server.start(3000, () => {
  console.log('running at 3000')
})
```

## 增加缓存
上面的功能虽然实现了，但是有一个问题，就是没有缓存，浏览器每次页面请求都附带大量的资源请求，所以缓存一些不常变的资源就很有必要了  
http缓存分为两种，强制缓存和对比缓存

### 强制缓存
```js
sendFile(req, res, statObj, currentPath) { // 承接上文的发送文件函数
  // 根据请求设置时长，因为设置之后，就会走缓存，等过期了才会到服务器
  res.setHeader('Cache-Control', 'max-age=10') // 缓存10s
  res.setHeader('Expires', New Date(Date.now() + 10 * 1000).toGMTString()) // 缓存10s

  res.setHeader('Content-type', `${mime.getType(currentPath)};charset=utf8`)
  fs.createReadStream(currentPath).pipe(res)
}
```

### 对比缓存1
```js
sendFile(req, res, statObj, currentPath) { // 承接上文的发送文件函数
  // 对比缓存 先比较一下内容是否变化 服务器给一个文件的最后修改时间

  if (statObj.ctime.toGMTString() === req.header['if-modified-since']) {
    res.statusCode = 304
    res.end()
    return
  }

  // res.setHeader('Cache-Control', 'no-cache') // 不让浏览器缓存
  res.setHeader('Last-Modified', statObj.ctime.toGMTString()) // 缓存10s

  res.setHeader('Content-type', `${mime.getType(currentPath)};charset=utf8`)
  fs.createReadStream(currentPath).pipe(res)
}
```
但是这种做法存在问题，可能文件内容没变，但是时间变了

### 对比缓存2
```js
const crypto = require('crypto')

sendFile(req, res, statObj, currentPath) { // 承接上文的发送文件函数
  // 对比缓存 先比较一下内容是否变化 服务器给一个文件的最后修改时间
  res.setHeader('Content-type', `${mime.getType(currentPath)};charset=utf8`)
  // res.setHeader('Cache-Control', 'no-cache') // 不让浏览器缓存

  const rs = fs.createReadStream(currentPath)
  const md5 = crypto.createHash('md5')
  const arr = []
  rs.on('data', (chunk) => {
    md5.update(chunk)
    arr.push(chunk)
  })
  rs.on('end', () => {
    const server = md5.digest('base64')
    const client = req.headers['if-none-match']
    if (client === server) {
      res.statusCode = 304
      res.end()
      return
    }

    res.setHeader('ETag', server)
    res.end(Buffer.concat(arr))
  })
}
```

## 两种缓存结合
```js
isCached(req, res, statobj, currentPath) {
  const lastModified = stat.ctime.toGMTString()
  const ETag = statObj.size.toString()
  req.setHeader('Cache-Control', 'max-age=10')
  req.setHeader('Last-Modified', lastModified)
  req.setHeader('ETag', ETag)

  if (lastModified !== req.headers['if-modified-since']) {
    return false
  }

  if (ETag !== req.headers['if-none-match']) {
    return false
  }

  return true
}

sendFile(req, res, statobj, currentPath) {
  if (this.isCached(req, res, statobj, currentPath)) {
    res.statusCode = 304
    res.end()
    return 
  }

  res.setHeader('Content-type', `${mime.getType(currentPath)};charset=utf8`)
  fs.createReadStream(currentPath).pipe(res)
}
```
# http
http作为应用层的协议，浏览器的网页加载和资源请求大部分都是基于它，对于前端来说不可谓不重要

## http请求
- 请求行 GET / HTTP 1.1
- 请求头
  - Accept
  - Accept-Encoding
  - Token
  - Range:bytes=0-5 // 206
- 主体 请求的数据
响应体
- 响应行 HTTP/1.1 200 OK 
- 响应头
  - Content-Type
  - Content-Encoding
  - Etag
  - Expires
- 响应体 html/json

## 状态码
- 200 成功 204 成功单没响应体 206 范围请求
- 301 永久重定向 302 临时重定向 304 服务器设置的缓存 307 临时重定向，不改变请求方法
- 404 not found 401 需要登录 403 登录没有权限 405 当前方法不被允许 400 错误的请求 408 Request Timeout
- 500 服务器异常 502 负载均衡挂了 503 服务器无法处理当前请求 504 Gateway Timeout

## 请求方法
- /user GET 获取    get和post是请求头
- /user POST 增加   增加了自定义的请求头，就不是简单请求了
- /user DELETE 删除  非简单请求 预检
- /user PUT 修改
- /user HEAD 获取报文首部，不返回报文主体部分
- /options OPTIONS 跨域 试探请求 预检
域名、端口、协议不一样就会跨域

## https
HTTPS是HTTP + SSL/TSL，点[这里](https://juejin.im/post/5b0274ac6fb9a07aaa118f49)查看更多

## http2
HTTP2是HTTP上的一次升级，点[这里](https://juejin.im/post/5b88a4f56fb9a01a0b31a67e)查看更多

## TCP
HTTP协议是基于TCP协议，点[这里](https://www.cnblogs.com/bj-mr-li/p/11106390.html)查看更多
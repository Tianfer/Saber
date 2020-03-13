# webpack-plugins
webpack-plugins是webpack打包中的重要的部分，他可以在打包过程中，做一些我们想要的事情。比如打包完成之后，就可以借助plugins上传git发布等等，省去了人力的部分，可以真正的实现，一句命令完成打包到上线的功能

## 实现
plugin是一个类(或者说是构造函数)，它上面要有一个apply方法，webpack在初始化时是调用的apply方法
```js
// 同步插件
class MyPlugin {
  apply(compiler) {
    // 注入到hooks中的done时间上，然后执行回调
    compiler.hooks.done.tap('MyPlugin', () => {
      console.log('my-plugin') // 完成打包后输出my-plugin
    })
  }
}

module.exports = MyPlugin
```
也可以是异步插件
```js
// 异步插件
class asyncPlugin {
  apply(compiler) {
    // 在发射文件上注入异步方法
    compiler.hooks.emit.tapAsync('asyncPlugin', (compilation, cb) => {
      setTimeout(() => {
        console.log('异步插件: 等我一秒') // 等待1s后输出my-plugin
        cb()
      }, 1000) // 打包会等待1s，然后再往下走
    })
  }
}

module.exports = asyncPlugin
```

## 配置
webpack配置
```js
const path = require('path')
const { resolve } = path

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  plugins: [
    new MyPlugin(),
    new AsyncPlugin()
  ]
}
```

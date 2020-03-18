# webpack-loader
webpack-loader是webpack打包中的重要的部分，需要他来将特定的语法/内容转成我们想要的语法/内容，所以学习下如何手写一个简单的webpack-loader，既能学习他的设计思想，如果以后工作中需要自己手写也能派上用场

## 原理
loader是一个函数，接受source(源码)，sourceMap等  
经过对源码的处理后，然后将其返回，具体参考可以点[这里](/打包工具/babel.md)

## 实现
```js
const loaderUtils = require('loader-utils') // 拿取参数
const schemaUtils = require('schema-utils') // 校验参数

// source为文件的源码
function loader(source) {
  this.cacheable && this.cacheable() // 可以缓存

  const options = loaderUtils.getOptions(this) // this指向webpack
  const schema = {
    type: 'object', // 传入是个对象
    properties: {
      text: {
        type: 'string', // text是个字符串
      }
    }
  }

  // 对比
  schemaUtils(schema, options, 'my-loader')

  return '/* my-loader */' + source
}

module.exports = loader
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
  resolveLoader: { // loader快速访问配置
    modules: ['node_modules', resolve(__dirname, 'loader')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'my-loader', // 加上我的loader
      }
    ]
  }
}
```

## 结果
![my-loader](/my-loader.png)
然后我们的babel就生效了，妈妈再也不用担心我处理不好js了
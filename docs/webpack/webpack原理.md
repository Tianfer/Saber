# webpack
webpack作为前端工程化中重要的一环，还是要学习下他的原理

## 流程
1. 根据配置读取文件，读取文件入口，打包出口等
   - 配置文件如webpack.config.js(还可以是webpackfile.js但很少见)
2. 用fs模块读取文件入口
3. 将读取的文件解析成AST语法树，然后替换其中的关键内容和形成键值关系
   - require替换成__webpack_require__
   - 文件路径替换成相对项目的文件路径
   - 将文件名和文件code块形成键值关系
   - 如果该文件下还依赖其他模块，则遍历它，并且重复1-4的操作
4. 读取模板，并且将键值对遍历，再输出文件
大致流程就是这样了，但是webpack可以继承很多的loader和plugin，那怎么添加这些loader和plugin呢

## 大致的配置文件
```js
module.exports = {
  mode: 'development', // 打包模式
  entry: './src/index.js', // 入口文件
  output: './dist/bundle.js', // 输出问价
  module: {
    rules: [
      {
        test: /\.js$/, // loader要解析的文件
        use: 'babel-loader', // 添加的loader
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin() // plugin配置
  ]
}
```
配置之后，打包时webpack就会读取配置中的module.rules和plugin做特殊处理

## loader
webpack在读取文件之后，会去找对应的babel，什么是对应的呢，就是写在rules中的test，根据他来匹配  
如果有匹配的loader，webpack遍历匹配结果执行loader函数，并将读取的文件内容传入，点这里可以看[loader-demo](/webpack/手写loader.md)

## plugin
webpack借助了tabable挂载了很多hooks，如果emit，run，done等等，plugin则是将方法注入这些hooks中，等事件触发是，执行注入的方法，点这里可以看[plugin-demo](/webpack/手写plugin.md)

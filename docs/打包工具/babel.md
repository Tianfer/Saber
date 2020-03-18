# babel
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中  
具体使用方式我就不再赘述了，直接去[Babel官网](https://www.babeljs.cn/docs/)看就行了

## 原理
这里读的代码是babel7的，对面与babel6有所不同
1. webpack读取webpack.config.js配置之后，加载module.rules中的配置
2. 加载js文件得到source(即js代码)，如果配置了babel-loader，则将source传给babel-loader
3. 通过@babel/parse把代码转成AST语法树
4. 遍历plugins，然后执行，装语法转换成对应的语法
5. 通过@babel/generator再把AST语法树转成js代码
6. 再将source返回给webpack

## AST树结构
```js
const Node = {
  type: 'FunctionDeclaration',
  start: 0,
  end: 39,
  loc: { start: [Position], end: [Position] },
  id: {
    type: 'Identifier',
    start: 9,
    end: 12,
    loc: [SourceLocation],
    name: 'add',
    leadingComments: undefined,
    innerComments: undefined,
    trailingComments: undefined
  },
  generator: false,
  async: false,
  params: [ [Node], [Node] ],
  body: {
      type: 'BlockStatement',
      start: 19,
      end: 39,
      loc: [SourceLocation],
      body: [Array],
      directives: [],
      leadingComments: undefined,
      innerComments: undefined,
      trailingComments: undefined 
  },
  leadingComments: undefined,
  innerComments: undefined,
  trailingComments: undefined
}
```
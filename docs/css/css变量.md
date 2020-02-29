# css变量
css变量很强大，这里简单记录下，要看的大而全的话去[张鑫旭的博客](https://www.zhangxinxu.com/wordpress/2016/11/css-css3-variables-var/)可以了解

### 使用
先看下如何生命和使用
```css
:root: { --blueTheme: #0ff; }
.header { background-color: var(--blurTheme) }
```
看起来使用非常简单，一起需要less，sass这种来定义全局的颜色和主题，现在css自己也可以做到了

### 拓展
似乎就这么结束了，篇幅有点短，再加多一点实用的  
通过[js获取css的变量](https://www.zhangxinxu.com/wordpress/2020/02/css-params-to-js/)，来做具体业务，比如最近很火的黑暗模式  
文档点[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)
```css
:root { --theme: 'unknow' }
@media (prefers-color-scheme: light) {
  :root { --theme: 'light' }
}
@media (prefers-color-scheme: dark) {
  :root { --theme: 'dark' }
}
```
```js
  const theme = getComputedStyle(document.documentElement).getPropertyValue('--theme')
```
这样就能获取到当前主题，并且通过js去加载特定的场景等等  
突然想起来某公司产品要求开发根据用户手机壳来更改主题，聊着聊着就打起来了  
不知道做成这亚子产品还会不会打我。。。。。 

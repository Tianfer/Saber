# white-space
它是css中的一个属性，因为作用强大并且应用多，特此开篇介绍下

### 值
- normal 默认 空白会被浏览器忽略
- pre 空白会被保留
- pre-wrap 空白会被保留
- pre-line 空白会被保留，并且保留换行符
- nowrap 不会换行知道遇到 <br>
- inherit 继承父元素的值

### 重点
nowrap 可以组织文字换行  
pre可以保留空白符，比如：
```html
  <div class="keep">hello    world</div>
```
hello和world之间四个空格，但是经过解析，展示到页面的时候，就只剩一个空格了  
这个时候white-space就派上用场
```css
.keep { white-space: pre; }
```
要是放以前我就会写4个\&nbsp;了

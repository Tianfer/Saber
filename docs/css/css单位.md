# css单位
了解css不同的单位，已经适合的应用的场景，能够帮助我们更好的实现页面布局，而不用各种hack

### em
根据父级的font-size来
```css
.outter { font-size: 12px }
.inner { font-size: 2em } // 12 * 2 = 24
```

### rem
根据html的更元素的font-size来
```css
html { font-size: 100px }
.inner { font-size: .16rem } // 100 * 0.16 = 16
```
但是要注意的一点是，移动端上面可能网速没那么快，所以css文件可能加载很慢，就会有个显示问题。一开始字体很大，然后又突然正常了
原因就是html的font-size为100，但是对应的类的css还未加载，所以页面中都默认继承100px的font-size
然而要解决这个问题，只需要一行代码
```css
body { font-size: 14px }
```
普通元素继承时，就继承了body的font-size，然后等css文件加载下来时，rem值又会根据html上的设置来计算，就不会有上述问题了，另外也能防止某个div没有写font-size结果继承了html的100，字体就特别大了。

### ch
定义为0字符的宽度的“先进的尺寸”
```css
.inner { width: 4ch; word-break: break-all }
```
这样的话，4个0就刚刚好填满了宽度，第5个的时候就换行了

### ex
当前字体的x-height，可以用它来实现居中效果。文字与图片同行时，文字的底部，就是在x的基线上

### vw, vh, vmax, vmin
- vw: 100vw = 屏幕宽度
- vh: 100vh = 屏幕高度
- vmax: max(100vw, 100vh)
- vmin: min(100vw, 100vh)
虽然都用的很少，但是有时候还是可以用来解决某些业务场景
```css
html { font-size: calc(100vw / 375 * 100) } // 375为设计稿宽度
body { font-size: 14px } // 原因见rem
```

### pt, pc, cm, mm, in
- pt: 磅
- pc: 12 点活字
- cm: 厘米
- mm: 毫米
- in: 英寸
换算： 1in = 2.54cm = 25.4mm = 72pt = 6pc = 96px

// background-clip、src-set、object-fit、content也可以展示图片
# 图片展示相关
css3中更新了一下跟图片相关的api，这里简单介绍下

### background-clip
他有三个值
- border-box 背景被裁剪到边框盒，默认
- padding-box 背景被裁剪到内边距框
- content-box 背景被裁剪到内容框
用法也就那样，有意思的地方是，它比box-sizing多了个padding-box

### image-set
image-set是为了适配不同手机的分辨率而产生的，这里不就不得提到另外一个概念
DPR:
　　设备像素比DPR(devicePixelRatio)是默认缩放为100%的情况下，设备像素和CSS像素的比值  
　　dpr，也被成为device pixel ratio，即物理像素与逻辑像素的比  
比如在iphone6下屏幕宽度为375 dpr为2 那么他的设备像素就为 750  
那么如果一个图如果在375上的宽度为50，那么在750的宽度里它就是100  
所以以前的做法就可能是
```css
@media screen and (-webkit-min-device-pixel-ratio: 1) {
  img { background-image: url('/img/demo-1x.png') }
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  img { background-image: url('/img/demo-2x.png') }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  img { background-image: url('/img/demo-3x.png') }
}
```
js可以获取到这个值，也可以这么写
```pug
if window.devicePixelRatio === 1
  img(src="/img/demo-1x.png")
else if window.devicePixelRatio === 2
  img(src="/img/demo-2x.png")
if window.devicePixelRatio === 3
  img(src="/img/demo-3x.png")
```
但是有这个属性之后，就不需要这么一长串的代码了
```css
img { background-image: image-set( "demo-1x.png" 1x, "demo-2x.png" 2x, "demo-3x.png" 3x ); }
```
有些webkit上的兼容写法，地址前需要加上url
```css
img { background-image: image-set( url("demo-1x.png") 1x, url("demo-2x.png") 2x ); }
```

### object-fit
原照[文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)的原文来说：指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框  
简单的点说就是，图片展示的对齐方式，总共有5个属性值
- contain 长边对齐，短边与框之间会有空白
- cover 短边对齐，长边溢出
- fill 短边和长边都对齐
- none 保持原有尺寸
- scale-down 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些
以前希望图片能覆盖元素，就得这样写
```css
img { background-image: url('/demo.png'); background-size: cover; }
```
现在就可以这样写了
```css
img { object-fit: cover }
```
而且配合object-position还可以定位，它和background-position用法相同，就不赘述了，详情可以点[这里](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position)

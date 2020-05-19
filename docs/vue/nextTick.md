# nextTick原理
nextTick是Vue中异步更新dom的方法，学习下怎么实现的
1. 优先使用Promise.resolve().then()
2. 如果Promise不支持，则使用MutationObserver(2.5中使用的是MessageChannel)
3. 如果MO不支持，则使用setImmediate
4. 如果setImmediate不行，则使用setTimeout

## Promise
微任务
```js
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    
    if (isIOS) { setTimeout(noop); } // 解决IOS下的bug
  };
  isUsingMicroTask = true;
}
```

## mutationObserver
微任务
```js
// dom更新后执行回调
var counter = 1;
var observer = new MutationObserver(flushCallbacks); // flushCallbacks执行回调函数 
var textNode = document.createTextNode(String(counter)); // 创建纯文本节点
observer.observe(textNode, { // 观察节点变化
  characterData: true
});
timerFunc = function () { // 触发执行回调的方法
  counter = (counter + 1) % 2;
  textNode.data = String(counter);
};
isUsingMicroTask = true;
```

## messageChannel
微任务
```js
const channel = new MessageChannel()
const port1 = channel.port1
const port2 = channel.port2
port2.postMessage('demo')

port1.onmessage = function(e) {
  console.log(e)
}

setTimeout(() => {
  console.log('setTimeout')
}, 0)
// 先输出demo，然后setTimeout
```

## setImmediate
宏任务
```js
timerFunc = function () {
  setImmediate(flushCallbacks);
};
```

## setTimeout
宏任务
```js
timerFunc = function () {
  setTimeout(flushCallbacks);
};
```

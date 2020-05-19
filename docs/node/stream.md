# stream
流（stream）是 Node.js 中处理流式数据的抽象接口。 stream 模块用于构建实现了流接口的对象。

## 可读流
实现的原理是fs.open + fs.read
```js
const fs = require('fs')
const readStream = fs.createStream('./demo.txt')

readStream.on('error', (err) => {
  console.log('err: ', err)
})

readStream.on('open', () => {
  console.log('open')
})

var arr = []
readStream.on('data', (chunk) => {
  console.log('data: ', chunk)
  arr.push(chunk)
  // readStream.pause() 可以暂停读取
})

// setTimeout(() => {
//   readStream.resume() // 可以恢复读取
// }, 1000)

readStream.on('end', () => {
  console.log('读取完毕')
})

readStream.on('close', () => {
  console.log('close')
})
```

## 可写流
实现的原理是fs.open + fs.write
```js
const fs = require('fs')
const writeStream = fs.createStream('./write-demo.txt')

writeStream.on('error', (err) => {
  console.log('err: ', err)
})

writeStream.on('open', () => {
  console.log('open')
})

// flag可判断是否能够继续写
let flag = writeStream.write('write-demo')

// 当实际写入内容大小大于或者等于预计写入内容时触发
writeStream.on('drain', () => {
  console.log('drain')
})

writeStream.on('end', () => {
  console.log('写完毕')
})

writeStream.on('close', () => {
  console.log('close')
})
```

## 双工流
```js
const { Duplex } = require('stream');

const myDuplex = new Duplex({
  read(size) {
    // ...
  },
  write(chunk, encoding, callback) {
    // ...
  }
});
```

## 转换流
```js
class MyTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
}

const myTransform = new MyTransform()
process.stdin.pipe(myTransform).pipe(process.stdout)
```
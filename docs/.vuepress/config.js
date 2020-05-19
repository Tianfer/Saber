module.exports = {
  title: '因吹斯汀',
  description: '博客',
  themeConfig: {
    sidebar: [
      {
        title: 'css',
        path: '/css/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/css/垂直水平居中.md', '垂直水平居中'],
          ['/css/清除浮动.md', '清除浮动'],
          ['/css/圣杯布局.md', '圣杯布局'],
          ['/css/css变量.md', 'css变量'],
          ['/css/css单位.md', 'css单位'],
          ['/css/css中的图片展示.md', 'css中的图片展示'],
          ['/css/white-space.md', 'white-space'],
        ]
      },
      {
        title: 'js',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/js/函数柯里化.md', '函数柯里化'],
          ['/js/继承.md', '继承'],
          ['/js/节流去抖.md', '节流去抖'],
          ['/js/跨域问题.md', '跨域问题'],
          ['/js/垃圾回收机制.md', '垃圾回收机制'],
          ['/js/模块化.md', '模块化'],
          ['/js/前端安全.md', '前端安全'],
          ['/js/设计模式.md', '设计模式'],
          ['/js/深拷贝和浅拷贝.md', '深拷贝和浅拷贝'],
          ['/js/apply和call.md', 'apply和call'],
          ['/js/bind.md', 'bind'],
          ['/js/generator.md', 'generator'],
          ['/js/lazyMan.md', 'lazyMan'],
          ['/js/new和instanceof.md', 'new和instanceof'],
          ['/js/promise.md', 'promise'],
        ]
      },
      {
        title: 'node',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/node/简单封装http.md', '简单封装http'],
          ['/node/koa.md', 'koa'],
          ['/node/koa中间件.md', 'koa中间件'],
          ['/node/stream.md', 'stream'],
        ]
      },
      {
        title: 'Vue',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/vue/组件通信.md', '组件通信'],
          ['/vue/nextTick.md', 'nextTick'],
          ['/vue/vue-router.md', 'vue-router'],
          ['/vue/vuex.md', 'vuex'],
        ]
      },
      {
        title: '打包工具',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/打包工具/手写loader.md', '手写loader'],
          ['/打包工具/手写plugin.md', '手写plugin'],
          ['/打包工具/babel.md', 'babel'],
          ['/打包工具/gulp原理.md', 'gulp原理'],
          ['/打包工具/webpack原理.md', 'webpack原理'],
        ]
      },
    ]
  }
}
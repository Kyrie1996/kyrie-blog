# webpack打包优化
优化前:

本地编译:

![节点](/webpack/webpack-chore-1.png)

本地打包：

![节点](/webpack/webpack-chore-2.png)
![节点](/webpack/webpack-chore-3.png)

包大小分析:

![节点](/webpack/webpack-chore-4.png)
![节点](/webpack/webpack-chore-5.png)

这里一看elementUi被打包进来了,压缩后都有660kb了,那就先把这个库给移除打包的流程,这里采用的是用cdn加载的方式, 同时设置webpack的externals在webpack打包时排除element-ui.

修改 vue.config.js：
```javascript
  externals: {
    'element-ui': 'ELEMENT',
  },
```

然后在index.html文件引入element的cdn链接，跑下项目看看
![节点](/webpack/webpack-chore-6.png)
这里报错的原因是: CDN 的 Element 依赖全局变量 Vue， 所以 Vue 也需要使用 CDN 引入。
![节点](/webpack/webpack-chore-7.png)
这里把vue的引用去掉，然后在index.html里引入vue对应版本的CDN链接, 且要在 element之前引入 vue。

index.html
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <!-- 引入 ElementUI 样式 -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<body>
  <!-- 在引入 ElementUI 之前引入 Vue，会注入全局变量 Vue  -->
  <script src="https://unpkg.com/vue@2.6.12/dist/vue.js"></script>
  <!-- 引入 ElementUI 组件库，会注入全局变量 -->
  <script src="https://unpkg.com/element-ui@2.15.0/lib/index.js"></script>
</body>
</html>
```
vue.config.js修改为：
```javascript
  externals: {
    'vue': 'Vue',
    'element-ui': 'ELEMENT',
  },
```
把main.js中vue的引入去掉后，代码上引用Vue的地方就会出现这个提示，
![节点](/webpack/webpack-chore-8.png)

这是eslint的检测，可以去eslintrc.js去配置globals属性,把vue加到全局上去就不会有警告提示了。
![节点](/webpack/webpack-chore-9.png)

优化后：

本地编译：

![节点](/webpack/webpack-chore-10.png)

打包：

![节点](/webpack/webpack-chore-11.png)
![节点](/webpack/webpack-chore-12.png)
![节点](/webpack/webpack-chore-13.png)
![节点](/webpack/webpack-chore-14.png)

通过对比, 可以看到op-chunk-vendors.js这个文件变小了600多kb，在本地编译和打包时间上比之前少了2s, 平均时间32s
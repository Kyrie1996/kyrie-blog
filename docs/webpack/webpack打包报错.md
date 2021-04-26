# 解决webpack打包报错 No module factory available for dependency type: CssDependency

![节点](/webpack/webpack-error.png)

问题描述：在打包过程出现 没有可用于依赖类型的模块 CssDependency

遇到这个问题，一开始想是不是依赖装少了，就删掉了node_modules，重新安装一遍依赖，结果还是不行，网上查了下都说要去在vue.config.js中添加一下代码：
```javascript
module.exports = {
  css: {
    extract: false
  }
};
```
![节点](/webpack/webpack-css.png)
在生产环境的时候我们是肯定要把css提取出来的，因此这个方法不太可行。

后面重新run了下项目，发现有个warning:
![节点](/webpack/case-semantic.png)

```
There are multiple modules with names that only differ in casing.
有多个模块同名仅大小写不同
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
这可能导致在一些文件系统中产生不是预期的行为
Use equal casing.
使用唯一的写法
```
查了下发现是项目目录的名字大小写不同, 虽然项目也跑成功了, 但是打包的时候就会报上面那个找不到依赖的模块从而退出打包进程。
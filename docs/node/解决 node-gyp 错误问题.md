# 解决 node-gyp 错误问题
1. npm 安装windows-build-tools

  cmd管理员模式打开，执行下面命令：

  ``` node
    npm install --global --production windows-build-tools
  ```


等待执行完成，重启CMD

2. windows下安装node-gyp
  
  node-gyp就是为node编译c++扩展的时候使用的编译工具。
  安装方法：
  ``` node
    npm install -g node-gyp
  ```

3. 配置依赖
  ``` node
    npm config set python python2.7
    npm config set msvs_version 2015
  ```
  进行到这里,不出意外已经可以用node-gyp进行构建了

  如果这里还是构建失败了，就需要去visual studio下载最新版的，[点击下载visual studio](https://visualstudio.microsoft.com/zh-hans/downloads/)

  安装的时候需要勾选以下几个选项

  ![节点](/node/vs.png)
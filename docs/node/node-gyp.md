# gyp和node-gyp

## 什么是gyp？

gyp全称Generate Your Projects（构建你的项目）

::: tip
  它是一套用于生成原生IDE项目文件的自动化构建工具，处理C/C++项目，同类型的有CMake、ninja等自动构建工具。
:::

## 什么是node-gyp？
::: tip
  node-gyp is a tool which compiles Node.js Addons. Node.js Addons are native Node.js Modules, written in C or C++, which therefore need to be compiled on your machine. After they are compiled with tools like node-gyp, their functionality can be accessed via require(), just as any other Node.js Module.
:::

简单来说，node是跨平台的，那么对于任何的node模块理论也是应该是跨平台的。然而，有些node模块直接或间接使用原生C/C++代码，这些东西要跨平台，就需要使用源码根据实际的操作平台环境进行原生模块编译。那么我们需要下载源码文件，通过node-gyp生成一定结构的代码项目让我们能够require引入（譬如，Windows下会生成vcxproj，再调用MSBuild进行编译，以生成Windows下的动态链接库，最后打包为一个原生node模块）。

相关链接:

[node-gyp的作用是什么?](https://www.zhihu.com/question/36291768)

[什么是node-gyp？](https://juejin.cn/post/6949528268512952333)
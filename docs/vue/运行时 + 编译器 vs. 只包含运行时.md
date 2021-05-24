# 运行时 + 编译器 vs. 只包含运行时
如果你需要在客户端编译模板 (比如传入一个字符串给 template 选项，或挂载到一个元素上并以其 DOM 内部的 HTML 作为模板)，就将需要加上编译器，即完整版：
```js
  // 需要编译器
  new Vue({
    template: '<div>{{ hi }}</div>'
  })
  // 不需要编译器
  new Vue({
    render (h) {
      return h('div', this.hi)
    }
  })
```
当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。你在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。
一般我们总是使用非完整版，然后配合vue-loader 和 vue 来进行使用。

```js
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app')
```
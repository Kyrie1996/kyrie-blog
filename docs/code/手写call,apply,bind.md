# 手写call,apply,bind
call和apply的实现，都是使用将函数放到字面量obj的某个属性中，使函数中的this指向obj这个字面量对象。
## 基础代码
```js
  var person = {
    name: '哈哈'
  }

  function sayName(a, b, c) { 
    console.log(this.name)
    console.log(a, b, c)
    return {
      name: this.name,
      a,b,c
    }
  }
```
## call
call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。 即：可以改变当前函数的this指向；还会让当前函数执行。

### 基本思路


```js
  Function.prototype.myCall = function (context) {
    context = context || window
    // 这里的this指向的是调用myCall的方法,在这里可以把这个方法添加到新传入的对象中
    context.fn = this
    var result = context.fn()
    delete context.fn
    return result
  }

```
给函数原型添加myCall方法，创建一个上下文对象context，如果传入的对象不存在时，将指向全局window。通过给context添加fn属性，context的fn引用调用该方法的函数fun，并执行fun。执行完成之后删除该属性fn, 返回计算结果。

```js

  Function.prototype.myCall =  function(context) {
    context = context || window
    context.fn = this
    var arr = []
    for(var i = 1; i < arguments.length; i++) {
      arr.push(i)
    }
    var result = context.fn(...arr)
    delete context.fn
    return result;
  }

  console.log(sayName.myCall(person, 1, 2, 3))
  // 哈哈
  // 1 2 3
  // { name: '哈哈', a: 1, b: 2, c: 3 }
```

## apply
与call方法类似，call方法接收的是一个参数列表，而apply方法接收的是一个包含多个参数的数组。
```js  
  // 将函数中的this指向传入的第一个参数，第二个参数为数组。
  Function.prototype.myApply = function (context, arr) {
    context = context || window
    context.fn = this
    var result
    if(!arr) {
      result = context.fn()
    } else {
      var newArr = []
      for(var i = 0; i < arr.length; i++) {
        newArr.push(i)
      }
      result = context.fn(...newArr)
    }

    delete context.fn
    return result;
  }

  console.log(sayName.myApply(person, [1, 2, 3]))
  // 哈哈
  // 1 2 3
  // { name: '哈哈', a: 1, b: 2, c: 3 }
```

## bind
bind() 方法创建一个新的函数，不自动执行，需要手动调用bind() 。这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

将obj绑定到fun函数的this上，函数fun可以使用obj内部的属性，和传入的变量。

此外，bind方法绑定的函数还可以new一个实例，不过此时的this会发生改变。在使用new操作符时，注意的是需要改变this的指向问题，如果是new，那么this指向的是实例，不使用new则指向bind当前传入的第一个参数。

代码实现
```js
  Function.prototype.myBind = function (context) {
    let that = this
    let args = Array.prototype.slice.call(arguments, 1)
    function fBind() { // 执行bind函数
      let bindArgs = Array.prototype.slice.call(arguments)
      // 如果使用的是new，那么this会指向fBind实例，this作为当前实例传入 不是的话，使用context上下文对象
      return that.apply(this instanceof fBind ? this : context, args.concat(bindArgs))
    }
    function Fn(){} // 两个类的原型并未公用，而是通过原型链的方式找到该原型方法
    Fn.prototype = this.prototype
    fBind.prototype = new Fn()
    return fBind
  }
```
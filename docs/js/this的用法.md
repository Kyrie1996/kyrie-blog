# this的用法
执行上下文中包含了变量环境、词法环境、外部环境、this。

- 全局执行上下文中的 this 指向 window 对象
- 函数执行上下文中的 this 也是指向 window 对象的
  
### 执行上下文中的 this 来指向其他对象的三种方式

  1. 通过函数的 call 方法设置(bind和apply也可以)
      ``` javascript
      let bar = {
        myName : " bar ",
        test1 : 1
      }
      function foo(){
        this.myName = " foo "
      }
      foo.call(bar)
      console.log(bar)
      console.log(myName)
      ```

  2. 通过对象调用方法设置
      ``` javascript
      var myObj = {
        name : " myname ",
        showThis: function(){
         console.log(this)
        }
      }
      myObj.showThis()
      ```

  3. 通过构造函数中设置
     
      ``` javascript
      function CreateObj(){
        this.name = " hello world "
      }
      var myObj = new CreateObj()
      ```
      当执行 new CreateObj() 的时候，JavaScript 引擎做了如下四件事：
      - 首先创建了一个空对象 tempObj；
      - 接着调用 CreateObj.call 方法，并将 tempObj 作为 call 方法的参数，这样当CreateObj 的执行上下文创建时，它的 this 就指向了 tempObj 对象；
      - 然后执行 CreateObj 函数，此时的 CreateObj 函数执行上下文中的 this 指向了tempObj 对象；
      - 最后返回 tempObj 对象。
    相当于
      ``` javascript
      var tempObj = {}
      CreateObj.call(tempObj)
      return tempObj
      ```
### this 的设计缺陷以及应对方案

- 嵌套函数中的 this 不会从外层函数中继承
  1. 可在嵌套函数外部声明一个变量 self 用来保存 this
    ``` javascript
    var myObj = {
      name : " hello ",
      showThis: function(){
        console.log(this)
        var self = this
        function bar(){
          self.name = " world "
        }
        bar()
      }
    }
    myObj.showThis()
    console.log(myObj.name)
    console.log(window.name)
    ```
  2. 使用 ES6 中的箭头函数
    ``` javascript
    var myObj = {
      name : " hello ",
      showThis: function(){
        console.log(this)
        var bar = () => {
          this.name = " world "
        }
        bar()
      }
    }
    myObj.showThis()
    console.log(myObj.name)
    console.log(window.name)
    ```
- 普通函数中的 this 默认指向全局对象 window
  1. 可以通过设置 JavaScript 的“严格模式”来解决。在严格模式下，默认执行一个函数，其函数的执行上下文中的 this 值是 undefined
   


#### 代码优化
  ``` javascript
  let userInfo = {
    name:"jack.ma",
    age:13,
    sex:male,
    updateInfo:function(){
      // 模拟 xmlhttprequest 请求延时
      setTimeout(function(){
      this.name = "pony.ma"
      this.age = 39
      this.sex = female
      },100)
    }
  }
  userInfo.updateInfo()
  ```
  此代码中setTimeOut() 函数内部的回调函数，this指向全局函数。修复：在外部绑this或者使用箭头函数。

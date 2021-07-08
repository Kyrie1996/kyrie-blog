# 实现forEach,map,filter,reduce

1. forEach
  ```js
  Array.prototype.myForeach = function(callback,thisArg) {
    // 不不能是null或undefined调用方法
    if(this == null) {
      throw new TypeError("Array called on null or undefined")
    }
    // 第一个参数必须要为function
    if(typeof callback !== 'function') {
      throw new TypeError(callback + " is not a function");
    }
    // 获取数组
    let arr = [].slice.call(this)
    let len = arr.length
    for(let i = 0; i<len; i++) {
      callback.call(thisArg, arr[i], i, arr)
    }
  }
  ```
2. map
  map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

  ```js
    Array.prototype.myMap = function(callback, thisArg) {
      // 不能是null或undefined调用方法
      if (this == null) {
        throw new TypeError(
          "Array called on null or undefined"
        );
      }
      // 第一个参数必须要为function
      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }
      let array = [].slice.call(this),
          len = array.length,
          result = []
      for(let i = 0; i < len; i++) {
        if (arr.hasOwnProperty(i)) {
          result.push(callback.call(thisArg,array[i],i,array))
        }
      }
      return result
    }
  ```
3. filter
   filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
   ```js
    Array.prototype.myFilter = function(callback, thisArg) {
      // 不能是null或undefined调用方法
      if (this == null) {
        throw new TypeError(
          "Array called on null or undefined"
        );
      }
      // 第一个参数必须要为function
      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }
      let array = [].slice.call(this),
          len = array.length,
          result = []
      for(let i = 0; i < len; i++) {
        if (arr.hasOwnProperty(i)) {
          // 检查 callback 的返回值是否是真值
          if (callback.call(thisArg,array[i],i,array)) {
            result.push(array[i])
          }
        }
      }
      return result
    }
   ```
4. reduce
   reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
  ```js
    Array.prototype.myReduce = function(callback, initalValue) {
      // 不能是null或undefined调用方法
      if (this == null) {
        throw new TypeError(
          "Array called on null or undefined"
        );
      }
      // 第一个参数必须要为function
      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }
      // 如果有传递 initialValue，则索引从 1 开始，否则从 0 开始
      let arr = [].slice.call(this),
          len = arr.length,
          value = initalValue ? initalValue :  arr[0],
          startIndex = initalValue ? 0 : 1
      for (let i = startIndex; i < arr.length; i++) {
        if (arr.hasOwnProperty(i)) {
          value = callback(value, arr[i], i, arr);
        }
      }
      return value
    }
  ```
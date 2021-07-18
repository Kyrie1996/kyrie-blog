# 实现promise

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    const resolve = (value)=> {
      if(this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // resolve里面将所有成功的回调拿出来执行
        while (this.onFulfilledCallbacks.length) {
          // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
          this.onFulfilledCallbacks.shift()(value)
        }
      }
    }
    const reject = (reason) => {
      if(this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // reject里面将所有失败的回调拿出来执行
        while (this.onRejectedCallbacks.length) {
          this.onRejectedCallbacks.shift()(reason)
        }
      }
    }
    // 存储成功回调函数
    this.onFulfilledCallbacks = [];
    // 存储失败回调函数
    this.onRejectedCallbacks = [];
    try {
      executor(resolve, reject)
    } catch (error) {
      // 如果有错误，就直接执行 reject
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
    const promise2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
         // 创建一个微任务等待 promise2 完成初始化 queueMicrotask
        setTimeout(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }  
        }) 
      } else if(this.status === REJECTED) {
        // 创建一个微任务等待 promise2 完成初始化
        setTimeout(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          } 
        }) 
      } else if(this.status === PENDING) {
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(() => {
          // ==== 新增 ====
          setTimeout(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          }) 
        });
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          setTimeout(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }) 
        });
      }
    })
    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof MyPromise) {
      x.then(resolve, reject)
    } else {
      resolve(x)
    }
  }

  // resolve 静态方法
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

}
module.exports = MyPromise;
```
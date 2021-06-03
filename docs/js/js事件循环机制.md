# js事件循环机制

### 事件循环
    JavaScript的一大特点就是单线程，而这个线程中拥有唯一的一个事件循环。
###

JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)来搞定另外一些代码的执行。

* 一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。
* 任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。
* macro-task大概包括：script(整体代码), setTimeout, setInterval, setImmediate(Node环境), I/O, UI rendering。
* micro-task大概包括: process.nextTick(Node环境), Promise, Object.observe(已废弃), MutationObserver(html5新特性)
* setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。
  
``` js
    // setTimeout中的回调函数才是进入任务队列的任务
    setTimeout(function() {
        console.log('xxxx');
    })
    // 非常多人对于setTimeout的理解存在偏差。所以大概说一下误解：
    // setTimeout作为一个任务分发器，这个函数会立即执行，而它所要分发的任务，也就是它的第一个参数，才是延迟执行
```
* 来自不同任务源的任务会进入到不同的任务队列。其中setTimeout与setInterval是同源的。
* 事件循环的顺序，决定了JavaScript代码的执行顺序。它从script(整体代码)开始第一次循环。之后全局上下文进入函数调用栈。直到调用栈清空(只剩全局)，然后执行所有的micro-task。当所有可执行的micro-task执行完毕之后。循环再次从macro-task开始，找到其中一个任务队列执行完毕，然后再执行所有的micro-task，这样一直循环下去。
* 其中每一个任务的执行，无论是macro-task还是micro-task，都是借助函数调用栈来完成。


首先，事件循环从宏任务队列开始，这个时候，宏任务队列中，只有一个script(整体代码)任务。每一个任务的执行顺序，都依靠函数调用栈来搞定，而当遇到任务源时，则会先分发任务到对应的队列中去。setImmediate的任务队列会在setTimeout队列的后面执行。

script中的代码在执行过程中，遇到不同的任务分发器，就将任务分发到各自对应的队列中去。接下来，将会执行所有的微任务队列中的任务。

其中，nextTick队列会比Promie先执行。nextTick中的可执行任务执行完毕之后，才会开始执行Promise队列中的任务。

当所有可执行的微任务执行完毕之后，这一轮循环就表示结束了。下一轮循环继续从宏任务队列开始执行。

::: tip 注意
 1. 宏任务中, setImmediate的任务队列会在setTimeout队列的后面执行。
 2. 微任务中, nextTick队列会比Promie先执行。
 3. process.nextTick 和 setImmediate 是Node环境下独有的, 在浏览器环境下会报错。
:::
举个例子：

```js
    console.log('golb1');

    setTimeout(function() {
        console.log('timeout1');
        new Promise(function(resolve) {
            console.log('timeout1_promise');
            resolve();
        }).then(function() {
            console.log('timeout1_then')
        })
    })

    new Promise(function(resolve) {
        console.log('glob1_promise');
        resolve();
    }).then(function() {
        console.log('glob1_then')
    })

    setTimeout(function() {
        console.log('timeout2');
        new Promise(function(resolve) {
            console.log('timeout2_promise');
            resolve();
        }).then(function() {
            console.log('timeout2_then')
        })
    })


    new Promise(function(resolve) {
        console.log('glob2_promise');
        resolve();
    }).then(function() {
        console.log('glob2_then')
    })

```

在上面这个例子中, 如果是在浏览器环境中，输出的结果如下:

golb1 -> glob1_promise -> glob2_promise -> glob1_then -> glob2_then -> timeout1 -> timeout1_promise -> timeout1_then -> timeout2 -> timeout2_promise -> timeout2_then

如果是在node环境下, 则输出结果如下：

golb1 -> glob1_promise -> glob2_promise -> glob1_then -> glob2_then -> timeout1 -> timeout1_promise -> timeout2
-> timeout2_promise -> timeout1_then -> timeout2_then

通过上面例子的输出结果来看，在不同编译环境下，执行的顺序不一样

::: tip 注意：不同编译环境下的差异
需要注意的是，这里的执行顺序，或者执行的优先级在不同的场景里由于实现的不同会导致不同的结果，包括node的不同版本，
不同浏览器等都有不同的结果。
  1. 在浏览器环境是一个宏任务执行完毕就执行所有的微任务
  2. 在node环境中是一类宏任务执行完毕再执行所有微任务
:::

参考文章: 

深入核心，详解事件循环机制: <https://www.jianshu.com/p/12b9f73c5a4f>
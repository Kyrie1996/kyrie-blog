// 单链表
class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}
class SingleList{
  constructor(){
    this.size = 0
    this.head = new Node('head')
    this.curNode = ''
  }
  // 获取链表长度
  getLength() {
    return this.size
  }
  // 判断单链表是否为空
  isEmpty() {
    return this.size === 0;
  }
  // 查询
  find(item) {
    let curNode = this.head
    while(curNode && curNode.data!==item) {
      curNode = curNode.next
    }
    return curNode
  }
  // 插入
  insert(item, element) {
    let curNode = this.find(item)
    while(!curNode) {
      return
    }
    let newNode = new Node(element)
    newNode.next = curNode.next
    curNode.next = newNode
    this.size++
  }
  // 找到具体某一项的前一项
  findPrev(item) {
    let curNode = this.head
    while(curNode.next!==null && curNode.next.data!== item) {
      curNode = curNode.next
    }
    return curNode
  }
  // 删除
  remove(item) {
    if(!this.find(item)) {
      return
    }
    // 先找到要删除的前一项
    let prevNode = this.findPrev(item)
    prevNode.next = prevNode.next.next
    this.size--
  }

  // 在单链表的尾部添加元素
  append(element) {
    let curNode = this.findLast()
    let newNode = new Node(element)
    curNode.next = newNode
    this.size++
  }
  // 获取单链表的最后一个节点
  findLast() {
    let curNode = this.head
    while(curNode.next) {
      curNode = curNode.next
    }
    return curNode
  }

  // 清空单链表
  clear() {
    this.head.next = null
    this.size = 0
  }

  // 单链表的遍历显示
  display() {
    let result = ''
    let curNode = this.head
    while (curNode) {
      result += curNode.data
      curNode = curNode.next
      if(curNode) {
        result += '->'
      }
    }
    console.log(result)
  }
  // 从当前节点向前移动n个位置
  advance(n, curNode = this.head) {
    this.curNode = curNode
    while (n && this.curNode.next) {
      this.curNode = this.curNode.next
      n--
    }
    return this.curNode
  }
}

// 单向循环链表
class CirSingleList extends SingleList {
  constructor(){
    super()
  }
  // 在单循环链表中寻找最后一个节点
  findLast() {
    let curNode = this.head
    let count = 0
    while(count !== this.size) {
      curNode = curNode.next
      count++
    }
    return curNode
  }
  // 在单循环链表中寻找数据
  find(item) {
    let lastNode = this.findLast() // 找到最后一个节点
    let curNode = this.head
    while(curNode.data!==item) {
      if(curNode === lastNode) { // 判断当前节点是不是最后一个节点
        curNode = null
        break
      }
      curNode = curNode.next
    }
    return curNode
  }

  // 在单向循环链表中插入数据
  insert(item, element) {
    let curNode = this.find(item);
    let newNode = new Node(element)
    if (!curNode) {  // 如果item在单循环链表中不存在
      return
    }

    // 插入的位置处于头结点之后，第一个节点之前
    if (curNode === 'head') {
      if (this.size === 0) { // 当单循环列表为空时
        this.head.next = newNode
        newNode.next = this.head.NEXT
      } else {
        let lastNode = this.findLast()
        newNode.next = this.head.next
        this.head.next = newNode
        lastNode.next = newNode
      }
      this.size++
      return
    }

    // 插入的位置处于链表的中间
    newNode.next = curNode.next
    curNode.next = newNode
    this.size++
  }
  remove(item) {
    let curNode = this.find(item) // 找到删除的节点 
    let lastNode = this.findLast() // 找到最后一个节点
    let prevNode = this.head

    // 找到待删除节点的前一个节点
    while(prevNode.next!==curNode) {
      prevNode = prevNode.next
    }

    if(curNode == this.head.next) { // 如果当前节点是第一个节点
      // 只有一个节点
      if(this.size == 1) {
        this.head.next = null
      }else {
        this.head.next = curNode.next
        lastNode.next = curNode.next
      }
    } else {
      // 其他情况
      prevNode.next = curNode.next
    }
    this.size--
  }
  // 单循环链表尾部增加元素
  append(element) {
    let lastNode = this.findLast()
    let newNode = new Node(element)
    newNode.next = this.head.next
    lastNode.next = newNode
    this.size++
  }

  display() {
    let result = 'head'
    let curNode = this.head
    let lastNode = this.findLast()
    while(curNode!==lastNode){
      curNode = curNode.next
      result += `->${curNode.data}`
    }
    console.log(result)
  }
}

// 测试
// let myList = new CirSingleList()
// let arr = [1,2,3,4,5,6,7,8]
// for(let i=0; i<arr.length; i++){
//   myList.append(arr[i]);
// }
// myList.display()
// myList.clear()
// myList.display()

// 约瑟夫环
// 在罗马人占领乔塔帕特后，39 个犹太人与Josephus及他的朋友躲到一个洞中，
// 39个犹太人决定宁愿死也不要被敌人抓。于是决定了自杀方式，41个人排成一个圆圈，
// 由第1个人开始报数，每报数到第3人该人就必须自杀。然后下一个重新报数，直到所有人都自杀身亡为止。
// 然而Josephus 和他的朋友并不想遵从，Josephus要他的朋友先假装遵从，
// 他将朋友与自己安排在第16个与第31个位置，于是逃过了这场死亡游戏。

// n个人围成一圈，杀死第m个人，直到剩下s个人为止
// 输出存活的人的序号
function killPerson(n, m, s) {
  let myList = new CirSingleList()
  for(let i= 1; i<=n; i++) {
    myList.append(i)
  }
  let curNode = undefined
  let toKill = null
  while(myList.size > s) { // 直到剩下s个节点为止
    toKill = myList.advance(m, curNode) // 从curNode开始，前进m个点
    curNode = toKill // 保存要删除的节点作为下一次循环的参数
    myList.remove(toKill.data) // 删除第m个节点
  }
  myList.display()
}

killPerson(41, 3, 2);  // head->16->31
killPerson(5, 4, 1);  // head->1

// 魔术师发牌问题
// 魔术师手中有A、2、3……J、Q、K十三张黑桃扑克牌。在表演魔术前，魔术师已经将他们依照一定的顺序叠放好（有花色的一面朝下）。魔术表演过程为：
// 一开始，魔术师数1，然后把最上面的那张牌翻过来，是黑桃A；然后将其放到桌面上；
// 第二次,魔术师数1、2；将第一张牌放到这些牌的最以下，将第二张牌翻转过来，正好是黑桃2；
// 第三次，魔术师数1、2、3；将第1、2张牌依次放到这些牌的最以下，
// 将第三张牌翻过来正好是黑桃3；以此类推，直到将全部的牌都翻出来为止。问原来牌的顺序是怎样的。
let magicList = new CirSingleList();
function magician() {
  let arr = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  for(let i = 0; i < 13; i++) {
    magicList.append('')
  }
  let n = 1 // n 用来统计放到桌面上的第几张牌
  let toShow = undefined // 放到桌面上的牌
  while (n <= 13) { 
    // 这里需要一步一步往前移动,如果一次性移动的话无法判断该节点是不是已经赋值过了，因此每一步移动都需要判断该节点是不是赋值过，赋值过的话就继续执行，没赋值的话将forward减一
    let forward = n
    while(forward!=0) {
      toShow = magicList.advance(1, toShow)
      if (!toShow.data) {
        forward--
      }
    }
    toShow.data = arr[n-1]
    n++
  }
  magicList.display();
}
magician();
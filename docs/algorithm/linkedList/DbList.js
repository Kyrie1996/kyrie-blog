// 双向链表
class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}
class DbList {
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
  // 找到具体某一项的前一项
  findPrev(item) {
    let curNode = this.head
    while(curNode.next!==null && curNode.next.data!== item) {
      curNode = curNode.next
    }
    return curNode
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
  // 在item后添加newElement
  insert(item, newElement) {
    let curNode = this.find(item)
    let newNode = new Node(newElement)

    if (curNode.next) { // 插入的位置在中间
      newNode.next = curNode.next
      curNode.next.prev = newNode
      curNode.next = newNode
      newNode.prev = curNode
    } else { // 插入的位置在尾部
      curNode.next = newNode
      newNode.prev = curNode
    }
    this.size++
  }
  // 从双向链表中移除item节点
  remove(item) {
    let curNode = this.find(item);
    let lastNode = this.findLast();
    
    // 删除头节点
    if(item === 'head') {
      this.head.next = null
      this.head.prev = null
      this.size = 0
      return
    }

    if(curNode) { // 如果存在item节点
      if(curNode == lastNode) { // item为最后一个节点
        curNode.prev.next = null
      } else {
        curNode.prev.next = curNode.next
        curNode.next.prev = curNode.prev
      }
      this.size--
    }
  }
   // 反向遍历
  reverseDisplay() {
    let result = ''
    let curNode = this.findLast()

    while (curNode.data!=='head') {
      result += `${curNode.data}->`
      curNode = curNode.prev
    }
    result += 'head'
    console.log(result)
  }

   // 在尾部添加数据
  append(element) {
    let lastNode = this.findLast()
    let newNode = new Node(element)

    lastNode.next = newNode
    newNode.prev = lastNode

    this.size++
  }
}

let test = new DbList();

let arr = [1, 2, 3, 4, 5, 6, 7];

for(let i=0; i<arr.length; i++){
    test.append(arr[i]);
}

test.display();  // head->1->2->3->4->5->6->7

test.insert(7, 8);
test.display();  // head->1->2->3->4->5->6->7->8

test.insert(`head`, 0.5);
test.display();  // head->0.5->1->2->3->4->5->6->7->8

test.reverseDisplay();  // 8->7->6->5->4->3->2->1->0.5->head

test.remove(0.5);  // head->1->2->3->4->5->6->7->8
test.display();

test.remove(8);  
test.display();  // head->1->2->3->4->5->6->7
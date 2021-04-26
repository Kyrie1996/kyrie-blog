class Node {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

class CirDbList {
  constructor(){
    this.size = 0
    this.head = new Node('head')
    this.curNode = ''
    this.head.next = this.head;
    this.head.prev = this.head;
  }

  // 在链表中寻找最后一个节点
  findLast() {
    let currNode = this.head;
    let count = 0;

    while(count++ !== this.size){
        currNode = currNode.next;
    }

    return currNode;
  }
  // 遍历链表
  display() {
    let result = 'head';
    let currNode = this.head;
    let lastNode = this.findLast();

    while(currNode !== lastNode) {
        currNode = currNode.next;
        result += `->${currNode.data}`;
    }

    console.log(result);
  }

  // 在链表中寻找数据
  find(item) {
    let currNode = this.head;
    let lastNode = this.findLast();

    while(currNode.data !== item) {
        // 判断当前节点是不是最后一个节点
        if(currNode === lastNode) {  
            currNode = null;
            break;
        }
        currNode = currNode.next;
    }

    return currNode;
  }

  // 反向遍历
  reverseDisplay() {
    let result = '';
    let currNode = this.findLast();

    while (currNode.data !== 'head') {
        result += `${currNode.data}->`;
        currNode = currNode.prev;
    }

    result += `head`;
    console.log(result);
  }

  // 向双向循环链表中插入数据
  insert(item, element) {
    let curNode = this.find(item);
    let newNode = new Node(element);

    curNode.next.prev = newNode;
    newNode.next = curNode.next;
    curNode.next = newNode;
    newNode.prev = curNode;

    this.size++;
  }

   // 从双向循环链表中删除数据
  remove(item) {
    // 传入头结点为清空链表
    if(item === 'head') {
      this.head.next = this.head
      this.head.prev = this.head
      this.size = 0
      return
    }
    let curNode = this.find(item)
    if(curNode) { // 如果存在item节点
      curNode.next.prev = curNode.prev
      curNode.prev.next = curNode.next
      this.size--
    }
  }
  // 在尾部添加数据
  append(element) {
    let newNode = new Node(element)
    let lastNode = this.findLast()

    newNode.next = lastNode.next
    lastNode.next.prev = newNode

    lastNode.next = newNode
    newNode.prev = lastNode
    this.size++
  }
}

let test = new CirDbList()

let arr = [1, 2, 3, 4, 5, 6, 7];
for(let i=0; i<arr.length; i++) {
    test.append(arr[i]);
}

test.display();  // head->1->2->3->4->5->6->7
test.reverseDisplay();  // 7->6->5->4->3->2->1->head

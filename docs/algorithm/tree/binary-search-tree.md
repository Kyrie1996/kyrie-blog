# 二叉搜索树
常用的二叉树的遍历方式：前序遍历、中序遍历、后序遍历、层序遍历
（1）前序遍历：根、左、右；
（2）中序遍历：左、根、右；
（3）后续遍历：左、右、根；
（4）层序遍历：从上到下，同层节点从左到右。
![节点](/algorithm/tree.png)

- 前序遍历（根左右）：A B D H E I C F J K G

- 中序遍历（左根右）: D H B E I A J F K C G

- 后序遍历（左右根）: H D I E B J K F G C A

- 层序遍历: A B C D E F G H I J K 
``` javascript
  //节点结构
  /* function TreeNode(x) {
      this.val = x;
      this.left = null;
      this.right = null;
  } */

  //1、前序遍历
  function DLR(root){
      console.log(root.val);
      if(root.left){
          DLR(root.left);
      }
      if(root.right){
          DLR(root.right);
      }
  }

  //2、中序遍历
  function LDR(root){
      if(root.left){
          LDR(root.left);
      }
      console.log(root.val);
      if(root.right){
          LDR(root.right);
      }
  }

  //3、后序遍历
  function LRD(root){
      if(root.left){
          LRD(root.left);
      }
      if(root.right){
          LRD(root.right);
      }
      console.log(root.val);
  }
```
## 层序遍历
``` javascript
  /* function TreeNode(x) {
      this.val = x;
      this.left = null;
      this.right = null;
  } */
  function levelTraversal(root){
    if ( !root ) return false;//如果头结点为空、返回假
      var result = []; //创建一个数组存放结果
      var tree = []; //创建一个数组存放二叉树
      tree.push(root); //先传入头结点

    // 当tree数组长度不为空
      while( tree.length ){
          var node = tree.shift();    // 将数组第一个结点放到node中
          result.push(node.val); //将node结点的值压入result数组中
          //如果node结点左子树不为空
          if( node.left ){ 
              tree.push(node.left); // 将node结点的左子树结点的值压入tree数组中
          }
          //如果node结点右子树不为空
          if( node.right ) {
            tree.push(node.right); //将node结点的右子树结点的值压入tree数组中
          }
      }
      return result; //返回result数组
  }

```
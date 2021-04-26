# element-ui table 组件闪动解决方案
1. 场景：表格数据需要根据筛选不同模式来显示/隐藏相应的列。
   
   问题：起初是用v-show来判断，为了避免table组件频繁计算，发现没有效果，v-show起作用的本质是利用display:none控制隐藏，而element-ui table组件el-table-column的td是利用了display: table-cell 控制显示，而display：table-cell的优先级又高于display：none，所以v-show失效了，就改用了v-if，用了v-if后，切换不同模式时发现页面会有闪动。

   解决：用v-if判断，每次切换模式前先将list置空再去重新请求数据就不会有闪动的效果。
   ``` javascript
    modeChange() {
      this.tableData = {}
      this.fetchData()
    }
   ```
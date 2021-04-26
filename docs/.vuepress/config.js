module.exports = {
  title: 'Kyrie Blog',
  description: 'Just playing',
  plugins: ['autobar'],
  themeConfig: {
    logo: '/logo.jpg',
    nav:[
      { text: '前端算法', link: '/algorithm/算法与数据结构/' }, // 内部链接 以docs为根目录
      {
        text: 'GitHub',
        items: [
          { text: 'GitHub地址', link: 'https://github.com/Kyrie1996' },
        ]
      }        
    ]
  }
}
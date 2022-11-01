module.exports = {
  title: '复兴之路',
  description: '一个前端的复兴之路',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/public/favicon.ico' }]
  ],
  ignoreDeadLinks: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    lastUpdatedText: '最近更新时间',
    nav: nav(),
    sidebar: sidebar()
  }
}

function nav () {
  return [
    { text: '百度一下', link: 'https://baidu.com' },
    {
      text: '相关链接',
      items: [
        { text: 'vue.js', link: 'https://cn.vuejs.org/' },
        { text: 'vitepress', link: 'https://vitepress.vuejs.org/' }
      ]
    }
  ]
}

function sidebar () {
  return [
    {
      text: 'JavaScript 基础',
      collapsible: true,
      items: [
        { text: '原型链', link: '/JavaScript/原型链' },
        { text: 'instanceof', link: '/JavaScript/instanceof' },
        { text: '执行上下文和执行栈', link: '/JavaScript/执行上下文和执行栈' },
        { text: 'call apply bind', link: '/JavaScript/call-apply-bind' },
      ]
    },
    {
      text: 'CSS 基础',
      collapsible: true,
      items: [
        { text: '回流和重绘', link: '/CSS/回流和重绘' },
      ]
    },
    {
      text: 'VUE',
      collapsible: true,
      items: [
      ]
    },
    {
      text: '前端工程化',
      collapsible: true,
      items: [
      ]
    },
    {
      text: '性能优化',
      collapsible: true,
      items: [
      ]
    },
    {
      text: 'TypeScript',
      collapsible: true,
      items: [
      ]
    },
    {
      text: '网络',
      collapsible: true,
      items: [
      ]
    },
    {
      text: '设计模式',
      collapsible: true,
      items: [
      ]
    },
    {
      text: '算法',
      collapsible: true,
      items: [
      ]
    },
    {
      text: '安全',
      collapsible: true,
      items: [
      ]
    },
    {
      text: 'NodeJs',
      collapsible: true,
      items: [
      ]
    },
    {
      text: 'test',
      collapsible: true,
      items: [
        { text: 'Test', link: '/Test/' },
        { text: 'Guide', link: '/Test/guide' }
      ]
    }
  ]
}

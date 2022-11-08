function sidebar () {
  return [
    {
      text: 'JavaScript 基础',
      collapsible: true,
      items: [
        { text: '原型链', link: '/JavaScript/原型链' },
        { text: 'instanceof', link: '/JavaScript/instanceof' },
        { text: '执行上下文和执行栈', link: '/JavaScript/执行上下文和执行栈' },
        { text: '闭包', link: '/JavaScript/闭包' },
        { text: 'call apply bind', link: '/JavaScript/call-apply-bind' },
        { text: 'new', link: '/JavaScript/new' },
        { text: '事件机制', link: '/JavaScript/事件机制' },
        { text: 'PWA和Service Worker', link: '/JavaScript/PWA-ServiceWorker' },
        { text: 'WebWorker', link: '/JavaScript/WebWorker' },
        { text: 'Promise', link: '/JavaScript/Promise' },
        { text: 'ES6', link: '/JavaScript/ES6' },
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
      items: []
    },
    {
      text: '前端工程化',
      collapsible: true,
      items: []
    },
    {
      text: '性能优化',
      collapsible: true,
      items: []
    },
    {
      text: 'TypeScript',
      collapsible: true,
      items: []
    },
    {
      text: '网络',
      collapsible: true,
      items: []
    },
    {
      text: '设计模式',
      collapsible: true,
      items: []
    },
    {
      text: '算法',
      collapsible: true,
      items: []
    },
    {
      text: '安全',
      collapsible: true,
      items: []
    },
    {
      text: 'NodeJs',
      collapsible: true,
      items: []
    },
    {
      text: '其他',
      collapsible: true,
      items: [
        { text: 'npm yarn pnpm 发展历程', link: '/Others/npm-yarn-pnpm' },
      ]
    }
  ]
}

export default sidebar

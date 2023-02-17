export default [
  { text: '🔋 日常总结', link: '/summary/' },
  { text: '🍒 代码片段', link: '/code/' },
  { text: '📖 面试总结', link: '/interview/' },
  {
    text: '👻 落地实现',
    collapsible: true,
    items: [
      { text: '💪 实现action自动部署pages', link: '/achieve/action/' },
      { text: '💪 实现vitepress集成algolia', link: '/achieve/algolia/' },
      { text: '💪 实现create-custom-app', link: '/achieve/create-custom-app/' },
      { text: '💪 实现一个前端cli', link: '/achieve/cli/' },
      { text: '💪 实现一个同步cookies的浏览器插件', link: '/achieve/extension/' },
      { text: '💪 实现在vue中用decorator处理函数', link: '/achieve/decorator/' },
      { text: '💪 实现接入bpmn-js', link: '/achieve/bpmn-js/' },
    ]
  }
]

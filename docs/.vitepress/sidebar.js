export default {
  '/summary/': [
    {
      text: 'JavaScript',
      collapsible: true,
      items: [
        { text: '变量类型', link: '/summary/JavaScript/types' },
        { text: '原型链', link: '/summary/JavaScript/prototype-chain' },
        { text: 'instanceof', link: '/summary/JavaScript/instanceof' },
        { text: '执行上下文和执行栈', link: '/summary/JavaScript/context' },
        { text: '闭包', link: '/summary/JavaScript/closure' },
        { text: 'call apply bind', link: '/summary/JavaScript/call-apply-bind' },
        { text: 'new', link: '/summary/JavaScript/new' },
        { text: '事件机制', link: '/summary/JavaScript/event-loop' },
        { text: 'cookie session localStorage', link: '/summary/JavaScript/cookie-session-localStorage' },
        { text: 'PWA和Service Worker', link: '/summary/JavaScript/PWA-ServiceWorker' },
        { text: 'WebWorker', link: '/summary/JavaScript/WebWorker' },
        { text: 'Promise', link: '/summary/JavaScript/Promise' },
        { text: 'ES6', link: '/summary/JavaScript/ES6' },
      ]
    },
    {
      text: 'CSS',
      collapsible: true,
      items: [
        { text: 'flex布局', link: '/summary/CSS/flex' },
        { text: 'grid布局', link: '/summary/CSS/grid' },
        { text: '居中', link: '/summary/CSS/center' },
        { text: '清除浮动', link: '/summary/CSS/clear-float' },
        { text: '盒模型', link: '/summary/CSS/box-model' },
        { text: 'BFC', link: '/summary/CSS/bfc' },
        { text: 'BEM', link: '/summary/CSS/bem' },
        { text: '预处理器', link: '/summary/CSS/preprocessor' },
        { text: '回流和重绘', link: '/summary/CSS/reflow-repaint' },
        { text: '1px问题', link: '/summary/CSS/1px' },
        { text: '选择器和优先级', link: '/summary/CSS/selector' },
        { text: 'canvas画一个爱心', link: '/summary/CSS/heart' },
      ]
    },
    {
      text: 'Vue',
      collapsible: true,
      items: [
        { text: 'mvvm', link: '/summary/Vue/mvvm' },
        { text: '生命周期', link: '/summary/Vue/lifecycle' },
        { text: 'computed和watch', link: '/summary/Vue/computed-watch' },
        { text: '响应式原理', link: '/summary/Vue/reactivity' },
        { text: 'nextTick', link: '/summary/Vue/nextTick' },
        { text: '组件通信', link: '/summary/Vue/component-communication' },
        { text: 'virtualDom', link: '/summary/Vue/virtualDom' },
        { text: 'diff', link: '/summary/Vue/diff' },
        { text: 'keep-alive', link: '/summary/Vue/keep-alive' },
        { text: 'vuex和pinia', link: '/summary/Vue/vuex-pinia' },
        { text: 'Vue Router', link: '/summary/Vue/vue-router' },
      ]
    },
    {
      text: '前端工程化',
      collapsible: true,
      items: [
        { text: '模块化', link: '/summary/Engineered/modular' },
        { text: 'npm yarn pnpm 发展历程', link: '/summary/Engineered/npm-yarn-pnpm' },
        { text: 'node_modules', link: '/summary/Engineered/node_modules' },
        { text: 'monorepo和workspace', link: '/summary/Engineered/monorepo-workspace' },
        { text: 'Web Component', link: '/summary/Engineered/web-component' },
        { text: '模块联邦', link: '/summary/Engineered/module-federation' },
      ]
    },
    {
      text: '性能优化',
      collapsible: true,
      items: []
    },
    {
      text: 'TypeScript',
      collapsible: true,
      items: [
        { text: '类型', link: '/summary/TypeScript/types' },
      ]
    },
    {
      text: '网络',
      collapsible: true,
      items: [
        { text: 'Ajax', link: '/summary/Network/AJAX' },
        { text: 'http状态码', link: '/summary/Network/http-status-code' },
      ]
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
        { text: 'URL到页面显示', link: '/summary/Other/url-to-display.md' }
      ]
    }
  ],
  '/code/': [
    {
      text: '命令',
      collapsible: false,
      items: [
        { text: '命令', link: '/code/command.md' }
      ]
    }
  ],
  'interview': []
}

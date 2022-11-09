import sidebar from './sidebar'

module.exports = {
  title: '巨人之踵',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  ignoreDeadLinks: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    lastUpdatedText: '最近更新时间',
    nav: nav(),
    sidebar: sidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/okey573/heels-of-giants' }
    ],
  }
}

function nav () {
  return [
    { text: 'MDN Web Docs', link: 'https://developer.mozilla.org/zh-CN/' },
    {
      text: '相关链接',
      items: [
        { text: 'vue.js', link: 'https://cn.vuejs.org/' },
        { text: 'react.js', link: 'https://zh-hans.reactjs.org/' },
        { text: 'vite', link: 'https://cn.vitejs.dev/' },
        { text: 'webpack', link: 'https://webpack.docschina.org/' },
        { text: 'vitepress', link: 'https://vitepress.vuejs.org/' }
      ]
    }
  ]
}

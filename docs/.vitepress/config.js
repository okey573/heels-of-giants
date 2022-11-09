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

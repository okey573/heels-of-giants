import sidebar from './sidebar'
import nav from './nav'

export default {
  title: '巨人之踵',
  base: '/docs',
  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }]
  ],
  ignoreDeadLinks: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    lastUpdatedText: '最近更新时间',
    nav: nav,
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/okey573/heels-of-giants' }
    ],
    algolia: {
      appId: 'SQ5GQ6SV73',
      apiKey: 'cba98dd04dea30f0007609408f2ccc74',
      indexName: 'heels-of-giants docs search engine',
      placeholder: '请输入关键词',
      buttonText: '搜索'
    }
  },
  vite: {
    server: {
      host: true,
      open: true
    }
  }
}


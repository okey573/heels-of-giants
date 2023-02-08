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
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/okey573/heels-of-giants' }
    ],
  }
}

function nav () {
  return [
    { text: '🔋 日常总结', link: '/summary/' },
    { text: '🍒 代码片段', link: '/code/' },
    { text: '📖 面试总结', link: '/interview/' },
  ]
}

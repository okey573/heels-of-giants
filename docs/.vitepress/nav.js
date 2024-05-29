import fg from 'fast-glob'
import matter from 'gray-matter'

const achieveItems = fg.sync(['achieve/**/*.md'], { cwd: 'docs' }).map(file => {
  const { data } = matter.read('docs/' + file)
  return { text: '💪 ' + data.title, link: file }
})

export default [
  { text: '🔋 日常总结', link: '/summary/' },
  { text: '🍒 代码片段', link: '/code/' },
  { text: '📖 面试总结', link: '/interview/' },
  {
    text: '👻 落地实现',
    collapsible: true,
    items: achieveItems
  }
]

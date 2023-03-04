import fg from 'fast-glob'
import matter from 'gray-matter'

export default fg.sync([
  '*/',
  '!.vitepress/',
  '!achieve/',
  '!public/',
], {
  cwd: 'docs',
  onlyFiles: false,
  deep: 1,
  dot: true
}).reduce((previousValue, currentValue) => ({
  ...previousValue,
  [`/${currentValue}/`]: getItems(currentValue)
}), {})

function getItems (module) {
  // 这里的module就是 code summary 这些模块
  // 先获取module下的所有md， 排除模块下的index.md
  const files = fg.sync(['*/**/*.md'], { cwd: `docs/${module}` })
  // 根据第一级目录分组收纳
  const result = []
  for (const file of files) {
    const { data } = matter.read(`docs/${module}/` + file)
    if (data.hidden) continue
    const group = file.split('/')[0]
    const groupZh = translateGroup(group)
    const index = result.findIndex(res => res.text === groupZh)
    const item = { text: data.title, link: `/${module}/` + file }
    if (index > -1) {
      result[index].items.push(item)
    } else {
      result.push({
        text: groupZh,
        collapsible: true,
        items: [item]
      })
    }
  }
  return result
}

function translateGroup (group) {
  return ({
    'Algorithm-DataStructure': '算法和数据结构',
    'Engineered': '工程化',
    'NetWork': '网络',
    'Other': '其他',
    'Pattern': '设计模式',
    'Security': '安全',
    'js': 'JavaScript',
    'nodejs': 'NodeJs',
    'Bundler': '构建工具'
  })[group] || group
}

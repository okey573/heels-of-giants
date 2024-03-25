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
        collapsed: true,
        items: [item]
      })
    }
  }
  return result
}

function toUpperCamelCase (str) {
  return str.split(/[\s-_]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

function translateGroup (group) {
  return ({
    'algorithm': '算法和数据结构',
    'browser': '浏览器',
    'bundler': '构建工具',
    'css': 'CSS',
    'engineered': '工程化',
    'js': 'JavaScript',
    'network': '网络',
    'nodejs': 'NodeJS',
    'other': '其他',
    'pattern': '设计模式',
    'react': 'React',
    'security': '安全',
    'ts': 'TypeScript',
    'vue': 'Vue'
  })[group] || toUpperCamelCase(group)
}

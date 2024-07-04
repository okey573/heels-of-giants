import fs from 'node:fs'
import path from 'node:path'
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
  [`/${currentValue}/`]: getSidebar(currentValue)
}), {})

/**
 *
 * @see https://vitepress.dev/zh/reference/default-theme-sidebar#multiple-sidebars
 * @param {string} sidebar 就是 code interview summary 这些模块（侧边栏，和 nav.js 中的对应）
 * @return {Array} 对应 sidebar 下的菜单
 */
function getSidebar (sidebar) {
  const files = fg.sync(['*', '!index.md'], {
    cwd: `docs/${sidebar}`,
    onlyFiles: false,
    // onlyDirectories: true,
    deep: 1,
  })

  return files.map(fileName => getMenu(fileName, sidebar)).filter(Boolean)
}


function getMenu (fileName, parentPath) {
  const rootUrl = new URL(`../${parentPath}`, import.meta.url)
  const fileUrl = new URL(path.join(rootUrl.href, `./${fileName}`))

  const isFile = fs.statSync(fileUrl).isFile()
  if (isFile) {
    if (!fileName.endsWith('.md')) return null
    const { data } = matter.read(`docs/${parentPath}/` + fileName)
    if (data.hidden) return null
    return { text: data.title, link: `/${parentPath}/` + fileName }
  } else {
    const newParentPath = parentPath + '/' + fileName
    const subFiles = fg.sync(['*'], {
      cwd: `docs/${newParentPath}`,
      onlyFiles: false,
      deep: 1,
    })
    const items = subFiles.map(subFileName => {
      return getMenu(subFileName, newParentPath)
    }).filter(Boolean)
    if (!items.length) return null
    return {
      text: translateGroup(fileName),
      collapsed: true,
      items
    }
  }
}

function toUpperCamelCase (str) {
  return str.split(/[\s-_]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

function translateGroup (group) {
  return ({
    'algorithm': '算法和数据结构',
    'api': 'API',
    'browser': '浏览器',
    'bundler': '构建工具',
    'css': 'CSS',
    'engineered': '工程化',
    'html': 'HTML',
    'js': 'JavaScript',
    'network': '网络',
    'nodejs': 'NodeJS',
    'other': '其他',
    'pattern': '设计模式',
    'react': 'React',
    'security': '安全',
    'ts': 'TypeScript',
    'vue': 'Vue',
    'src': '源码'
  })[group] || toUpperCamelCase(group)
}

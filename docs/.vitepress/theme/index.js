import DefaultTheme from 'vitepress/theme'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import './styles/vars.css'


export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    // app.use(ElementPlus)
  }
}

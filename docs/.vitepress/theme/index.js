import DefaultTheme from 'vitepress/theme'
import './styles/vars.css'
import NProgress from './plugins/NProgress'

export default {
  ...DefaultTheme,
  enhanceApp (ctx) {
    NProgress(ctx, { showSpinner: false })
  }
}

import DefaultTheme from 'vitepress/theme'
import './styles/vars.css'
import NProgress from './plugins/NProgress'
import ClickAnimation from './plugins/ClickAnimation'

export default {
  ...DefaultTheme,
  enhanceApp (ctx) {
    NProgress(ctx, { showSpinner: false })
    ClickAnimation()
  }
}

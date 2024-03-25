import DefaultTheme from 'vitepress/theme'
import './styles/mouse.css'
import './styles/vars.css'
import NProgress from './plugins/NProgress'
// import ClickAnimation from './plugins/ClickAnimation'

export default {
  extends: DefaultTheme,
  enhanceApp (ctx) {
    NProgress(ctx, { showSpinner: false })
    // ClickAnimation()
  }
}

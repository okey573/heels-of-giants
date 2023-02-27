import nprogress from 'nprogress'
import './NProgress.css'

export default function ({ router }, options = {}) {
  setTimeout(() => {
    nprogress.configure(options)

    const beforeRouteChangeHandler = router.onBeforeRouteChange
    const afterRouteChangeHandler = router.onAfterRouteChanged

    router.onBeforeRouteChange = (to) => {
      nprogress.start()
      beforeRouteChangeHandler?.(to)
    }
    router.onAfterRouteChanged = (to) => {
      nprogress.done()
      afterRouteChangeHandler?.(to)
    }
  })
}

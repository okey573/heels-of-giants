import { inBrowser } from 'vitepress'
import ColorBall from './ColorBall'

export default function () {
  if (inBrowser) {
    const c = new ColorBall()
    window.document.body.addEventListener('click', function (e) {
      c.fly(e.clientX, e.clientY)
    })
  }
}

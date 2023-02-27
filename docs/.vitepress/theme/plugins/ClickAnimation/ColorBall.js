export const defaultParams = {
  size: 10,
  maxCount: 50
}

class ColorBall {
  constructor (props) {
    this.params = Object.assign({}, defaultParams, props)
  }

  fly (x, y, playCount, loopTimer = 300) {
    let ballElements = []
    let fragment = document.createDocumentFragment()

    let ballNum = this.params.maxCount
    // 修改轮换播放实现方式，改为一次创建所有，通过延迟执行动画实现
    if (playCount) {
      ballNum = ballNum * playCount
    }
    let loop = 0
    for (let i = 0; i < ballNum; i++) {
      let curLoop = parseInt(i / this.params.maxCount)
      let ball = document.createElement('i')
      ball.className = 'color-ball ball-loop-' + curLoop
      let blurX = Math.random() * 10
      if (Math.random() > 0.5) blurX = blurX * -1
      let blurY = Math.random() * 10
      if (Math.random() > 0.5) blurY = blurY * -1
      ball.style.left = (x) + 'px'
      ball.style.top = (y) + 'px'
      ball.style.width = this.params.size + 'px'
      ball.style.height = this.params.size + 'px'
      ball.style.position = 'fixed'
      ball.style.borderRadius = '1000px'
      ball.style.boxSizing = 'border-box'
      ball.style.zIndex = 9999
      ball.style.opacity = 0
      if (curLoop === 0) ball.style.opacity = 1
      ball.style.transform = 'translate3d(0px, 0px, 0px) scale(1)'
      ball.style.webkitTransform = 'translate3d(0px, 0px, 0px) scale(1)'
      ball.style.transition = 'transform 1s ' + curLoop * loopTimer / 1000 + 's ease-out'
      ball.style.webkitTransition = 'transform 1s ' + curLoop * loopTimer / 1000 + 's ease-out'
      ball.style.backgroundColor = getORandomColor()
      fragment.appendChild(ball)
      ballElements.push(ball)
      // 性能优化终极版
      if (curLoop !== loop) {
        (function (num) {
          setTimeout(function () {
            let loopBalls = document.getElementsByClassName('ball-loop-' + num)
            for (let j = 0; j < loopBalls.length; j++) {
              loopBalls[j].style.opacity = 1
            }
            if (num === loop) {
              _clear(ballElements)
            }
          }, num * loopTimer + 30)
        })(curLoop)
        loop = curLoop
      }
    }

    document.body.appendChild(fragment)
    // 延迟删除
    !playCount && _clear(ballElements)
    // 执行动画
    setTimeout(function () {
      for (let i = 0; i < ballElements.length; i++) {
        _run(ballElements[i])
      }
    }, 10)
  }
}

function getORandomColor (arr) {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}

function _run (ball) {
  let randomXFlag = Math.random() > 0.5
  let randomYFlag = Math.random() > 0.5
  let randomX = parseInt(Math.random() * 160)
  let randomY = parseInt(Math.random() * 160)
  if (randomXFlag) {
    randomX = randomX * -1
  }
  if (randomYFlag) {
    randomY = randomY * -1
  }
  let transform = 'translate3d(' + randomX + 'px,' + randomY + 'px, 0) scale(0)'
  ball.style.webkitTransform = transform
  ball.style.MozTransform = transform
  ball.style.msTransform = transform
  ball.style.OTransform = transform
  ball.style.transform = transform
}

function _clear (balls) {
  setTimeout(function () {
    for (let i = 0; i < balls.length; i++) {
      document.body.removeChild(balls[i])
    }
  }, 1000)
}

export default ColorBall

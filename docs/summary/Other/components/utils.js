export function getRandom (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export class Point {
  constructor (cvs, ctx, radius = 2) {
    this.cvs = cvs
    this.ctx = ctx
    this.r = radius
    this.x = getRandom(0, cvs.width - this.r / 2)
    this.y = getRandom(0, cvs.height - this.r / 2)
    this.xSpeed = getRandom(-30, 30)
    this.ySpeed = getRandom(-30, 30)
    this.lastDrawTime = null
  }

  draw () {
    if (this.lastDrawTime) {
      const duration = (Date.now() - this.lastDrawTime) / 1000
      const xDis = this.xSpeed * duration
      const yDis = this.ySpeed * duration
      let x = this.x + xDis
      let y = this.y + yDis
      if (x > this.cvs.width - this.r / 2) {
        x = this.cvs.width - this.r / 2
        this.xSpeed = -this.xSpeed
      } else if (x < 0) {
        x = 0
        this.xSpeed = -this.xSpeed
      }
      if (y > this.cvs.height - this.r / 2) {
        y = this.cvs.height - this.r / 2
        this.ySpeed = -this.ySpeed
      } else if (y < 0) {
        y = 0
        this.ySpeed = -this.ySpeed
      }
      this.x = x
      this.y = y
    }
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this.ctx.fillStyle = 'rgb(200,200,200)'
    this.ctx.fill()
    this.lastDrawTime = Date.now()
  }
}


export class Graph {
  constructor (cvs, ctx, pointNumber = 20, maxDis) {
    this.cvs = cvs
    this.ctx = ctx
    this.points = new Array(pointNumber).fill(0).map(() => new Point(cvs, ctx))
    cvs.height
    if (!maxDis) {
      maxDis = Math.floor(cvs.height / 5)
    }
    this.maxDis = maxDis
  }

  draw () {
    requestAnimationFrame(() => {
      this.draw()
    })
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i]
      p1.draw()
      for (let j = i + 1; j < this.points.length; j++) {
        const p2 = this.points[j]
        const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
        if (d > this.maxDis) {
          continue
        }
        this.ctx.beginPath()
        this.ctx.moveTo(p1.x, p1.y)
        this.ctx.lineTo(p2.x, p2.y)
        this.ctx.closePath()
        this.ctx.strokeStyle = `rgba(200,200,200,${1 - d / this.maxDis})`
        this.ctx.stroke()
      }
    }
  }
}

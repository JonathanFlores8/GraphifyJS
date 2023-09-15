/**
 *
 */
export class BarChart {
  /**
   *
   * @param ctx
   * @param config
   */
  constructor (ctx, config) {
    this.data = config.data
    this.color = config.color
    this.ctx = ctx
  }

  /**
   *
   * @param data
   */
  #scaleData (data) {
    const maxDataValue = Math.max(...data)
    return data.map(value => (value / maxDataValue) * this.ctx.canvas.height)
  }

  /**
   *
   */
  draw () {
    this.drawGrid()

    const scaledData = this.#scaleData(this.data)

    const barGap = 10
    const totalGapWidth = barGap * (scaledData.length - 1)
    const barWidth = (this.ctx.canvas.width - totalGapWidth) / scaledData.length

    for (let i = 0; i < scaledData.length; i++) {
      const x = i * (barWidth + barGap)
      const y = this.ctx.canvas.height - scaledData[i]
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(x, y, barWidth, scaledData[i])
    }
  }

  /**
   *
   */
  drawGrid () {
    const verticalSpacing = this.ctx.canvas.height / this.data.length
    for (let i = 0; i <= this.data.length; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, i * verticalSpacing)
      this.ctx.lineTo(this.ctx.canvas.width, i * verticalSpacing)
      this.ctx.stroke()
    }
  }
}

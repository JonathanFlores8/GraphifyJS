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
    this.labels = config.labels
    this.Y_AXIS_LABEL_WIDTH = 50
    this.X_AXIS_LABEL_HEIGHT = 30
  }

  /**
   *
   * @param data
   */
  #scaleData (data) {
    const maxDataValue = Math.max(...data)
    const canvasHeight = this.ctx.canvas.height - this.X_AXIS_LABEL_HEIGHT
    return data.map(value => (value / maxDataValue) * canvasHeight)
  }

  /**
   *
   */
  draw () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.drawGrid()

    const scaledData = this.#scaleData(this.data)
    const barGap = 10
    const totalGapWidth = barGap * (scaledData.length - 1)
    const barWidth = (this.ctx.canvas.width - this.Y_AXIS_LABEL_WIDTH - totalGapWidth) / scaledData.length

    for (let i = 0; i < scaledData.length; i++) {
      const x = this.Y_AXIS_LABEL_WIDTH + i * (barWidth + barGap)
      const y = this.ctx.canvas.height - scaledData[i] - this.X_AXIS_LABEL_HEIGHT

      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.ctx.canvas.height)
      gradient.addColorStop(0, this.color)
      gradient.addColorStop(1, 'white')
      this.ctx.fillStyle = gradient

      this.ctx.fillRect(x, y, barWidth, scaledData[i])

      if (this.labels && this.labels[i]) {
        this.ctx.fillStyle = 'black'
        this.ctx.font = '12px Arial'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(this.labels[i], x + (barWidth / 2), this.ctx.canvas.height - 5)
      }
    }
  }

  /**
   *
   */
  drawGrid () {
    const numGridLines = 10
    const verticalSpacing = (this.ctx.canvas.height - this.X_AXIS_LABEL_HEIGHT) / numGridLines
    const maxValue = Math.max(...this.data)
    const minValue = 0
    const interval = Math.ceil(maxValue / numGridLines)

    for (let i = 0; i <= numGridLines; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(this.Y_AXIS_LABEL_WIDTH, i * verticalSpacing)
      this.ctx.lineTo(this.ctx.canvas.width, i * verticalSpacing)
      this.ctx.stroke()

      const gridValue = interval * (numGridLines - i)

      this.ctx.textAlign = 'right'
      this.ctx.font = '10px Arial'
      this.ctx.fillStyle = 'black'
      this.ctx.fillText(gridValue.toString(), this.Y_AXIS_LABEL_WIDTH - 5, i * verticalSpacing)
    }

    // Draw x and y axes
    this.ctx.beginPath()
    this.ctx.moveTo(this.Y_AXIS_LABEL_WIDTH, 0)
    this.ctx.lineTo(this.Y_AXIS_LABEL_WIDTH, this.ctx.canvas.height - this.X_AXIS_LABEL_HEIGHT)
    this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height - this.X_AXIS_LABEL_HEIGHT)
    this.ctx.stroke()
  }
}

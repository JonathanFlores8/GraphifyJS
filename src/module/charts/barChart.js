/**
 * A class representing a BarChart.
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
    const barWidth = this.ctx.canvas.width / scaledData.length

    for (let i = 0; i < scaledData.length; i++) {
      const x = i * barWidth
      const y = this.ctx.canvas.height - scaledData[i]
      const height = scaledData[i]

      this.ctx.fillStyle = this.color
      this.ctx.strokeRect(x, y, barWidth, height)
      this.ctx.fillRect(x, y, barWidth, height)
    }
  }

  /**
   *
   * @param root0
   * @param root0.numLines
   * @param root0.color
   */
  drawGrid ({ numLines = this.data.length, color = 'black' } = {}) {
    this.#drawHorizontalGridLines(numLines, color)
    this.#drawVerticalGridLines(numLines, color)
  }

  /**
   *
   * @param numLines
   * @param color
   */
  #drawHorizontalGridLines (numLines, color) {
    const verticalSpacing = this.ctx.canvas.height / numLines
    for (let i = 0; i <= numLines; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, i * verticalSpacing)
      this.ctx.lineTo(this.ctx.canvas.width, i * verticalSpacing)
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    }
  }

  /**
   *
   * @param numLines
   * @param color
   */
  #drawVerticalGridLines (numLines, color) {
    const horizontalSpacing = this.ctx.canvas.width / numLines
    for (let i = 0; i <= numLines; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(i * horizontalSpacing, 0)
      this.ctx.lineTo(i * horizontalSpacing, this.ctx.canvas.height)
      this.ctx.strokeStyle = color
      this.ctx.stroke()
    }
  }
}

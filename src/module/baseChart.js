/**
 *
 */
export class BaseChart {
  /**
   *
   * @param ctx
   */
  constructor (ctx) {
    this.ctx = ctx
  }

  /**
   *
   * @param root0
   * @param root0.numLines
   * @param root0.color
   */
  drawGrid ({ numLines = 10, color = '#ddd' } = {}) {
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

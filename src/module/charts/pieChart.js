/**
 * A class representing a PieChart.
 */
export class PieChart {
  #ctx
  #data
  #labels
  #colors

  /**
   * Constructs a new PieChart instance.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the pie chart will be drawn.
   * @param {object} config - Configuration object for the pie chart.
   * @param {number[]} config.data - An array of numerical data that will be represented as segments in the pie.
   * @param {string[]} config.labels - Labels corresponding to each data segment.
   * @param {string[]} config.colors - Colors for each segment.
   */
  constructor (ctx, config) {
    this.#ctx = ctx
    this.#data = config.data
    this.#labels = config.labels
    this.#colors = config.colors
  }

  /**
   * Draws the pie chart on the canvas.
   */
  draw () {
    const total = this.#data.reduce((acc, value) => acc + value, 0)
    let startAngle = 0

    for (let i = 0; i < this.#data.length; i++) {
      const sliceAngle = (this.#data[i] / total) * 2 * Math.PI

      this.#ctx.beginPath()
      this.#ctx.moveTo(this.#ctx.canvas.width / 2, this.#ctx.canvas.height / 2)
      this.#ctx.arc(
        this.#ctx.canvas.width / 2,
        this.#ctx.canvas.height / 2,
        Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 2,
        startAngle,
        startAngle + sliceAngle
      )
      this.#ctx.closePath()

      this.#ctx.fillStyle = this.#colors[i]
      this.#ctx.fill()

      startAngle += sliceAngle
    }
  }
}

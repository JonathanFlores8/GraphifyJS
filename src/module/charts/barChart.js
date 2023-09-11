/**
 * A class representing a BarChart.
 *
 */
export class BarChart {
  #ctx
  #data
  #color

  /**
   * Constructs a BarChart object and draws the initial bar chart.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the bar chart will be drawn.
   * @param {object} config - Configuration object for the chart.
   * @param {number[]} config.data - An array of numerical data that will be represented as bars in the chart.
   * @param {string} config.color - The color to be used for the bars in the chart.
   */
  constructor (ctx, config) {
    this.#ctx = ctx
    this.#data = config.data
    this.#color = config.color
  }

  /**
   * Scales the data to fit the canvas.
   *
   * @param {number[]} data - The data to be scaled.
   * @returns {number[]} The scaled data.
   */
  #scaleData (data) {
    const maxDataValue = Math.max(...data)
    return data.map(value => (value / maxDataValue) * this.#ctx.canvas.height)
  }

  /**
   * Draws the bar chart on the canvas.
   */
  draw () {
    const scaledData = this.#scaleData(this.#data)
    const barWidth = this.#ctx.canvas.width / scaledData.length

    for (let i = 0; i < scaledData.length; i++) {
      const x = i * barWidth
      const y = this.#ctx.canvas.height - scaledData[i]
      const height = scaledData[i]

      this.#ctx.fillStyle = this.#color
      this.#ctx.fillRect(x, y, barWidth, height)
    }
  }
}

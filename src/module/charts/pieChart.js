/**
 * Represents a pie chart.
 */
export class PieChart {
  #ctx
  #data
  #labels
  #colors

  /**
   * Initializes a new PieChart instance.
   *
   * @param {object} ctx - The canvas rendering context.
   * @param {object} config - Configuration for the chart.
   */
  constructor (ctx, config = {}) {
    this.#ctx = ctx
    this.#data = config.data || [1]
    this.#labels = config.labels || ['Default']
    this.#colors = config.colors || ['grey']

    // Default configurations
    this.config = {
      FONT: config.FONT || '12px Arial',
      LEGEND_BOX_SIZE: config.LEGEND_BOX_SIZE || 15,
      LEGEND_SPACING: config.LEGEND_SPACING || 5
    }
  }

  /**
   * Draws the pie chart.
   */
  draw () {
    const total = this.#data.reduce((acc, value) => acc + value, 0)
    let startAngle = 0

    this.#data.forEach((dataPoint, i) => {
      this.#drawSlice(startAngle, dataPoint, total, i)
      startAngle += (dataPoint / total) * 2 * Math.PI
    })

    this.#drawLegend()
  }

  /**
   * Draws a slice of the pie chart.
   *
   * @param {number} startAngle - The starting angle for the slice.
   * @param {number} dataPoint - The data point for the slice.
   * @param {number} total - The total sum of all data points.
   * @param {number} index - The index of the current slice.
   */
  #drawSlice (startAngle, dataPoint, total, index) {
    const sliceAngle = (dataPoint / total) * 2 * Math.PI
    const canvasCenterX = this.#ctx.canvas.width / 2
    const canvasCenterY = this.#ctx.canvas.height / 2
    const radius = Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 2

    this.#ctx.beginPath()
    this.#ctx.moveTo(canvasCenterX, canvasCenterY)
    this.#ctx.arc(canvasCenterX, canvasCenterY, radius, startAngle, startAngle + sliceAngle)
    this.#ctx.closePath()
    this.#ctx.fillStyle = this.#colors[index]
    this.#ctx.fill()

    this.#drawSliceLabel(startAngle, sliceAngle, dataPoint, total)
  }

  /**
   * Draws the label for a slice.
   *
   * @param {number} startAngle - The starting angle for the slice.
   * @param {number} sliceAngle - The angle size of the slice.
   * @param {number} dataPoint - The data point for the slice.
   * @param {number} total - The total sum of all data points.
   */
  #drawSliceLabel (startAngle, sliceAngle, dataPoint, total) {
    const radiusForLabel = Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 4
    const labelX = this.#ctx.canvas.width / 2 + radiusForLabel * Math.cos(startAngle + sliceAngle / 2)
    const labelY = this.#ctx.canvas.height / 2 + radiusForLabel * Math.sin(startAngle + sliceAngle / 2)

    this.#ctx.fillStyle = 'black'
    this.#ctx.font = this.config.FONT
    this.#ctx.textAlign = 'center'
    this.#ctx.textBaseline = 'middle'
    this.#ctx.fillText(`${(dataPoint / total * 100).toFixed(2)}%`, labelX, labelY)
  }

  /**
   * Draws the legend.
   */
  #drawLegend () {
    const totalLegendHeight = this.#colors.length * (this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING)
    const legendY = (this.#ctx.canvas.height - totalLegendHeight) / 2
    const legendX = 5

    this.#ctx.font = this.config.FONT
    this.#ctx.textAlign = 'left'
    this.#ctx.textBaseline = 'top'

    this.#colors.forEach((color, i) => {
      this.#ctx.fillStyle = color
      this.#ctx.fillRect(legendX, legendY + i * (this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING), this.config.LEGEND_BOX_SIZE, this.config.LEGEND_BOX_SIZE)

      this.#ctx.fillStyle = 'black'
      this.#ctx.fillText(this.#labels[i], legendX + this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING, legendY + i * (this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING))
    })
  }
}

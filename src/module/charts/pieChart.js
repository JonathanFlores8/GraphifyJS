/**
 * Represents a pie chart.
 */
export class PieChart {
  #ctx
  #data
  #labels
  #colors
  #config

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
    this.#config = {
      font: config.font || '12px Arial',
      legendBoxSize: config.legendBoxSize || 15,
      legendSpacing: config.legendSpacing || 5
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
    this.#ctx.font = this.#config.font
    this.#ctx.textAlign = 'center'
    this.#ctx.textBaseline = 'middle'
    this.#ctx.fillText(`${(dataPoint / total * 100).toFixed(2)}%`, labelX, labelY)
  }

  /**
   * Draws the legend.
   */
  #drawLegend () {
    const totalLegendHeight = this.#colors.length * (this.#config.legendBoxSize + this.#config.legendSpacing)
    const legendX = this.#ctx.canvas.width * 0.1 // Adjust this value to position the legend on the X-axis
    const legendY = (this.#ctx.canvas.height - totalLegendHeight) / 2 // Adjust this value to position the legend on the Y-axis

    this.#ctx.font = this.#config.font
    this.#ctx.textAlign = 'left'
    this.#ctx.textBaseline = 'top'

    this.#colors.forEach((color, index) => {
      this.#ctx.fillStyle = color
      this.#ctx.fillRect(legendX, legendY + index * (this.#config.legendBoxSize + this.#config.legendSpacing), this.#config.legendBoxSize, this.#config.legendBoxSize)

      this.#ctx.fillStyle = 'black'
      this.#ctx.fillText(this.#labels[index], legendX + this.#config.legendBoxSize + this.#config.legendSpacing, legendY + index * (this.#config.legendBoxSize + this.#config.legendSpacing))
    })
  }

  /**
   * Updates the data for the chart and re-renders it.
   *
   * @param {Array<number>} newData - New data values.
   */
  updateData (newData) {
    if (!Array.isArray(newData) || !newData.every(item => typeof item === 'number')) {
      throw new Error('Invalid data: Expected an array of numbers')
    }
    this.#data = newData
    this.draw()
  }

  /**
   * Updates the labels for the chart and re-renders the chart.
   *
   * @param {Array<string>} newLabels - New labels.
   */
  updateLabels (newLabels) {
    if (!Array.isArray(newLabels) || !newLabels.every(label => typeof label === 'string')) {
      throw new Error('Invalid labels: Expected an array of strings')
    }
    this.#labels = newLabels
    this.draw()
  }

  /**
   * Updates the colors for the slices and re-renders the chart.
   *
   * @param {Array<string>} newColors - New color values.
   */
  updateColors (newColors) {
    if (!Array.isArray(newColors) || !newColors.every(color => typeof color === 'string')) {
      throw new Error('Invalid colors: Expected an array of strings')
    }
    this.#colors = newColors
    this.draw()
  }

  /**
   * Updates the configuration for the chart and re-renders it.
   *
   * @param {object} newConfig - New configuration values.
   */
  updateConfig (newConfig) {
    this.#config = { ...this.#config, ...newConfig }
    this.draw()
  }
}

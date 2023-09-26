/**
 * Represents a bar chart.
 */
export class BarChart {
  #ctx
  #data
  #color
  #labels
  #config

  /**
   * Initializes a new barChart instance.
   *
   * @param {object} ctx - The canvas rendering context.
   * @param {object} config - Configuration for the chart.
   */
  constructor (ctx, config) {
    this.#ctx = ctx
    this.#data = config.data
    this.#color = config.color || 'blue'
    this.#labels = config.labels

    // Default configurations
    this.#config = {
      yAxisLabelWidth: config.yAxisLabelWidth || 50,
      xAxisLabelHeight: config.xAxisLabelHeight || 30,
      barGap: config.barGap || 10,
      numGridLines: config.numGridLines || 10,
      gridFont: config.gridFont || '10px Arial',
      labelFont: config.labelFont || '12px Arial'
    }
  }

  /**
   * Draws the bar chart.
   */
  draw () {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
    this.#drawGrid()
    this.#drawBars()
  }

  /**
   * Scales data for rendering.
   *
   * @param {Array<number>} data - Data values.
   * @returns {Array<number>} - Scaled data values.
   */
  #scaleData (data) {
    const maxDataValue = Math.max(...data)
    const canvasHeight = this.#ctx.canvas.height - this.#config.xAxisLabelHeight
    return data.map(value => (value / maxDataValue) * canvasHeight)
  }

  /**
   * Draws the bars of the chart.
   */
  #drawBars () {
    const scaledData = this.#scaleData(this.#data)
    const totalGapWidth = this.#config.barGap * (scaledData.length - 1)
    const barWidth = (this.#ctx.canvas.width - this.#config.yAxisLabelWidth - totalGapWidth) / scaledData.length

    for (let i = 0; i < scaledData.length; i++) {
      this.#drawSingleBar(i, scaledData, barWidth)
    }
  }

  /**
   * Draws a single bar.
   *
   * @param {number} index - Index of the bar to draw.
   * @param {Array<number>} scaledData - Scaled data values.
   * @param {number} barWidth - Width of a single bar.
   */
  #drawSingleBar (index, scaledData, barWidth) {
    const x = this.#config.yAxisLabelWidth + index * (barWidth + this.#config.barGap)
    const y = this.#ctx.canvas.height - scaledData[index] - this.#config.xAxisLabelHeight

    this.#ctx.fillStyle = this.#color
    this.#ctx.fillRect(x, y, barWidth, scaledData[index])

    if (this.#labels && this.#labels[index]) {
      this.#ctx.fillStyle = 'black'
      this.#ctx.font = this.#config.labelFont
      this.#ctx.textAlign = 'center'
      this.#ctx.fillText(this.#labels[index], x + (barWidth / 2), this.#ctx.canvas.height - 5)
    }
  }

  /**
   * Draws the grid of the chart.
   */
  #drawGrid () {
    if (!this.#config.showGrid) return
    const verticalSpacing = (this.#ctx.canvas.height - this.#config.xAxisLabelHeight) / this.#config.numGridLines
    const maxValue = Math.max(...this.#data)
    const interval = Math.ceil(maxValue / this.#config.numGridLines)

    for (let i = 0; i <= this.#config.numGridLines; i++) {
      this.#drawGridLine(i, verticalSpacing, interval)
    }

    // Draw x and y axes
    this.#ctx.beginPath()
    this.#ctx.moveTo(this.#config.yAxisLabelWidth, 0)
    this.#ctx.lineTo(this.#config.yAxisLabelWidth, this.#ctx.canvas.height - this.#config.xAxisLabelHeight)
    this.#ctx.lineTo(this.#ctx.canvas.width, this.#ctx.canvas.height - this.#config.xAxisLabelHeight)
    this.#ctx.stroke()
  }

  /**
   * Draws a single grid line.
   *
   * @param {number} index - Index of the grid line.
   * @param {number} spacing - Vertical spacing for grid lines.
   * @param {number} interval - Value interval for grid lines.
   */
  #drawGridLine (index, spacing, interval) {
    this.#ctx.beginPath()
    this.#ctx.moveTo(this.#config.yAxisLabelWidth, index * spacing)
    this.#ctx.lineTo(this.#ctx.canvas.width, index * spacing)
    this.#ctx.stroke()

    const gridValue = interval * (this.#config.numGridLines - index)

    this.#ctx.textAlign = 'right'
    this.#ctx.font = this.#config.gridFont
    this.#ctx.fillStyle = 'black'
    this.#ctx.fillText(gridValue.toString(), this.#config.yAxisLabelWidth - 5, index * spacing)
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
   * Updates the color for the chart bars and re-renders the chart.
   *
   * @param {string} newColor - New color value.
   */
  updateColor (newColor) {
    if (typeof newColor !== 'string') {
      throw new Error('Invalid color: Expected a string')
    }
    this.#color = newColor
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
   * Updates the configuration for the chart and re-renders it.
   *
   * @param {object} newConfig - New configuration values.
   */
  updateConfig (newConfig) {
    if (!newConfig || typeof newConfig !== 'object') {
      throw new Error('Invalid config: Expected an object.')
    }

    this.#config = { ...this.#config, ...newConfig }
    this.draw()
  }

  /**
   * Gets the current data of the chart.
   *
   * @returns {Array<number>} - The current data values.
   */
  getData () {
    return this.#data
  }

  /**
   * Gets the current configuration of the chart.
   *
   * @returns {object} - The current configuration.
   */
  getConfig () {
    return this.#config
  }

  /**
   * Gets the current dimensions of the chart.
   *
   * @returns {object} - Object containing the width and height of the chart.
   */
  getChartDimensions () {
    return {
      width: this.#ctx.canvas.width,
      height: this.#ctx.canvas.height
    }
  }

  /**
   * Updates the font used for grid labels and re-renders the chart.
   *
   * @param {string} newGridFont - New font value.
   */
  updateGridFont (newGridFont) {
    if (typeof newGridFont !== 'string') {
      throw new Error('Invalid grid font: Expected a string')
    }
    this.#config.gridFont = newGridFont
    this.draw()
  }

  /**
   * Updates the font used for bar labels and re-renders the chart.
   *
   * @param {string} newLabelFont - New font value.
   */
  updateLabelFont (newLabelFont) {
    if (typeof newLabelFont !== 'string') {
      throw new Error('Invalid label font: Expected a string')
    }
    this.#config.labelFont = newLabelFont
    this.draw()
  }

  /**
   * Updates the number of grid lines and re-renders the chart.
   *
   * @param {number} newNumGridLines - New number of grid lines.
   */
  updateNumGridLines (newNumGridLines) {
    if (typeof newNumGridLines !== 'number') {
      throw new Error('Invalid newNumGridLines: Expected a number')
    }
    this.#config.numGridLines = newNumGridLines
    this.draw()
  }

  /**
   * Updates the width for the Y-axis labels and re-renders the chart.
   *
   * @param {number} newYAxisLabelWidth - New width value.
   */
  updateYAxisLabelWidth (newYAxisLabelWidth) {
    if (typeof newYAxisLabelWidth !== 'number') {
      throw new Error('Invalid Y axid label width: Expected a number')
    }
    this.#config.yAxisLabelWidth = newYAxisLabelWidth
    this.draw()
  }

  /**
   * Updates the height for the X-axis labels and re-renders the chart.
   *
   * @param {number} newXAxisLabelHeight - New height value.
   */
  updateXAxisLabelHeight (newXAxisLabelHeight) {
    if (typeof newXAxisLabelHeight !== 'number') {
      throw new Error('Invalid x axis label height: Expected a number')
    }
    this.#config.xAxisLabelHeight = newXAxisLabelHeight
    this.draw()
  }

  /**
   * Updates the gap between bars and re-renders the chart.
   *
   * @param {number} newBarGap - New gap value.
   */
  updateBarGap (newBarGap) {
    if (typeof newBarGap !== 'number') {
      throw new Error('Invalid bar gap: Expected a number')
    }
    this.#config.barGap = newBarGap
    this.draw()
  }

  /**
   * Toggles the visibility of grid lines and re-renders the chart.
   *
   * @param {boolean} showGrid - Whether to show grid lines.
   */
  toggleGrid (showGrid) {
    if (typeof showGrid !== 'boolean') {
      throw new Error('Invalid value: Expected a boolean')
    }
    this.#config.showGrid = showGrid
    this.draw()
  }
}

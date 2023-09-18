/**
 * Represents a bar chart.
 */
export class BarChart {
  /**
   * Constructs a new bar chart instance with the provided context and configuration.
   *
   * @param {object} ctx - The canvas rendering context.
   * @param {object} config - Configuration for the chart.
   */
  constructor (ctx, config) {
    this.data = config.data
    this.color = config.color || 'blue'
    this.ctx = ctx
    this.labels = config.labels

    // Configuration settings with defaults, but can be overridden
    this.config = {
      Y_AXIS_LABEL_WIDTH: config.Y_AXIS_LABEL_WIDTH || 50,
      X_AXIS_LABEL_HEIGHT: config.X_AXIS_LABEL_HEIGHT || 30,
      BAR_GAP: config.BAR_GAP || 10,
      NUM_GRID_LINES: config.NUM_GRID_LINES || 10,
      GRID_FONT: config.GRID_FONT || '10px Arial',
      LABEL_FONT: config.LABEL_FONT || '12px Arial'
    }
  }

  /**
   * Draws the bar chart.
   */
  draw () {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.#drawGrid()
    this.#drawBars()
  }

  /**
   * Scales data for rendering.
   *
   * @param {Array<number>} data - Data values.
   * @returns {Array<number>} Scaled data values.
   */
  #scaleData (data) {
    const maxDataValue = Math.max(...data)
    const canvasHeight = this.ctx.canvas.height - this.config.X_AXIS_LABEL_HEIGHT
    return data.map(value => (value / maxDataValue) * canvasHeight)
  }

  /**
   * Draws the bars of the chart.
   */
  #drawBars () {
    const scaledData = this.#scaleData(this.data)
    const totalGapWidth = this.config.BAR_GAP * (scaledData.length - 1)
    const barWidth = (this.ctx.canvas.width - this.config.Y_AXIS_LABEL_WIDTH - totalGapWidth) / scaledData.length

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
    const x = this.config.Y_AXIS_LABEL_WIDTH + index * (barWidth + this.config.BAR_GAP)
    const y = this.ctx.canvas.height - scaledData[index] - this.config.X_AXIS_LABEL_HEIGHT

    this.ctx.fillStyle = this.color
    this.ctx.fillRect(x, y, barWidth, scaledData[index])

    if (this.labels && this.labels[index]) {
      this.ctx.fillStyle = 'black'
      this.ctx.font = this.config.LABEL_FONT
      this.ctx.textAlign = 'center'
      this.ctx.fillText(this.labels[index], x + (barWidth / 2), this.ctx.canvas.height - 5)
    }
  }

  /**
   * Draws the grid of the chart.
   */
  #drawGrid () {
    const verticalSpacing = (this.ctx.canvas.height - this.config.X_AXIS_LABEL_HEIGHT) / this.config.NUM_GRID_LINES
    const maxValue = Math.max(...this.data)
    const interval = Math.ceil(maxValue / this.config.NUM_GRID_LINES)

    for (let i = 0; i <= this.config.NUM_GRID_LINES; i++) {
      this.#drawGridLine(i, verticalSpacing, interval)
    }

    // Draw x and y axes
    this.ctx.beginPath()
    this.ctx.moveTo(this.config.Y_AXIS_LABEL_WIDTH, 0)
    this.ctx.lineTo(this.config.Y_AXIS_LABEL_WIDTH, this.ctx.canvas.height - this.config.X_AXIS_LABEL_HEIGHT)
    this.ctx.lineTo(this.ctx.canvas.width, this.ctx.canvas.height - this.config.X_AXIS_LABEL_HEIGHT)
    this.ctx.stroke()
  }

  /**
   * Draws a single grid line.
   *
   * @param {number} index - Index of the grid line.
   * @param {number} spacing - Vertical spacing for grid lines.
   * @param {number} interval - Value interval for grid lines.
   */
  #drawGridLine (index, spacing, interval) {
    this.ctx.beginPath()
    this.ctx.moveTo(this.config.Y_AXIS_LABEL_WIDTH, index * spacing)
    this.ctx.lineTo(this.ctx.canvas.width, index * spacing)
    this.ctx.stroke()

    const gridValue = interval * (this.config.NUM_GRID_LINES - index)

    this.ctx.textAlign = 'right'
    this.ctx.font = this.config.GRID_FONT
    this.ctx.fillStyle = 'black'
    this.ctx.fillText(gridValue.toString(), this.config.Y_AXIS_LABEL_WIDTH - 5, index * spacing)
  }
}

import { drawHorizontalGridLines, drawVerticalGridLines } from './drawUtils.js'
import { drawBarGraph } from './graph.js'

/**
 * Represents a customizable chart rendered on a canvas.
 * Currently supports bar type charts with grid lines.
 */
export default class MyChart {
  /**
   * Constructs a new chart instance with the provided context and configuration.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {object} config - Configuration for the chart including type, data, color, and grid options.
   */
  constructor (ctx, config) {
    this.ctx = ctx
    this.config = config
    this.init()
  }

  /**
   * Initializes and draws the chart based on the provided configuration.
   * Draws grid lines and bars for bar type charts.
   */
  init () {
    drawHorizontalGridLines(this.ctx, this.ctx.canvas, this.config.gridOptions)
    drawVerticalGridLines(this.ctx, this.ctx.canvas, this.config.gridOptions)

    if (this.config.type === 'bar') {
      drawBarGraph(this.ctx, this.config.data, this.config.color)
    }
  }
}

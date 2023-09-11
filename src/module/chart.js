import { drawHorizontalGridLines, drawVerticalGridLines } from './drawUtils.js'
import { drawBarGraph } from './graph.js'

/**
 *
 */
export default class MyChart {
  /**
   *
   * @param ctx
   * @param config
   */
  constructor (ctx, config) {
    this.ctx = ctx
    this.config = config
    this.init()
  }

  /**
   *
   */
  init () {
    
    drawHorizontalGridLines(this.ctx, this.ctx.canvas, this.config.gridOptions)
    drawVerticalGridLines(this.ctx, this.ctx.canvas, this.config.gridOptions)

    if (this.config.type === 'bar') {
      drawBarGraph(this.ctx, this.config.data, this.config.color)
    }
  }
}

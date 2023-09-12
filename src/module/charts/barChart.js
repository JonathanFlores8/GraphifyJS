import { BaseChart } from '../baseChart.js'
/**
 * A class representing a BarChart.
 *
 */
export class BarChart extends BaseChart {
  /**
   *
   * @param ctx
   * @param config
   */
  constructor (ctx, config) {
    super(ctx)
    if (config.gridOptions) {
      this.drawGrid(config.gridOptions)
    }
    this.data = config.data
    this.color = config.color
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
    const scaledData = this.#scaleData(this.data)
    const barWidth = this.ctx.canvas.width / scaledData.length

    for (let i = 0; i < scaledData.length; i++) {
      const x = i * barWidth
      const y = this.ctx.canvas.height - scaledData[i]
      const height = scaledData[i]

      this.ctx.fillStyle = this.color
      this.ctx.fillRect(x, y, barWidth, height)
    }
  }
}

import { BarChart } from './charts/BarChart.js'
import { PieChart } from './charts/PieChart.js'

/**
 * Represents a customizable chart rendered on a canvas.
 * Currently supports bar and pie charts.
 */
export default class MyChart {
  #ctx
  #config

  /**
   * Initialize a new chart instance.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {object} config - Configuration for the chart.
   */
  constructor (ctx, config) {
    this.#ctx = ctx
    this.#config = config
    this.init()
  }

  /**
   * Initializes and draws the chart based on the provided configuration.
   * Draws grid lines and bars for bar type charts and pie for pie type charts.
   */
  init () {
    if (this.#config.type === 'bar') {
      const barChartInstance = new BarChart(this.#ctx, {
        data: this.#config.data,
        color: this.#config.color,
        labels: this.#config.labels
      })
      barChartInstance.draw()
    }

    if (this.#config.type === 'pie') {
      const pieChartInstance = new PieChart(this.#ctx, {
        data: this.#config.data,
        labels: this.#config.labels,
        colors: this.#config.colors
      })
      pieChartInstance.draw()
    }
  }
}

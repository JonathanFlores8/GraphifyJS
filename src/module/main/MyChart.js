import { BarChart } from '../charts/BarChart.js'
import { PieChart } from '../charts/PieChart.js'

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
  }

  /**
   * Initializes and draws the chart based on the provided configuration.
   * Draws grid lines and bars for bar type charts and slices for pie type charts.
   *
   * @returns {BarChart|PieChart|null} The instance of the drawn chart, or null if the chart type is unrecognized.
   */
  init () {
    if (this.#config.type === 'bar') {
      const barChartInstance = new BarChart(this.#ctx, {
        data: this.#config.data,
        color: this.#config.color,
        labels: this.#config.labels
      })
      return barChartInstance
    }

    if (this.#config.type === 'pie') {
      const pieChartInstance = new PieChart(this.#ctx, {
        data: this.#config.data,
        labels: this.#config.labels,
        colors: this.#config.colors
      })
      return pieChartInstance
    }

    // Return null if the chart type is unrecognized
    return null
  }
}

import { scaleData } from '../dataHandler.js'

/**
 * Draws a bar chart on the provided canvas context using the given data and color.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the bar chart will be drawn.
 * @param {number[]} data - An array of numerical data that will be represented as bars in the chart.
 * @param {string} color - The color to be used for the bars in the chart.
 */
export function drawBarChart (ctx, data, color) {
  const scaledData = scaleData(data, ctx.canvas.height)
  const barWidth = ctx.canvas.width / scaledData.length

  for (let i = 0; i < scaledData.length; i++) {
    const x = i * barWidth
    const y = ctx.canvas.height - scaledData[i]
    const height = scaledData[i]

    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth, height)
  }
}

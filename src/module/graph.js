import { drawRectangle } from './drawUtils.js'
import { scaleData } from './dataHandler.js'

/**
 * Draws a bar graph on the provided canvas context using the given data and color.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the bar graph will be drawn.
 * @param {number[]} data - An array of numerical data that will be represented as bars in the graph.
 * @param {string} color - The color to be used for the bars in the graph.
 */
export function drawBarGraph (ctx, data, color) {
  const scaledData = scaleData(data, ctx.canvas.height)
  const barWidth = ctx.canvas.width / scaledData.length

  for (let i = 0; i < scaledData.length; i++) {
    drawRectangle(ctx, i * barWidth, ctx.canvas.height - scaledData[i], barWidth, scaledData[i], color)
  }
}

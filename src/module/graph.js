import { drawRectangle } from './drawUtils.js'
import { scaleData } from './dataHandler.js'

/**
 *
 * @param ctx
 * @param data
 * @param color
 */
export function drawBarGraph (ctx, data, color) {
  const scaledData = scaleData(data, ctx.canvas.height)
  const barWidth = ctx.canvas.width / scaledData.length

  for (let i = 0; i < scaledData.length; i++) {
    drawRectangle(ctx, i * barWidth, ctx.canvas.height - scaledData[i], barWidth, scaledData[i], color)
  }
}

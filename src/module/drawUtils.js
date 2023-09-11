/**
 *
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param color
 */
export function drawRectangle (ctx, x, y, width, height, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

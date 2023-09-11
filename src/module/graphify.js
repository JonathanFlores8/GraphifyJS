/**
 *
 * @param context
 * @param x
 * @param y
 * @param width
 * @param height
 * @param color
 */
export function drawRectangle (context, x, y, width, height, color = 'black') {
  context.fillStyle = color
  context.fillRect(x, y, width, height)
}

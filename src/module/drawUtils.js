/**
 * Draw a rectangle on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {number} x - The x-coordinate of the top-left corner
 * @param {number} y - The y-coordinate of the top-left corner
 * @param {number} width - The width of the rectangle
 * @param {number} height - The height of the rectangle
 * @param {string} color - The fill color of the rectangle
 */
export function drawRectangle (ctx, x, y, width, height, color) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
}

/**
 * Draw horizontal grid lines on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {object} options - Configuration for drawing grid lines
 * @param {number} [options.numLines=10] - The number of horizontal lines
 * @param {string} [options.color='#ddd'] - The color of the grid lines
 */
export function drawHorizontalGridLines (ctx, canvas, { numLines = 10, color = '#ddd' } = {}) {
  const verticalSpacing = canvas.height / numLines
  for (let i = 0; i <= numLines; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * verticalSpacing)
    ctx.lineTo(canvas.width, i * verticalSpacing)
    ctx.strokeStyle = color
    ctx.stroke()
  }
}

/**
 * Draw vertical grid lines on the canvas.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {object} options - Configuration for drawing grid lines
 * @param {number} [options.numLines=10] - The number of vertical lines
 * @param {string} [options.color='#ddd'] - The color of the grid lines
 */
export function drawVerticalGridLines (ctx, canvas, { numLines = 10, color = '#ddd' } = {}) {
  const horizontalSpacing = canvas.width / numLines
  for (let i = 0; i <= numLines; i++) {
    ctx.beginPath()
    ctx.moveTo(i * horizontalSpacing, 0)
    ctx.lineTo(i * horizontalSpacing, canvas.height)
    ctx.strokeStyle = color
    ctx.stroke()
  }
}

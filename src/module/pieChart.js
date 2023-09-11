/**
 * Draws a pie chart on the provided canvas context using the given data, labels, and colors.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the pie chart will be drawn.
 * @param {number[]} data - An array of numerical data that will be represented as segments in the pie.
 * @param {string[]} labels - Labels corresponding to each data segment.
 * @param {string[]} colors - Colors for each segment.
 */
export function drawPieChart (ctx, data, labels, colors) {
  const total = data.reduce((acc, value) => acc + value, 0)
  let startAngle = 0

  for (let i = 0; i < data.length; i++) {
    const sliceAngle = (data[i] / total) * 2 * Math.PI

    ctx.beginPath()
    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.arc(
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      Math.min(ctx.canvas.width, ctx.canvas.height) / 2,
      startAngle,
      startAngle + sliceAngle
    )
    ctx.closePath()

    ctx.fillStyle = colors[i]
    ctx.fill()

    startAngle += sliceAngle
  }
}

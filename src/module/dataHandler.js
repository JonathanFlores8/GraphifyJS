/**
 * Scales the data to fit the canvas.
 *
 * @param {data} data - The data to be scaled.
 * @param {canvasHeight} canvasHeight - The height of the canvas.
 * @returns {number[]} The scaled data.
 */
export function scaleData (data, canvasHeight) {
  const maxDataValue = Math.max(...data)
  return data.map(value => (value / maxDataValue) * canvasHeight)
}

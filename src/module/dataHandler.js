/**
 *
 * @param data
 * @param canvasHeight
 */
export function scaleData (data, canvasHeight) {
  const maxDataValue = Math.max(...data)
  return data.map(value => (value / maxDataValue) * canvasHeight)
}

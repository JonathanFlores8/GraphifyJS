/**
 *
 */
export class PieChart {
  #ctx
  #data
  #labels
  #colors

  /**
   *
   * @param ctx
   * @param config
   */
  constructor (ctx, config) {
    this.#ctx = ctx
    this.#data = config.data
    this.#labels = config.labels
    this.#colors = config.colors
  }

  /**
   *
   */
  draw () {
    const total = this.#data.reduce((acc, value) => acc + value, 0)
    let startAngle = 0

    for (let i = 0; i < this.#data.length; i++) {
      const sliceAngle = (this.#data[i] / total) * 2 * Math.PI

      this.#ctx.beginPath()
      this.#ctx.moveTo(this.#ctx.canvas.width / 2, this.#ctx.canvas.height / 2)
      this.#ctx.arc(
        this.#ctx.canvas.width / 2,
        this.#ctx.canvas.height / 2,
        Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 2,
        startAngle,
        startAngle + sliceAngle
      )
      this.#ctx.closePath()
      this.#ctx.fillStyle = this.#colors[i]
      this.#ctx.fill()

      const labelX = this.#ctx.canvas.width / 2 + (Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 4) * Math.cos(startAngle + sliceAngle / 2)
      const labelY = this.#ctx.canvas.height / 2 + (Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 4) * Math.sin(startAngle + sliceAngle / 2)

      this.#ctx.fillStyle = 'black'
      this.#ctx.font = '15px Arial'
      this.#ctx.textAlign = 'center'
      this.#ctx.textBaseline = 'middle'
      this.#ctx.fillText(`${(this.#data[i] / total * 100).toFixed(2)}%`, labelX, labelY)

      startAngle += sliceAngle
    }

    const boxSize = 15
    const spacing = 5

    const totalLegendHeight = this.#colors.length * (boxSize + spacing)
    const legendY = (this.#ctx.canvas.height - totalLegendHeight) / 2
    const legendX = 5 // X position of legends, 5 pixels from the left side of canvas

    this.#ctx.font = '12px Arial'
    this.#ctx.textAlign = 'left'
    this.#ctx.textBaseline = 'top'

    for (let i = 0; i < this.#colors.length; i++) {
      this.#ctx.fillStyle = this.#colors[i]
      this.#ctx.fillRect(legendX, legendY + i * (boxSize + spacing), boxSize, boxSize)

      this.#ctx.fillStyle = 'black'
      this.#ctx.fillText(this.#labels[i], legendX + boxSize + spacing, legendY + i * (boxSize + spacing))
    }
  }
}

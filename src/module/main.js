import { drawHorizontalGridLines, drawVerticalGridLines } from './drawUtils.js'
import { drawBarGraph } from './graph.js'

/**
 *
 */
window.onload = function () {
  test1()
  test2()
}

/**
 *
 */
function test1 () {
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  drawHorizontalGridLines(ctx, canvas)
  drawVerticalGridLines(ctx, canvas)

  const sampleData = [50, 100, 150, 200, 250]
  drawBarGraph(ctx, sampleData, 'red')
}

/**
 *
 */
function test2 () {
  const canvas = document.getElementById('myCanvas2')
  const ctx = canvas.getContext('2d')

  drawHorizontalGridLines(ctx, canvas)
  drawVerticalGridLines(ctx, canvas)

  const sampleData = [200, 400, 150, 200, 250]
  drawBarGraph(ctx, sampleData, 'red')
}

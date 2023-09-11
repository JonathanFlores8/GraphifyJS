import { drawBarGraph } from './graph.js'

/**
 *
 */
window.onload = function () {
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  const data = [50, 100, 150, 200, 250]
  drawBarGraph(ctx, data, 'red')
}

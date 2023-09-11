import { drawRectangle } from './graphify.js'

/**
 *
 */
window.onload = function () {
  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  drawRectangle(ctx, 0, 0, 400, 400, 'red')
}

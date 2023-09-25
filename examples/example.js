import { BarChart } from '../src/module/charts/BarChart.js'

/**
 *
 */
window.onload = function () {
  // Set up and render the first bar chart
  const canvas1 = document.getElementById('myCanvas')
  const ctx1 = canvas1.getContext('2d')
  const chartConfig1 = {
    data: [10, 50, 100, 200, 300, 200, 100, 230, 200, 100],
    color: 'purple',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  }

  const chart1 = new BarChart(ctx1, chartConfig1)

  // Updating data
  chart1.updateData([20, 60, 110, 210, 310, 210, 110, 240, 210, 110])

  // Updating color
  chart1.updateColor('blue')

  // Updating labels
  chart1.updateLabels(['X', 'Y', 'Z', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'])

  // Updating configuration
  chart1.updateConfig({
    Y_AXIS_LABEL_WIDTH: 60,
    X_AXIS_LABEL_HEIGHT: 40,
    BAR_GAP: 15
  })

  // Getting the current configuration
  console.log(chart1.getConfig())

  // Getting the current data
  console.log(chart1.getData())

  // Getting the current dimensions of the chart
  console.log(chart1.getChartDimensions())
}

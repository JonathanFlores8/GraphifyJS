import MyChart from '../src/module/main/MyChart.js'
/**
 * Initializes and renders bar charts when the window loads.
 */
window.onload = function () {
  // Set up and render the first bar chart
  const canvas1 = document.getElementById('myCanvas')
  const ctx1 = canvas1.getContext('2d')
  const chartConfig1 = {
    type: 'bar',
    data: [10, 50, 100, 200, 300, 200, 100, 230, 200, 100],
    color: 'purple',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  }
  // eslint-disable-next-line no-unused-vars
  const chart1 = new MyChart(ctx1, chartConfig1)

  // Set up and render the second bar chart
  const canvas2 = document.getElementById('myCanvas2')
  const ctx2 = canvas2.getContext('2d')

  const chartConfig2 = {
    type: 'bar',
    data: [50, 100, 150, 200, 250, 500, 400, 383, 23, 32, 48],
    color: 'red'
  }
  // eslint-disable-next-line no-unused-vars
  const chart2 = new MyChart(ctx2, chartConfig2)

  // Set up and render the third bar chart
  const canvas3 = document.getElementById('myCanvas3')
  const ctx3 = canvas3.getContext('2d')
  const chartConfig3 = {
    type: 'bar',
    data: [20, 40, 15, 100, 90],
    color: 'green'
  }
  // eslint-disable-next-line no-unused-vars
  const chart3 = new MyChart(ctx3, chartConfig3)

  // Set up and render the pie chart
  const pieCanvas = document.getElementById('pieCanvas')
  const pieCtx = pieCanvas.getContext('2d')
  const pieConfig = {
    type: 'pie',
    data: [50, 100, 150, 200, 21],
    labels: ['A', 'B', 'C', 'D', 'Q'],
    colors: ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#FF33FF']
  }
  // eslint-disable-next-line no-unused-vars
  const pieChart = new MyChart(pieCtx, pieConfig)
}

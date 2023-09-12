import MyChart from './renderer/chart.js'
/**
 * Initializes and renders bar charts when the window loads.
 */
window.onload = function () {
  // Set up and render the first bar chart
  const canvas1 = document.getElementById('myCanvas')
  const ctx1 = canvas1.getContext('2d')
  const chartConfig1 = {
    type: 'bar',
    data: [50, 100, 150, 200, 250],
    color: 'blue',
    gridOptions: {
      numLines: 50,
      color: 'black'
    }
  }
  const chart1 = new MyChart(ctx1, chartConfig1)

  // Set up and render the second bar chart
  const canvas2 = document.getElementById('myCanvas2')
  const ctx2 = canvas2.getContext('2d')
  const hej = {
    data: [50, 100, 150, 200, 250, 500, 400, 383, 23, 32, 48, 2123, 45, 0, 43,0,0,0, 10, 10 ,344, 200]
  }
  const chartConfig2 = {
    type: 'bar',
    data: hej.data,
    color: 'red',
    gridOptions: {
      numLines: hej.data.length,
      color: 'red'
    }
  }
  const chart2 = new MyChart(ctx2, chartConfig2)

  // Set up and render the third bar chart
  const canvas3 = document.getElementById('myCanvas3')
  const ctx3 = canvas3.getContext('2d')
  const chartConfig3 = {
    type: 'bar',
    data: [20, 40, 15, 100, 90],
    color: 'green',
    gridOptions: {
      numLines: 20,
      color: 'grey'
    }
  }
  const chart3 = new MyChart(ctx3, chartConfig3)

  // Set up and render the pie chart
  const pieCanvas = document.getElementById('pieCanvas')
  const pieCtx = pieCanvas.getContext('2d')
  const pieConfig = {
    type: 'pie',
    data: [50, 100, 150, 200],
    labels: ['A', 'B', 'C', 'D'],
    colors: ['#FF5733', '#33FF57', '#5733FF', '#FFFF33']
  }
  const pieChart = new MyChart(pieCtx, pieConfig)
}

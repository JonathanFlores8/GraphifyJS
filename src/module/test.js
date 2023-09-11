import MyChart from './chart.js'

/**
 *
 */
window.onload = function () {
  const canvas1 = document.getElementById('myCanvas')
  const ctx1 = canvas1.getContext('2d')

  const chartConfig1 = {
    type: 'bar',
    data: [50, 100, 150, 200, 250],
    color: 'red',
    gridOptions: {
      numLines: 10,
      color: '#ddd'
    }
  }

  const chart1 = new MyChart(ctx1, chartConfig1)

  const canvas2 = document.getElementById('myCanvas2')
  const ctx2 = canvas2.getContext('2d')

  const chartConfig2 = {
    type: 'bar',
    data: [200, 400, 150, 200, 250],
    color: 'red',
    gridOptions: {
      numLines: 10,
      color: '#ddd'
    }
  }

  const chart2 = new MyChart(ctx2, chartConfig2)
}

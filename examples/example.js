import MyChart from '../src/module/main/MyChart.js'

const ctx = document.getElementById('barCanvas').getContext('2d')
const config = {
  type: 'bar',
  data: [10, 20, 30],
  labels: ['One', 'Two', 'Three'],
  color: 'blue'
}
const myChart = new MyChart(ctx, config).init()
myChart.updateData([40, 50, 6])
myChart.updateData([10, 20, 30, 90])
myChart.toggleGrid(true)
myChart.updateLabels(['One', 'Two', 'Three', 'Four'])

const pieCtx = document.getElementById('pieCanvas').getContext('2d')

const pieConfig = {
  type: 'pie',
  data: [10, 20, 30],
  labels: ['One', 'Two', 'Three'],
  colors: ['red', 'green', 'blue']
}
const pieChart = new MyChart(pieCtx, pieConfig).init()
pieChart.updateColors(['red', 'green', 'blue'])

import MyChart from '../src/module/main/MyChart.js'

const ctx = document.getElementById('barCanvas').getContext('2d')
const config = {
  type: 'bar',
  data: [10, 20, 30],
  labels: ['One', 'Two', 'Three'],
  color: 'blue'
}
const myChart = new MyChart(ctx, config).init()
myChart.draw()
myChart.toggleGrid(true)
myChart.updateBarGap(20)
myChart.updateData([40, 50, 60])
myChart.updateLabels(['Four', 'Five', 'Six'])
myChart.updateColor('red')

const pieCtx = document.getElementById('pieCanvas').getContext('2d')

const pieConfig = {
  type: 'pie',
  data: [10, 20, 30],
  labels: ['One', 'Two', 'Three'],
  colors: ['yellow', 'orange', 'pink']
}
const pieChart = new MyChart(pieCtx, pieConfig).init()
pieChart.draw()
pieChart.updateLegendLabels(['one', 'two', 'three'])
pieChart.updateColors(['blue', 'red', 'green'])
pieChart.updateData([40, 50, 60])
pieChart.updateConfig({ legendBoxSize: 20 })

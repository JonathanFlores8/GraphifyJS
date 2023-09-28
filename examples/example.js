import MyChart from '../src/module/main/MyChart.js'

// Bar chart
const barCtx = document.getElementById('barCanvas').getContext('2d')
const barConfig = {
  type: 'bar',
  data: [10, 20, 30],
  labels: ['One', 'Two', 'Three'],
  color: 'blue'
}
const barChart = new MyChart(barCtx, barConfig).init()
barChart.draw()
barChart.toggleGrid(true)
barChart.updateBarGap(20)
barChart.updateData([40, 50, 60])
barChart.updateLabels(['Four', 'Five', 'Six'])
barChart.updateColor('red')
const colors = ['red', 'blue, green, orange']
let flag = true
setInterval(() => {
  const color = Math.random() > 0.5 ? colors[0] : colors[1]
  barChart.updateColor(color)
  barChart.toggleGraph(flag)
  flag = !flag
}, 250)

// Pie chart
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

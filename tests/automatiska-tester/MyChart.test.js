import MyChart from '../../src/module/main/MyChart.js'
import { BarChart } from '../../src/module/charts/BarChart.js'
import { PieChart } from '../../src/module/charts/PieChart.js'

jest.mock('../../src/module/charts/BarChart.js')
jest.mock('../../src/module/charts/PieChart.js')

describe('MyChart', () => {
  let ctxMock

  beforeEach(() => {
    // Creating a mock for the canvas rendering context
    ctxMock = {
      fillText: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      beginPath: jest.fn(),
      closePath: jest.fn()
    }

    BarChart.mockClear()
    PieChart.mockClear()
  })

  it('should create a BarChart instance for type "bar"', () => {
    const config = {
      type: 'bar',
      data: [10, 50, 100],
      color: 'purple',
      labels: ['A', 'B', 'C']
    }

    const myChart = new MyChart(ctxMock, config)
    const chartInstance = myChart.init()

    expect(BarChart).toHaveBeenCalledTimes(1)
    expect(PieChart).not.toHaveBeenCalled()
    expect(chartInstance).toBeInstanceOf(BarChart)
  })

  it('should create a PieChart instance for type "pie"', () => {
    const config = {
      type: 'pie',
      data: [50, 100, 150],
      labels: ['A', 'B', 'C'],
      colors: ['#FF5733', '#33FF57', '#5733FF']
    }

    const myChart = new MyChart(ctxMock, config)
    const chartInstance = myChart.init()

    expect(PieChart).toHaveBeenCalledTimes(1)
    expect(BarChart).not.toHaveBeenCalled()
    expect(chartInstance).toBeInstanceOf(PieChart)
  })
})

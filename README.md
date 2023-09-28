```markdown
# TestGraphifyJS

A simple and efficient JavaScript library for rendering bar charts on HTML canvas.

https://www.npmjs.com/package/testgraphifyjs

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Bar Chart Example](#bar-chart-example)
  - [Dependencies](#dependencies)
  - [Public Methods](#public-methods)
    - [BarChart Methods](#barchart-methods)
    - [PieChart Methods](#piechart-methods)
  - [Testing](#testing)
  - [Bug Reporting](#bug-reporting)
- [License](#license)
```

## Installation

Start a new project and initialize it with npm by running the following commands:

```bash
npm init -y
npm install testgraphifyjs
```

Since this module is written in ECMAScript 6, you will need to specify `"type": "module"` in your `package.json` file.

```json
{
  "type": "module"
}
```

## Usage

Below is a simple example on how you can use the `testgraphifyjs` module to render a bar chart on an HTML canvas. You can use either the [Vite](https://vitejs.dev/) npm package or the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to render the HTML.

### index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GraphifyJS</title>
</head>
<body>

    <canvas id="barCanvas"></canvas>

    <script src="./index.js" type="module"></script>

</body>
</html>
```

### index.js:

```javascript
import { MyChart } from 'testgraphifyjs';

/**
 * Initializes and renders bar charts when the window loads.
 */
window.onload = function () {
  // Set up and render the first chart
  const ctx = document.getElementById('barCanvas').getContext('2d');
  const chartConfig = {
    type: 'bar',
    data: [10, 50, 100, 200, 300, 200, 100, 230, 200, 100],
    color: 'purple',
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  };
  const chart = new MyChart(ctx, chartConfig).init();
  chart.draw();
  chart.toggleGrid(true);

};
```

In this example, an HTML file (`index.html`) and a JavaScript file (`index.js`) are created. The `testgraphifyjs` module is imported in the JavaScript file, and a bar chart is initialized and rendered on the canvas element in the HTML file when the window loads.

## Public Methods

### BarChart Methods:

- `draw()`: Renders the bar chart on the canvas.
- `updateData(newData)`: Updates the data for the chart and re-renders it.
- `updateColor(newColor)`: Updates the color for the bars in the chart and re-renders it.
- `updateLabels(newLabels)`: Updates the labels for the chart and re-renders it.
- `updateConfig(newConfig)`: Updates the configuration for the chart and re-renders it.
- `getData()`: Retrieves the current data of the chart.
- `getConfig()`: Retrieves the current configuration of the chart.
- `getChartDimensions()`: Retrieves the current dimensions of the chart.
- `updateGridFont(newGridFont)`: Updates the font used for grid labels and re-renders the chart.
- `updateLabelFont(newLabelFont)`: Updates the font used for bar labels and re-renders the chart.
- `updateNumGridLines(newNumGridLines)`: Updates the number of grid lines and re-renders the chart.
- `updateYAxisLabelWidth(newYAxisLabelWidth)`: Updates the width for the Y-axis labels and re-renders the chart.
- `updateXAxisLabelHeight(newXAxisLabelHeight)`: Updates the height for the X-axis labels and re-renders the chart.
- `updateBarGap(newBarGap)`: Updates the gap between bars and re-renders the chart.
- `toggleGrid(showGrid)`: Toggles the visibility of grid lines and re-renders the chart.

### PieChart Methods:

- `draw()`: Draws the pie chart.
- `updateData(newData)`: Updates the data for the chart and re-renders it.
- `updateLegendLabels(newLabels)`: Updates the labels for the chart and re-renders the chart.
- `updateColors(newColors)`: Updates the colors for the slices and re-renders the chart.
- `updateConfig(newConfig)`: Updates the configuration for the chart and re-renders it.

## Dependencies

- A modern browser with support for the HTML canvas API.

## Testing

See the `tests` directory for Jest test suites verifying the functionality of the `MyChart` class. Run the tests with the following command:

```bash
npm test
```

## Bug Reporting

If you encounter any bugs or issues, please report them on the GitHub repository's [issues page](https://github.com/JonathanFlores8/graphifyjs/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

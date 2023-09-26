```markdown
# TestGraphifyJS

A simple and efficient JavaScript library for rendering bar charts on HTML canvas.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Bar Chart Example](#bar-chart-example)
  - [Dependencies](#dependencies)
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

## Dependencies

- A modern browser with support for the HTML canvas API.

## Testing

See the `__tests__` directory for Jest test suites verifying the functionality of the `BarChart` class and other components. Run the tests with the following command:

```bash
npm test
```

## Bug Reporting

If you encounter any bugs or issues, please report them on the GitHub repository's [issues page](https://github.com/JonathanFlores8/graphifyjs/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

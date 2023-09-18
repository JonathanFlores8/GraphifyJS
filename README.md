
---

# GraphifyJS

![version](https://img.shields.io/badge/version-1.0.0-blue)

A simple, customizable module for rendering bar and pie charts on a canvas.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Bar Chart](#bar-chart)
  - [Pie Chart](#pie-chart)
- [Development](#development)
- [License](#license)
- [Issues](#issues)

## Installation

To install the module, simply run:

```bash
npm install graphifyjs
```

## Prerequisites

### ES6 Modules

GraphifyJS is built using ES6 modules. To ensure compatibility, make sure to add the following to your project's `package.json`:

```json
{
  "type": "module"
}
```

If you're using a modern bundler or build tool (like Webpack, Rollup, or Vite), they typically handle ES6 modules seamlessly. However, if you're not using such tools or are unfamiliar with ES6 modules, [here's a guide](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) to get started.

## Usage

Before you can use GraphifyJS, ensure you have a canvas element in your HTML:

```bash
<canvas id="myCanvas" width="400" height="400"></canvas>
```


### Bar Chart

To create a bar chart, you'll need to provide the rendering context, data, colors, and labels.

```javascript
import { MyChart } from 'graphifyjs';

const ctx = document.getElementById('myCanvas').getContext('2d');
const chart = new MyChart(ctx, {
  type: 'bar',
  data: [10, 20, 30, 40],
  color: '#FF0000',
  labels: ['Jan', 'Feb', 'Mar', 'Apr']
});

chart.init();
```

### Pie Chart

To create a pie chart, you'll need to provide the rendering context, data, colors for each segment, and labels.

```javascript
import { MyChart } from 'graphifyjs';

const ctx = document.getElementById('myCanvas').getContext('2d');
const chart = new MyChart(ctx, {
  type: 'pie',
  data: [10, 20, 30, 40],
  colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
  labels: ['Red', 'Green', 'Blue', 'Yellow']
});

chart.init();
```

## Development

To run the project locally for development:

1. Clone the repository:

   ```bash
   git clone https://github.com/JonathanFlores8/graphifyjs.git
   cd graphifyjs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Issues

If you encounter any issues or have suggestions for improvements, please [create an issue on GitHub](https://github.com/JonathanFlores8/graphifyjs/issues).

---
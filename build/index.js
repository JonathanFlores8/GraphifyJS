// src/module/charts/BarChart.js
class BarChart {
  #ctx;
  #data;
  #color;
  #labels;
  #config;
  constructor(ctx, config) {
    this.#ctx = ctx;
    this.#data = config.data;
    this.#color = config.color || "blue";
    this.#labels = config.labels;
    this.#config = {
      Y_AXIS_LABEL_WIDTH: config.Y_AXIS_LABEL_WIDTH || 50,
      X_AXIS_LABEL_HEIGHT: config.X_AXIS_LABEL_HEIGHT || 30,
      BAR_GAP: config.BAR_GAP || 10,
      NUM_GRID_LINES: config.NUM_GRID_LINES || 10,
      GRID_FONT: config.GRID_FONT || "10px Arial",
      LABEL_FONT: config.LABEL_FONT || "12px Arial"
    };
  }
  draw() {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
    this.#drawGrid();
    this.#drawBars();
  }
  #scaleData(data) {
    const maxDataValue = Math.max(...data);
    const canvasHeight = this.#ctx.canvas.height - this.#config.X_AXIS_LABEL_HEIGHT;
    return data.map((value) => value / maxDataValue * canvasHeight);
  }
  #drawBars() {
    const scaledData = this.#scaleData(this.#data);
    const totalGapWidth = this.#config.BAR_GAP * (scaledData.length - 1);
    const barWidth = (this.#ctx.canvas.width - this.#config.Y_AXIS_LABEL_WIDTH - totalGapWidth) / scaledData.length;
    for (let i = 0;i < scaledData.length; i++) {
      this.#drawSingleBar(i, scaledData, barWidth);
    }
  }
  #drawSingleBar(index, scaledData, barWidth) {
    const x = this.#config.Y_AXIS_LABEL_WIDTH + index * (barWidth + this.#config.BAR_GAP);
    const y = this.#ctx.canvas.height - scaledData[index] - this.#config.X_AXIS_LABEL_HEIGHT;
    this.#ctx.fillStyle = this.#color;
    this.#ctx.fillRect(x, y, barWidth, scaledData[index]);
    if (this.#labels && this.#labels[index]) {
      this.#ctx.fillStyle = "black";
      this.#ctx.font = this.#config.LABEL_FONT;
      this.#ctx.textAlign = "center";
      this.#ctx.fillText(this.#labels[index], x + barWidth / 2, this.#ctx.canvas.height - 5);
    }
  }
  #drawGrid() {
    const verticalSpacing = (this.#ctx.canvas.height - this.#config.X_AXIS_LABEL_HEIGHT) / this.#config.NUM_GRID_LINES;
    const maxValue = Math.max(...this.#data);
    const interval = Math.ceil(maxValue / this.#config.NUM_GRID_LINES);
    for (let i = 0;i <= this.#config.NUM_GRID_LINES; i++) {
      this.#drawGridLine(i, verticalSpacing, interval);
    }
    this.#ctx.beginPath();
    this.#ctx.moveTo(this.#config.Y_AXIS_LABEL_WIDTH, 0);
    this.#ctx.lineTo(this.#config.Y_AXIS_LABEL_WIDTH, this.#ctx.canvas.height - this.#config.X_AXIS_LABEL_HEIGHT);
    this.#ctx.lineTo(this.#ctx.canvas.width, this.#ctx.canvas.height - this.#config.X_AXIS_LABEL_HEIGHT);
    this.#ctx.stroke();
  }
  #drawGridLine(index, spacing, interval) {
    this.#ctx.beginPath();
    this.#ctx.moveTo(this.#config.Y_AXIS_LABEL_WIDTH, index * spacing);
    this.#ctx.lineTo(this.#ctx.canvas.width, index * spacing);
    this.#ctx.stroke();
    const gridValue = interval * (this.#config.NUM_GRID_LINES - index);
    this.#ctx.textAlign = "right";
    this.#ctx.font = this.#config.GRID_FONT;
    this.#ctx.fillStyle = "black";
    this.#ctx.fillText(gridValue.toString(), this.#config.Y_AXIS_LABEL_WIDTH - 5, index * spacing);
  }
}

// src/module/charts/PieChart.js
class PieChart {
  #ctx;
  #data;
  #labels;
  #colors;
  constructor(ctx, config = {}) {
    this.#ctx = ctx;
    this.#data = config.data || [1];
    this.#labels = config.labels || ["Default"];
    this.#colors = config.colors || ["grey"];
    this.config = {
      FONT: config.FONT || "12px Arial",
      LEGEND_BOX_SIZE: config.LEGEND_BOX_SIZE || 15,
      LEGEND_SPACING: config.LEGEND_SPACING || 5
    };
  }
  draw() {
    const total = this.#data.reduce((acc, value) => acc + value, 0);
    let startAngle = 0;
    this.#data.forEach((dataPoint, i) => {
      this.#drawSlice(startAngle, dataPoint, total, i);
      startAngle += dataPoint / total * 2 * Math.PI;
    });
    this.#drawLegend();
  }
  #drawSlice(startAngle, dataPoint, total, index) {
    const sliceAngle = dataPoint / total * 2 * Math.PI;
    const canvasCenterX = this.#ctx.canvas.width / 2;
    const canvasCenterY = this.#ctx.canvas.height / 2;
    const radius = Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 2;
    this.#ctx.beginPath();
    this.#ctx.moveTo(canvasCenterX, canvasCenterY);
    this.#ctx.arc(canvasCenterX, canvasCenterY, radius, startAngle, startAngle + sliceAngle);
    this.#ctx.closePath();
    this.#ctx.fillStyle = this.#colors[index];
    this.#ctx.fill();
    this.#drawSliceLabel(startAngle, sliceAngle, dataPoint, total);
  }
  #drawSliceLabel(startAngle, sliceAngle, dataPoint, total) {
    const radiusForLabel = Math.min(this.#ctx.canvas.width, this.#ctx.canvas.height) / 4;
    const labelX = this.#ctx.canvas.width / 2 + radiusForLabel * Math.cos(startAngle + sliceAngle / 2);
    const labelY = this.#ctx.canvas.height / 2 + radiusForLabel * Math.sin(startAngle + sliceAngle / 2);
    this.#ctx.fillStyle = "black";
    this.#ctx.font = this.config.FONT;
    this.#ctx.textAlign = "center";
    this.#ctx.textBaseline = "middle";
    this.#ctx.fillText(`${(dataPoint / total * 100).toFixed(2)}%`, labelX, labelY);
  }
  #drawLegend() {
    const totalLegendHeight = this.#colors.length * (this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING);
    const legendY = (this.#ctx.canvas.height - totalLegendHeight) / 2;
    const legendX = 5;
    this.#ctx.font = this.config.FONT;
    this.#ctx.textAlign = "left";
    this.#ctx.textBaseline = "top";
    this.#colors.forEach((color, i) => {
      this.#ctx.fillStyle = color;
      this.#ctx.fillRect(legendX, legendY + i * (this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING), this.config.LEGEND_BOX_SIZE, this.config.LEGEND_BOX_SIZE);
      this.#ctx.fillStyle = "black";
      this.#ctx.fillText(this.#labels[i], legendX + this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING, legendY + i * (this.config.LEGEND_BOX_SIZE + this.config.LEGEND_SPACING));
    });
  }
}

// src/module/main/MyChart.js
class MyChart {
  #ctx;
  #config;
  constructor(ctx, config) {
    this.#ctx = ctx;
    this.#config = config;
    this.init();
  }
  init() {
    if (this.#config.type === "bar") {
      const barChartInstance = new BarChart(this.#ctx, {
        data: this.#config.data,
        color: this.#config.color,
        labels: this.#config.labels
      });
      barChartInstance.draw();
    }
    if (this.#config.type === "pie") {
      const pieChartInstance = new PieChart(this.#ctx, {
        data: this.#config.data,
        labels: this.#config.labels,
        colors: this.#config.colors
      });
      pieChartInstance.draw();
    }
  }
}
export {
  MyChart
};

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
      yAxisLabelWidth: config.yAxisLabelWidth || 50,
      xAxisLabelHeight: config.xAxisLabelHeight || 30,
      barGap: config.barGap || 10,
      numGridLines: config.numGridLines || 10,
      gridFont: config.gridFont || "10px Arial",
      labelFont: config.labelFont || "12px Arial"
    };
  }
  draw() {
    this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height);
    this.#drawGrid();
    this.#drawBars();
  }
  #scaleData(data) {
    const maxDataValue = Math.max(...data);
    const canvasHeight = this.#ctx.canvas.height - this.#config.xAxisLabelHeight;
    return data.map((value) => value / maxDataValue * canvasHeight);
  }
  #drawBars() {
    const scaledData = this.#scaleData(this.#data);
    const totalGapWidth = this.#config.barGap * (scaledData.length - 1);
    const barWidth = (this.#ctx.canvas.width - this.#config.yAxisLabelWidth - totalGapWidth) / scaledData.length;
    for (let i = 0;i < scaledData.length; i++) {
      this.#drawSingleBar(i, scaledData, barWidth);
    }
  }
  #drawSingleBar(index, scaledData, barWidth) {
    const x = this.#config.yAxisLabelWidth + index * (barWidth + this.#config.barGap);
    const y = this.#ctx.canvas.height - scaledData[index] - this.#config.xAxisLabelHeight;
    this.#ctx.fillStyle = this.#color;
    this.#ctx.fillRect(x, y, barWidth, scaledData[index]);
    if (this.#labels && this.#labels[index]) {
      this.#ctx.fillStyle = "black";
      this.#ctx.font = this.#config.labelFont;
      this.#ctx.textAlign = "center";
      this.#ctx.fillText(this.#labels[index], x + barWidth / 2, this.#ctx.canvas.height - 5);
    }
  }
  #drawGrid() {
    if (!this.#config.showGrid)
      return;
    const verticalSpacing = (this.#ctx.canvas.height - this.#config.xAxisLabelHeight) / this.#config.numGridLines;
    const maxValue = Math.max(...this.#data);
    const interval = Math.ceil(maxValue / this.#config.numGridLines);
    for (let i = 0;i <= this.#config.numGridLines; i++) {
      this.#drawGridLine(i, verticalSpacing, interval);
    }
    this.#ctx.beginPath();
    this.#ctx.moveTo(this.#config.yAxisLabelWidth, 0);
    this.#ctx.lineTo(this.#config.yAxisLabelWidth, this.#ctx.canvas.height - this.#config.xAxisLabelHeight);
    this.#ctx.lineTo(this.#ctx.canvas.width, this.#ctx.canvas.height - this.#config.xAxisLabelHeight);
    this.#ctx.stroke();
  }
  #drawGridLine(index, spacing, interval) {
    this.#ctx.beginPath();
    this.#ctx.moveTo(this.#config.yAxisLabelWidth, index * spacing);
    this.#ctx.lineTo(this.#ctx.canvas.width, index * spacing);
    this.#ctx.stroke();
    const gridValue = interval * (this.#config.numGridLines - index);
    this.#ctx.textAlign = "right";
    this.#ctx.font = this.#config.gridFont;
    this.#ctx.fillStyle = "black";
    this.#ctx.fillText(gridValue.toString(), this.#config.yAxisLabelWidth - 5, index * spacing);
  }
  updateData(newData) {
    if (!Array.isArray(newData) || !newData.every((item) => typeof item === "number")) {
      throw new Error("Invalid data: Expected an array of numbers");
    }
    this.#data = newData;
    this.draw();
  }
  updateColor(newColor) {
    if (typeof newColor !== "string") {
      throw new Error("Invalid color: Expected a string");
    }
    this.#color = newColor;
    this.draw();
  }
  updateLabels(newLabels) {
    if (!Array.isArray(newLabels) || !newLabels.every((label) => typeof label === "string")) {
      throw new Error("Invalid labels: Expected an array of strings");
    }
    this.#labels = newLabels;
    this.draw();
  }
  updateConfig(newConfig) {
    if (!newConfig || typeof newConfig !== "object") {
      throw new Error("Invalid config: Expected an object.");
    }
    this.#config = { ...this.#config, ...newConfig };
    this.draw();
  }
  getData() {
    return this.#data;
  }
  getConfig() {
    return this.#config;
  }
  getChartDimensions() {
    return {
      width: this.#ctx.canvas.width,
      height: this.#ctx.canvas.height
    };
  }
  updateGridFont(newGridFont) {
    if (typeof newGridFont !== "string") {
      throw new Error("Invalid grid font: Expected a string");
    }
    this.#config.gridFont = newGridFont;
    this.draw();
  }
  updateLabelFont(newLabelFont) {
    if (typeof newLabelFont !== "string") {
      throw new Error("Invalid label font: Expected a string");
    }
    this.#config.labelFont = newLabelFont;
    this.draw();
  }
  updateNumGridLines(newNumGridLines) {
    if (typeof newNumGridLines !== "number") {
      throw new Error("Invalid newNumGridLines: Expected a number");
    }
    this.#config.numGridLines = newNumGridLines;
    this.draw();
  }
  updateYAxisLabelWidth(newYAxisLabelWidth) {
    if (typeof newYAxisLabelWidth !== "number") {
      throw new Error("Invalid Y axid label width: Expected a number");
    }
    this.#config.yAxisLabelWidth = newYAxisLabelWidth;
    this.draw();
  }
  updateXAxisLabelHeight(newXAxisLabelHeight) {
    if (typeof newXAxisLabelHeight !== "number") {
      throw new Error("Invalid x axis label height: Expected a number");
    }
    this.#config.xAxisLabelHeight = newXAxisLabelHeight;
    this.draw();
  }
  updateBarGap(newBarGap) {
    if (typeof newBarGap !== "number") {
      throw new Error("Invalid bar gap: Expected a number");
    }
    this.#config.barGap = newBarGap;
    this.draw();
  }
  toggleGrid(showGrid) {
    if (typeof showGrid !== "boolean") {
      throw new Error("Invalid value: Expected a boolean");
    }
    this.#config.showGrid = showGrid;
    this.draw();
  }
}

// src/module/charts/PieChart.js
class PieChart {
  #ctx;
  #data;
  #colors;
  #labels;
  #config;
  constructor(ctx, config = {}) {
    this.#ctx = ctx;
    this.#data = config.data || [1];
    this.#colors = config.colors;
    this.#labels = config.labels;
    this.#config = {
      font: config.font || "12px Arial",
      legendBoxSize: config.legendBoxSize || 15,
      legendSpacing: config.legendSpacing || 5
    };
  }
  draw() {
    this.#drawLegend();
    const total = this.#data.reduce((acc, value) => acc + value, 0);
    let startAngle = 0;
    this.#data.forEach((dataPoint, i) => {
      this.#drawSlice(startAngle, dataPoint, total, i);
      startAngle += dataPoint / total * 2 * Math.PI;
    });
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
    this.#ctx.font = this.#config.font;
    this.#ctx.textAlign = "center";
    this.#ctx.textBaseline = "middle";
    this.#ctx.fillText(`${(dataPoint / total * 100).toFixed(2)}%`, labelX, labelY);
  }
  #drawLegend() {
    const totalLegendHeight = this.#colors.length * (this.#config.legendBoxSize + this.#config.legendSpacing);
    const legendX = this.#ctx.canvas.width * 0.08;
    const legendY = (this.#ctx.canvas.height - totalLegendHeight) / 2;
    this.#ctx.clearRect(legendX - this.#config.legendSpacing, legendY - this.#config.legendSpacing, this.#ctx.canvas.width * 0.4, totalLegendHeight + this.#config.legendSpacing * 2);
    this.#ctx.font = this.#config.font;
    this.#ctx.textAlign = "left";
    this.#ctx.textBaseline = "top";
    this.#colors.forEach((color, index) => {
      this.#ctx.fillStyle = color;
      this.#ctx.fillRect(legendX, legendY + index * (this.#config.legendBoxSize + this.#config.legendSpacing), this.#config.legendBoxSize, this.#config.legendBoxSize);
      this.#ctx.fillStyle = "black";
      this.#ctx.fillText(this.#labels[index], legendX + this.#config.legendBoxSize + this.#config.legendSpacing, legendY + index * (this.#config.legendBoxSize + this.#config.legendSpacing));
    });
  }
  updateData(newData) {
    if (!Array.isArray(newData) || !newData.every((item) => typeof item === "number")) {
      throw new Error("Invalid data: Expected an array of numbers");
    }
    this.#data = newData;
    this.draw();
  }
  updateLegendLabels(newLabels) {
    if (!Array.isArray(newLabels) || !newLabels.every((label) => typeof label === "string")) {
      throw new Error("Invalid labels: Expected an array of strings");
    }
    this.#labels = newLabels;
    this.draw();
  }
  updateColors(newColors) {
    if (!Array.isArray(newColors) || !newColors.every((color) => typeof color === "string")) {
      throw new Error("Invalid colors: Expected an array of strings");
    }
    this.#colors = newColors;
    this.draw();
  }
  updateConfig(newConfig) {
    if (!newConfig || typeof newConfig !== "object") {
      throw new Error("Invalid config: Expected an object.");
    }
    this.#config = { ...this.#config, ...newConfig };
    this.draw();
  }
}

// src/module/main/MyChart.js
class MyChart {
  #ctx;
  #config;
  constructor(ctx, config) {
    this.#ctx = ctx;
    this.#config = config;
  }
  init() {
    if (this.#config.type === "bar") {
      const barChartInstance = new BarChart(this.#ctx, {
        data: this.#config.data,
        color: this.#config.color,
        labels: this.#config.labels
      });
      return barChartInstance;
    }
    if (this.#config.type === "pie") {
      const pieChartInstance = new PieChart(this.#ctx, {
        data: this.#config.data,
        labels: this.#config.labels,
        colors: this.#config.colors
      });
      return pieChartInstance;
    }
    return null;
  }
}
export {
  MyChart
};

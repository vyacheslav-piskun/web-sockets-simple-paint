class Shape {
  constructor(start) {
    this.start = start;
    this.end = start;
  }

  setEnd(end) {
    this.end = end;
  }

  draw() {}
}

class Line extends Shape {
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }
}

class Rectangle extends Shape {
  draw(ctx) {
    const width = this.end.x - this.start.x;
    const height = this.end.y - this.start.y;
    ctx.strokeRect(this.start.x, this.start.y, width, height);
  }
}

class Oval extends Shape {
  draw(ctx) {
    const radiusX = (this.end.x - this.start.x) / 2;
    const radiusY = (this.end.y - this.start.y) / 2;
    const centerX = this.start.x + radiusX;
    const centerY = this.start.y + radiusY;

    ctx.beginPath();
    ctx.ellipse(
      centerX,
      centerY,
      Math.abs(radiusX),
      Math.abs(radiusY),
      0,
      0,
      2 * Math.PI,
    );
    ctx.stroke();
  }
}

const shapeConstructors = {
  line: Line,
  rectangle: Rectangle,
  oval: Oval,
};

export default shapeConstructors;

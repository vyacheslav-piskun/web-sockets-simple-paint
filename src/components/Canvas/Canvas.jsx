import { useEffect, useRef, useState } from "react";
import styles from './Canvas.module.css';

class Shape {
	constructor(start) {
		this.start = start;
		this.end = start;
	}

	setEnd(end) {
		this.end = end;
	}

	draw(ctx) {}
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
		ctx.ellipse(centerX, centerY, Math.abs(radiusX), Math.abs(radiusY), 0, 0, 2 * Math.PI);
		ctx.stroke();
	}
}

const shapeConstructors = {
	line: Line,
	rectangle: Rectangle,
	oval: Oval,
};

const Canvas = ({
	shapeType,
	clearingCanvas,
	setClearingCanvas
}) => {
	const [ctx, setCtx] = useState(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [currentShape, setCurrentShape] = useState(null);
	const [shapes, setShapes] = useState([]);
	const canvasRef = useRef(null);

	console.log(shapes)

	useEffect(() => {
		const canvas = canvasRef.current;
		setCtx(canvas.getContext('2d'));
	}, []);

	const handleCanvasClick = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const clickPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };

		if (!isDrawing) {
			const ShapeConstructor = shapeConstructors[shapeType];
			const newShape = new ShapeConstructor(clickPoint);
			setCurrentShape(newShape);
			setIsDrawing(true);
		} else {
			setIsDrawing(false);
			currentShape.setEnd(clickPoint);
			setShapes([...shapes, currentShape]);
			setCurrentShape(null);
		}
	};

	const handleMouseMove = (e) => {
		if (!isDrawing) return;
		const rect = canvasRef.current.getBoundingClientRect();
		const newPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		currentShape.setEnd(newPoint);

		if (ctx) {
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			shapes.forEach(shape => shape.draw(ctx));
			currentShape.draw(ctx);
		}
	};

	useEffect(() => {
		if(clearingCanvas) {
			setIsDrawing(false);
			setShapes([])
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			setClearingCanvas(false);
		}
	}, [ctx, clearingCanvas]);

	return (
		<div className={styles.wrapper}>
			<canvas
				width={800}
				height={600}
				ref={canvasRef}
				className={styles.canvas}
				onClick={handleCanvasClick}
				onMouseMove={handleMouseMove}
			/>
		</div>
	);
};

export default Canvas;

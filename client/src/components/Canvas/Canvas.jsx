import {useClickAway} from "react-use";
import {useCallback, useEffect, useRef, useState} from "react";

import shapeConstructors from "../../classes";

import styles from './Canvas.module.css';

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

	useEffect(() => {
		const canvas = canvasRef.current;
		setCtx(canvas.getContext('2d'));
	}, []);

	const handleMouseDown = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		const clickPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		const ShapeConstructor = shapeConstructors[shapeType];
		const newShape = new ShapeConstructor(clickPoint);
		setCurrentShape(newShape);
		setIsDrawing(true);
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

	const handleMouseUp = useCallback( () => {
		if (!isDrawing) return;
		setIsDrawing(false);
		setShapes([...shapes, currentShape]);
		setCurrentShape(null);
	}, [isDrawing, currentShape]);

	useEffect(() => {
		if (clearingCanvas) {
			setIsDrawing(false);
			setShapes([]);
			ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			setClearingCanvas(false);
		}
	}, [ctx, clearingCanvas]);

	useClickAway(canvasRef,() => {
		handleMouseUp();
	}, ["mouseup"])

	return (
		<div className={styles.wrapper}>
			<canvas
				width={800}
				height={600}
				ref={canvasRef}
				className={styles.canvas}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			/>
		</div>
	);
};

export default Canvas;

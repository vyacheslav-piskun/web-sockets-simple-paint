import {useState} from "react";

import Header from "../Header";
import Canvas from "../Canvas";

import styles from './App.module.css';

const App = () => {
	const [shapeType, setShapeType] = useState('line')
	const [clearingCanvas, setClearingCanvas] = useState(false)

	return (
		<div className={styles.wrapper}>
			<Header
				setClearingCanvas={setClearingCanvas}
				setShapeType={setShapeType}
				shapeType={shapeType}
			/>
			<Canvas
				shapeType={shapeType}
				setClearingCanvas={setClearingCanvas}
				clearingCanvas={clearingCanvas}
			/>
		</div>
	);
};

export default App;

import {useRef} from "react";

import styles from './Canvas.module.css';

const Canvas = () => {
	const ref = useRef(null);

	return (
		<div className={styles.wrapper}>
			<canvas width={800} height={600} ref={ref} className={styles.canvas}/>
		</div>
	);
};

export default Canvas;

import cx from 'classnames';

import styles from './Header.module.css';

const Header = ({ setShapeType, shapeType, setClearingCanvas }) => {
	return (
		<div className={styles.header}>
			<div className={styles.block}>
				<button
					type="button"
					onClick={() => {setShapeType('line')}}
					className={cx(styles.button, {
						[styles.active]: shapeType ==='line'
					})}
				>
					line
				</button>
				<button
					type="button"
					onClick={() => {setShapeType('rectangle')}}
					className={cx(styles.button, {
						[styles.active]: shapeType ==='rectangle'
					})}
				>
					rect
				</button>
				<button
					type="button"
					onClick={() => {setShapeType('oval')}}
					className={cx(styles.button, {
						[styles.active]: shapeType ==='oval'
					})}
				>
					oval
				</button>
			</div>
			<div className={styles.block}>
				<button  onClick={() => {setClearingCanvas(true)}} type="button" className={styles.button}>reset</button>
			</div>
		</div>
	);
};

export default Header;
import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.header}>
			<div className={styles.block}>
				<button type="button" className={styles.button}>line</button>
				<button type="button" className={styles.button}>block</button>
			</div>
			<div className={styles.block}>
				<button type="button" className={styles.button}>save</button>
			</div>
		</div>
	);
};

export default Header;
import Header from "../Header";
import Canvas from "../Canvas";

import styles from './App.module.css';

const App = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<Canvas />
		</div>
	);
};

export default App;

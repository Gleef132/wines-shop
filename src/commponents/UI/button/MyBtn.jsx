import React from 'react';
import classes from './MyBtn.module.scss';

const MyBtn = (props) => {
	return (
		<button {...props} className={classes.btn}>
			{props.children}
		</button>
	);
};

export default MyBtn;
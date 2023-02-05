import React from 'react';
import classes from './MyInput.module.scss'

const MyInput = (props, className) => {
	return (
		<input {...props} className={`${classes.input} ${className}`} />
	);
};

export default MyInput;
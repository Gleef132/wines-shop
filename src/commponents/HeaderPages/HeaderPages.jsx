import React from 'react';
import { ReactComponent as ArrowSvg } from '../../assets/img/chevron-forward-outline.svg';
import classes from './HeaderPages.module.scss'

const HeaderPages = ({ cl, children }) => {
	return (
		<div>
			<div className={`${classes.pages__header} ${cl}`}>
				<h1>{children}</h1>
				<ArrowSvg />
			</div>
		</div>
	);
};

export default HeaderPages;
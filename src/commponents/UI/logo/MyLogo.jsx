import React from 'react';
import logo from '../../../assets/img/wine-logo.jpg'
import { Link } from 'react-router-dom';

const MyLogo = (props) => {
	return (
		<Link to='/' {...props}>
			<img src={logo} alt="" />
		</Link>
	);
};

export default MyLogo;
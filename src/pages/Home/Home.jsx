import React, { useState, useEffect } from 'react';
import About from './About Us/About'
import Promotion from './Promotion/Promotion'
import HomeMain from './Main/HomeMain';

const Home = () => {
	function scrollToPage() {
		setTimeout(() => {
			document.querySelector('#home').scrollIntoView(true)
		}, 1);
	}
	useEffect(() => {
		scrollToPage()
	}, [])
	return (
		<div>
			<HomeMain />
			<About />
			<Promotion />
		</div>
	);
};

export default Home;
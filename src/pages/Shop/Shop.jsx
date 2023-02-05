import React, { useEffect } from 'react';
import ShopMain from './Main/ShopMain';

const Shop = () => {
	function scrollToPage() {
		setTimeout(() => {
			document.querySelector('#shop').scrollIntoView(true)
		}, 1);
	}
	useEffect(() => {
		scrollToPage()
	}, [])
	return (
		<div>
			<ShopMain
			/>
		</div>
	);
};

export default Shop;
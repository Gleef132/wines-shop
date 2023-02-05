import React, { useState, useEffect } from 'react';
import cl from './Promotion.module.scss'
import ProductList from '../../../commponents/ProductItems/ProductList'
import axios from 'axios';

const Promotion = (props) => {
	const [wines, setWines] = useState([])

	async function fetchApi() {
		const response = await axios.get('https://6276472dbc9e46be1a151e2e.mockapi.io/specialWine')
		setWines(response.data)
	}
	useEffect(() => {
		fetchApi()
	}, [])
	return (
		<div className={cl.special}>
			<div className={`${cl.special__container} ${"_container"}`}>
				<div className={cl.special__content}>
					<h1 className={`${"title"} ${cl.special__title}`}>
						<span>BE OUR GUEST</span>
						Wines of the Week Specialss for You
					</h1>
					<ProductList props={wines} filterCotegoriesActive={'All'} minPrice={'0'} maxPrice={'250'} />
				</div>
			</div>
		</div>
	);
};

export default Promotion;
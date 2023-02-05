import React from 'react';
import ProductLink from './ProductLink.jsx';
import cl from '../../pages/Home/Promotion/Promotion.module.scss'

const ProductList = ({ props, filterCotegoriesActive, minPrice, maxPrice }) => {

	return (
		<div className={cl.special__list}>
			{props.map(item =>
				<ProductLink props={item} key={item.id} filterCotegoriesActive={filterCotegoriesActive} minPrice={minPrice} maxPrice={maxPrice}
				/>
			)}
		</div>
	);
};

export default ProductList;

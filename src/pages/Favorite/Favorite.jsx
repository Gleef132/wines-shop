import React from 'react';
import cl from './Favorite.module.scss'
import HeaderPages from '../../commponents/HeaderPages/HeaderPages'
import ProductList from '../../commponents/ProductItems/ProductList';
import { useSelector } from 'react-redux';

const Favorite = () => {
	const favorite = useSelector(state => state.favorite.favorite)
	return (
		<div className={cl.favorite}>
			<HeaderPages children={'Favorite'} />
			<div className={`${cl.favorite__container} _container`}>
				<div className={favorite.length > 0 ? `${cl.favorite__zero} ${cl.active}` : `${cl.favorite__zero}`}>No produts in the favorite</div>
				<div className={cl.favorite__content}>
					<ProductList props={favorite} filterCotegoriesActive={'All'} minPrice={'0'} maxPrice={'250'} />
				</div>
			</div>
		</div>
	);
};

export default Favorite;
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Rating from '../UI/rating/rating';
import cl from '../../pages/Home/Promotion/Promotion.module.scss'
import { Link } from 'react-router-dom';
import { ReactComponent as CardIcon1 } from '../../assets/img/heart-outline.svg';
import { ReactComponent as CardIcon2 } from '../../assets/img/cart-outline.svg';
import { ReactComponent as CardIcon3 } from '../../assets/img/arrow-forward-outline.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addCartAction, removeCartAction } from '../../store/cartReducer';
import { addFavoriteAction, removeFavoriteAction } from '../../store/favoriteReducer';

const ProductLink = ({ props }) => {
	const item = props
	const [ratingWidth, setRatingWidth] = useState('100%')
	const [activeCart, setActiveCart] = useState('false')
	const [activeFavorite, setActiveFavorite] = useState('false')
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart.cart)
	const favorite = useSelector(state => state.favorite.favorite)

	function checkCartActive() {
		if (cart.length !== 0) {
			for (let i = 0; i < cart.length; i++) {
				const element = cart[i];
				if (element.id === props.id) {
					setActiveCart('true')
					break
				} else {
					setActiveCart('false')
				}
			}
		} else {
			setActiveCart('false')
		}
	}
	function checkFavoriteActive() {
		if (favorite.length !== 0) {
			for (let i = 0; i < favorite.length; i++) {
				const element = favorite[i];
				if (element.id === props.id) {
					setActiveFavorite('true')
					break
				} else {
					setActiveFavorite('false')
				}
			}
		} else {
			setActiveFavorite('false')
		}
	}

	function itemCartFn(img, name, price, amount, id) {
		const product = {
			img,
			name,
			price,
			amount,
			id,
			'a': 'a,'
		}
		let cartId = cart.map(item => item.id)
		if (cart.length !== 0) {
			if (cartId.indexOf(props.id) === -1) {
				dispatch(addCartAction(product))
			} else {
				dispatch(removeCartAction(product))
			}
		} else {
			dispatch(addCartAction(product))
		}
	}
	function itemFavoriteFn(item) {
		const product = item;
		let favoriteId = favorite.map(item => item.id)
		if (favorite.length !== 0) {
			if (favoriteId.indexOf(props.id) === -1) {
				dispatch(addFavoriteAction(product))
			} else {
				dispatch(removeFavoriteAction(product))
			}
		} else {
			dispatch(addFavoriteAction(product))
		}
	}

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
		checkCartActive()
	}, [cart])
	useEffect(() => {
		localStorage.setItem('favorite', JSON.stringify(favorite))
		checkFavoriteActive()
	}, [favorite])
	useEffect(() => {
		let width = props.rating * 20;
		setRatingWidth(width);
	}, []);

	return (
		<div className={`${cl.special__link}`}>
			<div className={cl.special__link__hover}>
				<span></span>
				<Link to={'/product/' + props.id}>
					<img src={props.img} alt=""
					/>
				</Link>
				<div className={cl.special__link__icons}>
					<div className={activeFavorite === "true" ? `${cl.special__link__icon} ${cl.active}` : `${cl.special__link__icon}`} onClick={() => itemFavoriteFn(item)}>
						<CardIcon1 />
					</div>
					<div className={activeCart === 'true' ? `${cl.special__link__icon} ${cl.active}` : `${cl.special__link__icon}`} onClick={() => itemCartFn(item.img, item.name, item.price, 1, item.id)}>
						<CardIcon2 />
					</div>
					<div className={cl.special__link__icon} >
						<Link to={'/product' + '/' + props.id}>
							<CardIcon3 />
						</Link>
					</div>
				</div>
			</div>
			<div className={cl.special__link__discription}>
				<div className={cl.special__link__text}>
					{props.property}
				</div>
				<Link to={'/product' + '/' + props.id} className={cl.link}>
					<div className={cl.special__link__title}
					>
						{props.name}
					</div>
				</Link>
				{props.specialPrice ?
					<div className={cl.special__link__price}>
						<s>{props.price}</s> {props.specialPrice}
					</div>
					:
					<div className={cl.special__link__price}>
						{props.price}
					</div>
				}
				<div className={cl.special__link__ratings}>
					<Rating cl={cl.special__link__rating} ratingWidth={ratingWidth} />
				</div>
			</div>
		</div >
	);
};

export default ProductLink;
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import cl from './ShopProduct.module.scss'
import Rating from '../../commponents/UI/rating/rating';
import { ReactComponent as ArrowSvg } from '../../assets/img/chevron-forward-outline.svg';
import { ReactComponent as HeartIcon } from '../../assets/img/heart-outline.svg';
import { ReactComponent as CartIcon } from '../../assets/img/cart-outline.svg';
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from '../../http/productApi'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addCartAction, removeCartAction } from '../../store/cartReducer';
import { addFavoriteAction, removeFavoriteAction } from '../../store/favoriteReducer';

const ShopProduct = () => {
	const [product, setProduct] = useState({ description: [], type: 'clown,clown', commends: [], })
	const [commend, setCommend] = useState({ img: 'https://secure.gravatar.com/avatar/2d2ea664d9e9154368242af228b36fba?s=60&d=mm&r=g', name: '', time: '', text: '', rating: '' })
	const [tabActive, setTabActive] = useState('description')
	const [fetchGet, setFetchGet] = useState(false)
	const [ratingWidth, setRatingWidth] = useState('100%')
	const [currentImg, setCurrentImg] = useState('')
	const [activeCart, setActiveCart] = useState('false')
	const [activeFavorite, setActiveFavorite] = useState('false')
	const [fetchPostReady, setFetchPostReady] = useState(false)
	const [valueInput, setValueInput] = useState({ value_1: '', value_2: false, value_3: '', })
	const { id } = useParams()
	const cart = useSelector(state => state.cart.cart)
	const favorite = useSelector(state => state.favorite.favorite)
	const dispatch = useDispatch()


	let cotegories = product.type.split(',');

	useEffect(() => {
		let width = product.rating * 20;
		setRatingWidth(width);
		fetchOneProduct(id).then(data => {
			setProduct(data)
			setCurrentImg(data.imgOne)
		})
		cotegories = product.type.split(',')
	}, [fetchGet]);

	function slideImg(img) {
		setCurrentImg(img)
	}

	function ratingSubmit(rating) {
		setCommend({ ...commend, rating: rating })
	}

	async function fetchPost(product, id, e) {
		e.preventDefault()
		if (commend.name && commend.text && commend.rating !== '') {
			let date = new Date()
			let month = date.toLocaleString('en', { month: 'long', })
			let day = date.getDate()
			let year = date.getFullYear()
			const item = { ...product }
			item.commends = [...item.commends, { ...commend, time: `${month} ${day},${year}` }]
			const response = await axios.put('https://6276472dbc9e46be1a151e2e.mockapi.io/Wines/' + id, item)
			setFetchGet(!fetchGet)
			setFetchPostReady(false)
			setValueInput({ value_1: '', value_2: !valueInput.value_2, value_3: '' })
		} else {
			setFetchPostReady(true)
		}
	}

	function checkCartActive() {
		if (cart.length !== 0) {
			for (let i = 0; i < cart.length; i++) {
				const element = cart[i];
				if (element.id === id) {
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
				if (element.id === id) {
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
			id
		}
		let cartId = cart.map(item => item.id)
		if (cart.length !== 0) {
			if (cartId.indexOf(id) === -1) {
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
			if (favoriteId.indexOf(id) === -1) {
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
		checkCartActive()
		checkFavoriteActive()

		document.querySelector('#shop-product').scrollIntoView({ block: "start", behavior: "smooth" })
	}, [])

	return (
		<div className={cl.product}>
			<div className={cl.product__header}>
				<h1>Shop</h1>
				<ArrowSvg />
			</div>
			<div className={cl.product__container} id="shop-product">
				<div className={cl.product__top}>
					<div className={cl.product__gallery}>
						<div className={cl.product__img__controls}>
							<div className={cl.product__img__control}
								onClick={() => slideImg(product.imgOne)}
							>
								<img src={product.imgOne} alt="" />
							</div>
							<div className={cl.product__img__control}
								onClick={() => slideImg(product.imgTwo)}
							>
								<img src={product.imgTwo} alt="" />
							</div>
							<div className={cl.product__img__control}
								onClick={() => slideImg(product.imgThree)}
							>
								<img src={product.imgThree} alt="" />
							</div>
						</div>
						<div className={cl.product__main__img}>
							<CartIcon className={activeCart === 'true' ? `${cl.product__main__icon} ${cl.active}` : `${cl.product__main__icon}`}
								onClick={() => itemCartFn(product.img, product.name, product.price, 1, product.id)} />
							<img src={currentImg} alt="" />
							<HeartIcon className={activeFavorite === 'true' ? `${cl.product__main__icon} ${cl.active}` : `${cl.product__main__icon}`}
								onClick={() => itemFavoriteFn(product)} />
						</div>
					</div>
					<div className={cl.product__content}>
						<h1 className={cl.product__title}>{product.name}</h1>
						<div className={cl.product__info}>
							<div className={cl.product__price}>{product.price}</div>
							<div className={cl.product__ratings}>
								<Rating cl={cl.product__rating} ratingWidth={ratingWidth} ratingSubmit={() => null} />
							</div>
						</div>
						<div className={cl.product__description}>
							<p>{product.description[0]}</p>
							<br />
							<p>{product.description[1]}</p>
						</div>
						<button className={cl.product__btn}>Buy now</button>
						{cotegories.length === 2 ? <div className={cl.product__category}>Category: <span>{cotegories[0]}</span>, <span>{cotegories[1]}</span></div> : <div className={cl.product__category}>Category: <span>{cotegories[0]}</span></div>}
					</div>
				</div>
				<div className={cl.product__bottom}>
					<nav className={cl.product__nav}>
						<ul className={cl.product__list}>
							<li className={tabActive === 'description' ? `${cl.product__link} ${cl.active}` : cl.product__link}
								onClick={() => setTabActive('description')}
							>DESCRIPRION</li>
							<li className={tabActive === 'reviews' ? `${cl.product__link} ${cl.active}` : cl.product__link}
								onClick={() => setTabActive('reviews')}
							>REVIEWS</li>
						</ul>
					</nav>
					<div className={cl.product__tabs}>
						<div className={tabActive === 'description' ? `${cl.product__tab} ${cl.active}` : cl.product__tab}>{product.description[2]}</div>
						<div className={tabActive === 'reviews' ? `${cl.product__tab} ${cl.active}` : cl.product__tab}>
							<div className={cl.product__reviews}>
								<div className={cl.product__commends}>
									{product.commends.map((item, index) => {
										return <div className={cl.product__commend} key={index}>
											<img src={item.img} alt="" className={cl.product__commend__img} />
											<div className={cl.product__commend__content}>
												<div className={cl.product__commend__name}>{item.name}
													<span> – {item.time}</span>
												</div>
												<div className={cl.product__commend__text}>{item.text}
												</div>
												<div className={cl.product__commend__ratings}>
													<Rating cl={cl.product__commend__rating} ratingWidth={'' + item.rating * 20} ratingSubmit={() => null} />
												</div>
											</div>
										</div>
									})}
								</div>
								<form action="#" type='post' className={cl.product__review__form}>
									<h1 className={cl.product__review__form__title}>Add a review</h1>
									<div className={cl.product__review__form__item}>
										<h1 className={cl.product__review__form__name}>Name</h1>
										<input required type="text" className={cl.product__review__form__input} value={valueInput.value_1}
											onChange={(e) => {
												setCommend({ ...commend, name: e.target.value })
												setValueInput({ ...valueInput, value_1: e.target.value })
											}
											}
										/>
									</div>
									<div className={cl.product__review__form__item}>
										<h1 className={cl.product__review__form__name}>Rating</h1>
										<div className={cl.product__review__ratings}>
											<Rating cl={cl.product__review__rating} ratingWidth={'100%'} ratingSubmit={ratingSubmit} ratingCheckSubmit={valueInput.value_2} />
										</div>
									</div>
									<div className={cl.product__review__form__item}>
										<h1 className={cl.product__review__form__name}>Review</h1>
										<textarea required name="#" id="" cols="30" rows="10" className={cl.product__review__form__text} value={valueInput.value_3}
											onChange={(e) => {
												setCommend({ ...commend, text: e.target.value })
												setValueInput({ ...valueInput, value_3: e.target.value })
											}
											}
										/>
									</div>
									<div className={cl.product__review__form__item}>
										<button type='submit' className={fetchPostReady ? `${cl.product__review__btn} ${cl.required}` : `${cl.product__review__btn}`}
											onClick={(e) => fetchPost(product, id, e)}
										>Submit</button>
										<div className={fetchPostReady ? `${cl.product__review__form__required} ${cl.active}` : `${cl.product__review__form__required}`}>Заполните все поля!</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};

export default ShopProduct;

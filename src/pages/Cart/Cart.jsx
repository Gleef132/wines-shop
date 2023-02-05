import React, { useEffect, useState } from 'react';
import cl from './Cart.module.scss'
import HeaderPages from '../../commponents/HeaderPages/HeaderPages';
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/img/chevron-forward-outline.svg'
import { useDispatch, useSelector } from 'react-redux';
import { decrementAmountCartAction, incrementAmountCartAction, removeCartAction } from '../../store/cartReducer';

const Cart = () => {
	const [totalPrice, setTotalPrice] = useState('')
	const cart = useSelector(state => state.cart.cart)
	const dispatch = useDispatch()

	function incrementAmount(product) {
		dispatch(incrementAmountCartAction(product))
	}
	function decrementorAmount(product) {
		dispatch(decrementAmountCartAction(product))
	}
	function removeProduct(product) {
		dispatch(removeCartAction(product))
	}

	useEffect(() => {
		let price = 0;
		cart.forEach(item => {
			price += item.price.replace(/[$,'.00']/gi, '') * item.amount
		})
		setTotalPrice(price)
	}, [cart])

	return (
		<div className={cl.cart}>
			<HeaderPages children={'Cart'} />
			<div className={`${cl.cart__container} _container`}>
				{cart.length > 0 ?
					<div className={cl.cart__content}>
						<div className={cl.cart__products}>
							<div className={cl.cart__products__header}>
								<h2 className={cl.cart__products__header__title}>Product</h2>
								<h2 className={cl.cart__products__header__title}>Price</h2>
								<h2 className={cl.cart__products__header__title}>Amount</h2>
								<h2 className={cl.cart__products__header__title}>Subtotal</h2>
								<h2 className={cl.cart__products__header__title}>Remove</h2>
							</div>
							<div className={cl.cart__product__list}>
								{cart.map(item => {
									let subtotalPrice = 0;
									subtotalPrice += item.price.replace(/[$,'.00']/gi, '') * item.amount
									return <div className={cl.cart__product__link} key={item.id}>
										<div className={cl.cart__product__content}>
											<div className={cl.cart__product__name}>
												<div className={cl.cart__product__img}>
													<img src={item.img} alt="" />
												</div>
												<h2>{item.name}</h2>
											</div>
											<div className={cl.cart__product__price}>{item.price}</div>
											<div className={cl.cart__product__amount}>
												<span>{item.amount}</span>
												<div className={cl.cart__product__amount__arrow}>
													<Arrow
														onClick={() => incrementAmount(item)}
													/>
													<Arrow
														onClick={() => decrementorAmount(item)}
													/>
												</div>
											</div>
											<div className={cl.cart__product__price}>${subtotalPrice}</div>
											<div className={cl.cart__product__remove}
												onClick={() => removeProduct(item)}
											></div>
										</div>
										<div className={cl.cart__product__mobile}>
											<div className={cl.cart__product__mobile__link}>
												<span>Product:</span>
												<div className={cl.cart__product__remove}
													onClick={() => removeProduct(item)}
												></div>
											</div>
											<div className={cl.cart__product__mobile__link}>
												<div className={cl.cart__product__name}>
													<div className={cl.cart__product__img}>
														<img src={item.img} alt="" />
													</div>
													<span>{item.name}</span>
												</div>
											</div>
											<div className={cl.cart__product__mobile__link}>
												<span>Price:</span>
												<div className={cl.cart__product__price}>{item.price}</div>
											</div>
											<div className={cl.cart__product__mobile__link}>
												<span>Amount</span>
												<div className={cl.cart__product__amount}>
													<span>{item.amount}</span>
													<div className={cl.cart__product__amount__arrow}>
														<Arrow
															onClick={() => incrementAmount(item)}
														/>
														<Arrow
															onClick={() => decrementorAmount(item)}
														/>
													</div>
												</div>
											</div>
											<div className={cl.cart__product__mobile__link}>
												<span>Subtotal</span>
												<div className={cl.cart__product__price}>${subtotalPrice}</div>
											</div>
										</div>
									</div>
								})}
							</div>
						</div>
						<div className={cl.cart__total}>
							<h2 className={cl.cart__total__title}>Cart totals</h2>
							<div className={cl.cart__total__item}>
								<div className={cl.cart__total__item__title}>Total</div>
								<div className={cl.cart__total__item__price}>${totalPrice}</div>
							</div>
							<Link to={'/checkout'}><button className={cl.cart__total__btn}>Procced to checkout</button>
							</Link>
						</div>
					</div>
					:
					<div style={{ fontSize: '25px', textAlign: 'center', paddingTop: '100px' }}>No produts in the cart
					</div>
				}
			</div>
		</div >
	);
};

export default Cart;
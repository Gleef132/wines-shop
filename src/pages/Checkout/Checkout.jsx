import React, { useEffect, useState } from 'react';
import cl from './Checkout.module.scss'
import HeaderPages from '../../commponents/HeaderPages/HeaderPages';
import { useSelector } from 'react-redux';
import { ReactComponent as ArrowSvg } from '../../assets/img/chevron-forward-outline.svg';

const Chechout = () => {
	const cart = useSelector(state => state.cart.cart)
	const [totalPrice, setTotalPrice] = useState(0)
	const [activeTextPayment, setActiveTextPayment] = useState('1')
	const [selectText, setSelectText] = useState('Choose a country/region')
	const [selectActive, setSelectActive] = useState(false)
	useEffect(() => {
		let price = 0;
		cart.forEach(item => {
			price += item.price.replace(/[$]/gi, '') * item.amount
		})
		setTotalPrice(price)
	}, [cart])
	return (
		<div className={cl.checkout}>
			<HeaderPages children={'Checkout'} />
			<div className={`${cl.checkout__container} _container`}>
				{cart.length > 0 ?
					<div className={cl.checkout__content}>
						<form className={cl.checkout__form} id='data'>
							<h1 className={cl.checkout__title}>Billing details</h1>
							<div className={cl.checkout__form__item}>
								<div>
									<h2 className={cl.checkout__form__subtitle}>First Name <span>*</span></h2>
									<input type="text" required />
								</div>
								<div>
									<h2 className={cl.checkout__form__subtitle}>Last Name <span>*</span></h2>
									<input type="text" required />
								</div>
							</div>
							<div className={cl.checkout__form__item}>
								<h2 className={cl.checkout__form__subtitle}>Company name (optional)</h2>
								<input type="text" />
							</div>
							<div className={cl.checkout__form__item}>
								<h2 className={cl.checkout__form__subtitle}>Country / Region <span>*</span></h2>
								<div className={cl.checkout__select__open}
									onClick={() => setSelectActive(!selectActive)}
								>
									{selectText} <span><ArrowSvg /></span>
								</div>
								<div className={selectActive ? `${cl.checkout__select} ${cl.active}` : `${cl.checkout__select}`}>
									<ul className={cl.checkout__select__list}>
										<li className={cl.checkout__select__link} onClick={(e) => {
											setSelectText(e.target.innerText)
										}}>Kyrgyzstan</li>
										<li className={cl.checkout__select__link} onClick={(e) => {
											setSelectText(e.target.innerText)
										}}>Kyrgyzstan</li>
										<li className={cl.checkout__select__link} onClick={(e) => {
											setSelectText(e.target.innerText)
										}}>Kyrgyzstan</li>
										<li className={cl.checkout__select__link} onClick={(e) => {
											setSelectText(e.target.innerText)
										}}>Kyrgyzstan</li>
									</ul>
								</div>
							</div>
							<div className={cl.checkout__form__item}>
								<h2 className={cl.checkout__form__subtitle}>Street address <span>*</span></h2>
								<input type="text" placeholder='House number and street name' required />
							</div>
							<div className={cl.checkout__form__item}>
								<input type="text" placeholder='Apartament, suite, unit, etc. (optional)' required />
							</div>
							<div className={cl.checkout__form__item}>
								<h2 className={cl.checkout__form__subtitle}>Town / City <span>*</span></h2>
								<input type="text" required />
							</div>
							<div className={cl.checkout__form__item}>
								<h2 className={cl.checkout__form__subtitle}>ZIP Code <span>*</span></h2>
								<input type="text" required />
							</div>
							<div className={cl.checkout__form__item}>
								<h2 className={cl.checkout__form__subtitle}>Phone <span>*</span></h2>
								<input type="text" required />
							</div>
							<div className={cl.checkout__form__item}>
								<h2 className={cl.checkout__form__subtitle}>Email address <span>*</span></h2>
								<input type="text" required />
							</div>
							<div className={cl.checkout__form__item}>
								<h1 className={cl.checkout__title}>Additional information</h1>
								<h2 className={cl.checkout__form__subtitle}>Order notes (optional)</h2>
								<textarea type="text" placeholder='Notes about your order, e.g. special notes for delivery.
'/>
							</div>
						</form>
						<div className={cl.checkout__results}>
							<div className={cl.checkout__order}>
								<h2 className={cl.checkout__title}>Your Order</h2>
								<div className={cl.checkout__order__content}>
									{cart.map(item => {
										let totalPrice = item.price.replace(/[$]/gi, '') * item.amount
										return <div key={item.id} className={cl.checkout__order__item}>{item.name} x {item.amount} <span>${totalPrice}</span></div>
									})}
									<div className={cl.checkout__order__item}>Total: <span>{totalPrice}$</span></div>
								</div>
							</div>
							<div className={cl.checkout__payment}>
								<h2 className={cl.checkout__title}>Payment</h2>
								<div className={cl.checkout__payment__content}>
									<label htmlFor='payment_metod_delivery' className={activeTextPayment === '1' ? `${cl.checkout__payment__item} ${cl.active}` : `${cl.checkout__payment__item}`}
										onClick={() => setActiveTextPayment('1')}
									>
										<input type="radio" name='payment_metod' id='payment_metod_delivery' defaultChecked />
										<p>Cash on delivery</p>
										<div className={cl.checkout__payment__item__text}>Pay with cash upon delivery.</div>
									</label>
									<label htmlFor='payment_metod_paypal' className={activeTextPayment === '2' ? `${cl.checkout__payment__item} ${cl.active}` : `${cl.checkout__payment__item}`}
										onClick={() => setActiveTextPayment('2')}
									>
										<input type="radio" name='payment_metod' id='payment_metod_paypal' />
										<p>PayPal</p>
										<img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="" />
										<a href="#">What is Paypal?</a>
										<div className={cl.checkout__payment__item__text}>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</div>
									</label>
									<label htmlFor='payment_metod_elegro' className={activeTextPayment === '3' ? `${cl.checkout__payment__item} ${cl.active}` : `${cl.checkout__payment__item}`}
										onClick={() => setActiveTextPayment('3')}
									>
										<input type="radio" name='payment_metod' id='payment_metod_elegro' />
										<p>elegro Crypto Payment</p>
										<img src="https://elegro-public.s3.eu-central-1.amazonaws.com/elegro_email_logo.png" alt="" />
										<div className={cl.checkout__payment__item__text}>Pay through the elegro Crypto Payment.</div>
									</label>
									<button type='submit' form='data' className={cl.checkout__btn}>
										Place order</button>
								</div>
							</div>
						</div>
					</div>
					:
					<div style={{ fontSize: '25px', textAlign: 'center', paddingTop: '100px' }}>No produts in the cart
					</div>
				}
			</div>
		</div>
	);
};

export default Chechout;
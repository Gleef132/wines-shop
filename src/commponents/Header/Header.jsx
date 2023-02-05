import React, { useState, useEffect } from 'react';
import cl from './Header.module.scss';
import MainSearch from '../Search/Search';
import SideBar from '../sideBar/SideBar';
import MyLogo from '../UI/logo/MyLogo';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ReactComponent as SocialIcon1 } from '../../assets/img/bag-outline.svg'
import { ReactComponent as SocialIcon2 } from '../../assets/img/search-outline.svg'
import { ReactComponent as SocialIcon3 } from '../../assets/img/apps-outline.svg'
import { ReactComponent as BurgerSocial1 } from '../../assets/img/logo-facebook.svg'
import { ReactComponent as BurgerSocial2 } from '../../assets/img/logo-twitter.svg'
import { ReactComponent as BurgerSocial3 } from '../../assets/img/logo-dribbble.svg'
import { ReactComponent as BurgerSocial4 } from '../../assets/img/logo-instagram.svg'
import { useSelector, useDispatch } from 'react-redux';
import { decrementAmountCartAction, incrementAmountCartAction, removeCartAction } from '../../store/cartReducer';


const Header = () => {

	const [menuActive, setMenuActive] = useState(false)
	const [headerFixed, setHeaderFixed] = useState(false)
	const [cartActive, setCartActive] = useState(false)
	const [cartTotalPrice, setCartTotalPrice] = useState('')
	const [sideBarActive, setSideBarActive] = useState(false)
	const [mainSearchActive, setMainSearchActive] = useState(false)
	const [mobileListActive, setMobileListActive] = useState(false)
	const [mobileShopListActive, setMobileShopListActive] = useState(false)
	const [pathProduct, setPathProduct] = useState(false)


	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart.cart)
	const { pathname } = useLocation()

	window.addEventListener('scroll', () => {
		if (window.scrollY > 0) {
			setHeaderFixed(true)
		} else {
			setHeaderFixed(false)
		}
	})
	const scrollToPageAbout = () => {

		setTimeout(() => {
			document.querySelector('#about').scrollIntoView(true)
		}, 100);
		menuActiveFn()
	}

	const scrollToPageHome = () => {

		setTimeout(() => {
			document.querySelector('#home').scrollIntoView(true)
		}, 100);
		menuActiveFn()
	}

	function itemCartRemove(product) {
		dispatch(removeCartAction(product))
	}

	function sideBarActiveFn() {
		setSideBarActive(!sideBarActive)
	}

	function mainSearchActiveFn() {
		setMainSearchActive(!mainSearchActive)
	}
	function menuActiveFn() {
		setMenuActive(!menuActive)
		setMobileListActive(false)
	}

	function showListShopLink() {
		setMobileListActive(true)
	}

	useEffect(() => {
		let price = 0;
		cart.forEach(item => {
			price += item.price.replace(/[$]/gi, '') * item.amount
		});
		setCartTotalPrice(price + '$')
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	useEffect(() => {
		if (window.innerWidth < 991) {
			setMobileShopListActive(true)
		}
		let arr = pathname.split('').filter((ch, i) => ch === '/')
		if (arr.length >= 2) {
			setPathProduct(true)
		} else {
			setPathProduct(false)
		}
	}, [pathname])

	window.addEventListener('scroll', () => {
		if (window.innerWidth < 991) {
			setMobileShopListActive(true)
		}
	})

	return (
		<header style={{ transition: '.4s' }} className={headerFixed ? `${cl.header} ${cl.active}` : `${cl.header}`}>
			<MainSearch props={mainSearchActive} mainSearchActiveFn={mainSearchActiveFn} />
			<SideBar props={sideBarActive} sideBarActiveFn={sideBarActiveFn} />
			<div className={'_container'}>
				<div className={cl.header__body}>
					<nav className={menuActive ? `${cl.menu} ${cl.active}` : `${cl.menu}`}>
						<div className={cl.header__burger__menu__top}>
							<MyLogo />
							<div className={cl.header__burger__menu__close}
								onClick={menuActiveFn}>
								Close
							</div>
						</div>
						<ul className={cl.menu__list}>
							<Link to='/' className={pathname === '/' ? `${cl.menu__link} ${cl.active}` : `${cl.menu__link}`}
								onClick={scrollToPageHome}
							>Home</Link>
							<Link to='/about' className={pathname === '/about' ? `${cl.menu__link} ${cl.active}` : `${cl.menu__link}`}
								onClick={scrollToPageAbout}
							>About Us</Link>
							<div className={mobileListActive ? `${cl.active}` : null}>
								<Link to="/shop" className={(pathname === '/shop') || (pathname === '/cart') || (pathname === '/favorite') || (pathname === '/checkout') || (pathProduct) ? `${cl.menu__link} ${cl.active}` : `${cl.menu__link}`}
									onClick={mobileShopListActive ? showListShopLink : null}
								>Shop
								</Link>
								<ul>
									<div className={cl.menu__list__shop__remove}
										onClick={() => setMobileListActive(false)}
									></div>
									<div >
										<Link to="/shop" className={(pathname === '/shop') || (pathname === '/cart') || (pathname === '/favorite') || (pathname === '/checkout') || (pathProduct) ? `${cl.active}` : null}
											onClick={menuActiveFn}
										><li>Shop</li></Link>
										<Link to="/cart" className={pathname === '/cart' ? `${cl.active}` : null}
											onClick={menuActiveFn}
										><li>Cart</li></Link>
										<Link to="/favorite" className={pathname === '/favorite' ? `${cl.active}` : null}
											onClick={menuActiveFn}
										><li>Favorite</li></Link>
										<Link to="/checkout" className={pathname === '/checkout' ? `${cl.active}` : null}
											onClick={menuActiveFn}
										><li>Checkout</li></Link>
									</div>
								</ul>
							</div>
							<Link to='/contact-us' className={pathname === '/contact-us' ? `${cl.menu__link} ${cl.active}` : `${cl.menu__link}`}
								onClick={menuActiveFn}
							>Conctact Us</Link>
						</ul>
						<div className={cl.header__burger__menu__bottom}>
							<div className={cl.header__burger__social}>
								<BurgerSocial1 />
							</div>
							<div className={cl.header__burger__social}>
								<BurgerSocial2 />
							</div>
							<div className={cl.header__burger__social}>
								<BurgerSocial3 />
							</div>
							<div className={cl.header__burger__social}>
								<BurgerSocial4 />
							</div>
						</div>
					</nav>
					<MyLogo className={`${cl.header__logo} ${'logo'}`} />
					<div className={cl.header__social}>
						<Link to={'/cart'}><div className={cl.header__cart}>
							<SocialIcon1 className={cl.header__social__item} />
							<div className={cl.header__cart__number}>{cart.length}</div>
						</div>
						</Link>
						<div className={cl.header__cart}

							onClick={() => setCartActive(!cartActive)}
						>
							<SocialIcon1 className={cl.header__social__item} />
							<div className={cl.header__cart__number}>{cart.length}</div>
							<div className={cartActive ? `${cl.header__cart__list} ${cl.active}` : `${cl.header__cart__list}`}
								onClick={(e) => e.stopPropagation()}
							>
								<div className={cl.header__cart__content}>
									<div className={cart.length > 0 ? `${cl.header__cart__top} ${cl.active}` : `${cl.header__cart__top}`}>
										{cart.map(item =>
											<div className={cl.header__cart__link} key={item.id}>
												<img src={item.img} alt='' className={cl.header__cart__img} />
												<div className={cl.header__cart__text}>
													<div className={cl.header__cart__name}>{item.name}</div>
													<div className={cl.header__cart__price}>{item.amount} x {item.price}</div>
													<div className={cl.header__cart__amounts}>
														<div className={cl.header__cart__amount}
															onClick={() => dispatch(decrementAmountCartAction(item))}
														>-</div>
														<div className={cl.header__cart__amount}
															onClick={() => dispatch(incrementAmountCartAction(item))}
														>+</div>
													</div>
												</div>
												<div className={cl.header__cart__remove}
													onClick={() => itemCartRemove(item)}
												/>
											</div>
										)}
									</div>
									<div className={cart.length > 0 ? `${cl.header__cart__bottom} ${cl.active}` : `${cl.header__cart__bottom}`}>
										<div className={cl.header__cart__totalPrice}>Total Price:   {cartTotalPrice}</div>
										<Link to={'/cart'}><button className={`${cl.header__cart__btn_1} ${cl.header__cart__btn} `}>View cart</button></Link>
										<Link to={'/checkout'}><button className={`${cl.header__cart__btn_2} ${cl.header__cart__btn} `}>Checkout</button></Link>
									</div>
									<div className={cart.length === 0 ? `${cl.header__cart__zero} ${cl.active}` : `${cl.header__cart__zero}`}>No products in the cart</div>
								</div>
							</div>
						</div>
						<SocialIcon2 className={cl.header__social__item}
							onClick={mainSearchActiveFn} />
						<SocialIcon3 className={cl.header__social__item} onClick={sideBarActiveFn} />
					</div>
					<div className={cl.header__burgerBlock}>
						<div className={menuActive ? `${cl.header__burger} ${cl.active}` : `${cl.header__burger}`} onClick={menuActiveFn}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</header >
	);
};

export default Header;
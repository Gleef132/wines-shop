import React from 'react';
import cl from './Footer.module.scss'
import MyLogo from '../UI/logo/MyLogo';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as LogoFacebook } from '../../assets/img/logo-facebook.svg'
import { ReactComponent as LogoTwitter } from '../../assets/img/logo-twitter.svg'
import { ReactComponent as LofoDribbble } from '../../assets/img/logo-dribbble.svg'
import { ReactComponent as LogoInstagram } from '../../assets/img/logo-instagram.svg'

const Footer = () => {

	const { pathname } = useLocation()

	if (pathname === '/admin') return null

	const scrollToPageAbout = () => {
		setTimeout(() => {
			document.querySelector('#about').scrollIntoView(true)
		}, 100);
	}

	const scrollToPageHome = () => {
		setTimeout(() => {
			document.querySelector('#home').scrollIntoView(true)
		}, 100);
	}
	return (
		<footer className={cl.footer}>
			<div className={`${cl.footer__container} ${'_container'}`}>
				<div className={cl.footer__content}>
					<MyLogo className={`${cl.footer__logo} ${'logo'}`} />
					<nav className={cl.footer__nav}>
						<ul className={cl.footer__list}>
							<Link to='/' className={pathname === '/' ? `${cl.footer__link} ${cl.active}` : `${cl.footer__link}`}
								onClick={scrollToPageHome}
							>Home</Link>
							<Link to='/about' className={pathname === '/about' ? `${cl.footer__link} ${cl.active}` : `${cl.footer__link}`}
								onClick={scrollToPageAbout}
							>About Us</Link>
							<div className="">
								<Link to="/shop" className={(pathname === '/shop') || (pathname === '/cart') || (pathname === '/favorite') || (pathname === '/checkout') ? `${cl.footer__link} ${cl.active}` : `${cl.footer__link}`}
								>Shop
								</Link>
								<ul >
									<Link to="/cart" className={pathname === '/cart' ? `${cl.active}` : null}
									><li>Cart</li></Link>
									<Link to="/favorite" className={pathname === '/favorite' ? `${cl.active}` : null}
									><li>Favorite</li></Link>
									<Link to="/checkout" className={pathname === '/checkout' ? `${cl.active}` : null}
									><li>Checkout</li></Link>
								</ul>
							</div>
							<Link to='/contact-us' className={pathname === '/contact-us' ? `${cl.footer__link} ${cl.active}` : `${cl.footer__link}`}
							>Conctact Us</Link>
						</ul>
					</nav >
					<div className={cl.footer__socials}>
						<a href='##' className={cl.footer__social}><LogoFacebook /></a>
						<a href='##' className={cl.footer__social}><LogoTwitter /></a>
						<a href='##' className={cl.footer__social}><LofoDribbble /></a>
						<a href='##' className={cl.footer__social}><LogoInstagram /></a>
					</div>
				</div >
				<div className={cl.footer__copyrait}><a href='##'>AncoraThemes</a> © 2022. All Rights Reserved.
				</div>
			</div >
		</footer >
	);
};

export default Footer;
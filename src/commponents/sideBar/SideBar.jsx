import React from 'react';
import MyLogo from '../UI/logo/MyLogo';
import cl from './SideBar.module.scss'

import { ReactComponent as SidebarSocial1 } from '../../assets/img/logo-facebook.svg'
import { ReactComponent as SidebarSocial2 } from '../../assets/img/logo-twitter.svg'
import { ReactComponent as SidebarSocial3 } from '../../assets/img/logo-dribbble.svg'
import { ReactComponent as SidebarSocial4 } from '../../assets/img/logo-instagram.svg'

const SideBar = ({ props, sideBarActiveFn }) => {
	return (
		<aside className={props ? `${cl.sidebar} ${cl.active}` : `${cl.sidebar}`}>
			<div className={cl.sidebar__header}>
				<MyLogo className={`${cl.sidebar__logo} ${'logo'}`} />
				<div className={cl.sidebar__close} onClick={sideBarActiveFn}></div>
			</div>
			<div className={cl.sidebar__content}>
				<div className={cl.sidebar__item}><SidebarSocial1 /> Facebook</div>
				<div className={cl.sidebar__item}><SidebarSocial2 /> Tweeter</div>
				<div className={cl.sidebar__item}><SidebarSocial3 /> Dribble</div>
				<div className={cl.sidebar__item}><SidebarSocial4 /> Instagram</div>
				<div className={cl.sidebar__item}>pishisuda@gmail.com</div>
			</div>
		</aside>
	);
};

export default SideBar;
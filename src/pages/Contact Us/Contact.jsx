import React from 'react';
import HeaderPages from '../../commponents/HeaderPages/HeaderPages';
import cl from './Contact.module.scss'
import { ReactComponent as LogoFacebook } from '../../assets/img/logo-facebook.svg'
import { ReactComponent as LogoTwitter } from '../../assets/img/logo-twitter.svg'
import { ReactComponent as LofoDribbble } from '../../assets/img/logo-dribbble.svg'
import { ReactComponent as LogoInstagram } from '../../assets/img/logo-instagram.svg'
import { ReactComponent as PlanePapper } from '../../assets/img/paper-plane-regular.svg'
import User from '../../assets/img/user.png'
import Email from '../../assets/img/email.png'
import Phone from '../../assets/img/phone-call.png'
import Information from '../../assets/img/information.png'
import Pencil from '../../assets/img/pencil.png'

const Contact = () => {
	return (
		<div className={cl.contact}>
			<HeaderPages children={'Contact Us'} />
			<div className={`${cl.contact__container}`}>
				<div className={cl.contact__content}>
					<div className={cl.contact__info}>
						<h2 className={cl.contact__info__title}>
							Contact Details
						</h2>
						<div className={cl.contact__info__item}>785 15h Street, Office 478 <br />
							Berlin, De 81566</div>
						<div className={`${cl.contact__info__item} ${cl.contact__info__email}`}>info@email.com</div>
						<div className={`${cl.contact__info__item} ${cl.contact__info__tel}`}>+996706222112</div>
						<div className={cl.contact__socials}>
							<a href='#facebook' className={cl.contact__social}><LogoFacebook /></a>
							<a href='#twitter' className={cl.contact__social}><LogoTwitter /></a>
							<a href='#dribbble' className={cl.contact__social}><LofoDribbble /></a>
							<a href='#instagram' className={cl.contact__social}><LogoInstagram /></a>
						</div>
					</div>
					<form className={cl.contact__form}>
						<div className={cl.contact__form__items}>
							<div className={cl.contact__form__item}>
								<img src={User} alt="" />
								<input type="text" placeholder='Name' required />
							</div>
							<div className={cl.contact__form__item}>
								<img src={Email} alt="" />
								<input type="text" placeholder='Email Address' required />
							</div>
						</div>
						<div className={cl.contact__form__items}>
							<div className={cl.contact__form__item}>
								<img src={Phone} alt="" />
								<input type="text" placeholder='Phone' required />
							</div>
							<div className={cl.contact__form__item}>
								<img src={Information} alt="" />
								<input type="text" placeholder='Subject' required />
							</div>
						</div>
						<div className={cl.contact__form__items}>
							<div className={cl.contact__form__item}>
								<img src={Pencil} alt="" />
								<textarea type="text" placeholder='How can we help you? Feel free to get in touch!' required />
							</div>
							<div className={cl.contact__form__item}>
								<button className={cl.contact__form__btn}>
									<PlanePapper />
									<h2>Get In Touch</h2>
								</button>
								<div className={cl.contact__checkbox}>
									<input type="checkbox" id='checkbox_contact' />
									<label htmlFor="checkbox_contact">
										I agree that my submitted data is <a href="#">collected and stored.</a>
									</label>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div >
		</div >
	);
};

export default Contact;
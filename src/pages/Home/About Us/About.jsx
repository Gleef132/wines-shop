import React, { useState } from 'react';
import cl from './About.module.scss'

const About = () => {
	return (
		<div className={cl.about} id="about">
			<div className={`${cl.about__container} ${"_container"}`}>
				<div className={cl.about__content}>
					<div className={cl.about__link}>
						<h1 className={`${"title"} ${cl.about__title}`}>
							<span>craft wine</span>
							Defined by the Southern Region, Crafted by the Best Winemakers
						</h1>
						<div className={cl.about__img}>
							<img src="https://chardonnay.ancorathemes.com/wp-content/uploads/2021/08/wine-about-4-copyright-1.jpg" alt="" />
						</div>
					</div>
					<div className={cl.about__link}>
						<img src="https://chardonnay.ancorathemes.com/wp-content/uploads/2021/09/new-wine-about-3-copyright.jpg" alt="" />
						<p className={cl.about__text}>
							We are a small family winery adhering to principles of quality wine making. We firmly believe that the wine we make is capable of competing with world famous brands.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
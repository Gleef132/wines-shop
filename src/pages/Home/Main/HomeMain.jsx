import React, { useState, useEffect } from 'react';
import cl from './Main.module.scss'
import imgSlide1 from '../../../assets/img/top-view-wine-bottles-with-grapes.png';
import imgSlide2 from '../../../assets/img/winegrape.png';
import imgSlide3 from '../../../assets/img/wooden-barrel-with-bottles-glasses-wine.png';
import { ReactComponent as ArrowRight } from '../../../assets/img/chevron-forward-outline.svg';
import TextSliderList from './TextSlider/TextSliderList';

import SideBar from '../../../commponents/sideBar/SideBar';
import MainSearch from '../../../commponents/Search/Search';


const HomeMain = () => {
	const [count, setCount] = useState(1)
	const dataSlider = [
		{
			id: 1,
			text: 'Try our exclusive wine varieties.',
			title: 'New Luxury Wine from France',
		},
		{
			id: 2,
			text: 'Book a tour now and get a discount.',
			title: 'Winery Tours and Special Tasting',
		},
		{
			id: 3,
			text: 'Enjoy a delicious meal at our restaurant.',
			title: 'Enjoy Our Exclusive Dishes & Drinks',
		},
	]
	const currentDataSlider = dataSlider.filter(item => count === item.id)
	function arrowLeftFn() {
		setCount(count === 1 ? 3 : count - 1)
	}
	function arrowRightFn() {
		setCount(count === 3 ? 1 : count + 1)
	}
	useEffect(() => {
		const timer = setTimeout(() => {
			setCount(count === 3 ? 1 : count + 1)
		}, 10000);
		return () => clearTimeout(timer);
	}, [count])

	return (
		<main className={cl.main} id='home'>


			<img className={count === 1 ? `${cl.main__slide__img} ${cl.active}` : cl.main__slide__img} src={imgSlide1} alt=''></img>
			<img className={count === 2 ? `${cl.main__slide__img} ${cl.active}` : cl.main__slide__img} src={imgSlide2} alt=''></img>
			<img className={count === 3 ? `${cl.main__slide__img} ${cl.active}` : cl.main__slide__img} src={imgSlide3} alt=''></img>
			<div className={cl.main__arrows}>
				<div className={cl.main__arrow} onClick={arrowRightFn}>
					<ArrowRight />
				</div>
				<div className={cl.main__arrow} onClick={arrowLeftFn}>
					<ArrowRight />
				</div>
			</div>
			<div className={cl.main__container}>
				<div className={cl.main__content}>
					<TextSliderList props={currentDataSlider} />
					<div className={cl.main__controls}>
						<div className={count === 1 ? `${cl.main__control} ${cl.active}` : cl.main__control} onClick={() => setCount(1)}></div>
						<div className={count === 2 ? `${cl.main__control} ${cl.active}` : cl.main__control} onClick={() => setCount(2)}></div>
						<div className={count === 3 ? `${cl.main__control} ${cl.active}` : cl.main__control} onClick={() => setCount(3)}></div>
					</div>
				</div>
			</div>
		</main >
	);
};

export default HomeMain;
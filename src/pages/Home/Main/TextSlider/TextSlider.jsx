import React from 'react';
import cl from '../Main.module.scss'
import MyBtn from '../../../../commponents/UI/button/MyBtn';

const TextSlider = ({ props }) => {
	return (
		<div>
			<div className={`${cl.main__slide__text} ${cl.active}`}>{props.text}</div>
			<div className={`${cl.main__slide__title} ${cl.active}`}>{props.title}</div>
			<div className={cl.main__slide__btn}>
				<MyBtn children={"About Us"} onClick={() => { document.querySelector('#about').scrollIntoView(true) }} />
			</div>
		</div>
	);
};

export default TextSlider;
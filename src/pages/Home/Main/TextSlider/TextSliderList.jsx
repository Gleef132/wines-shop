import React from 'react';
import TextSlider from './TextSlider';

const TextSliderList = ({ props }) => {
	return (
		<div>
			{props.map(item =>
				<TextSlider props={item} key={item.id} />
			)}
		</div>
	);
};

export default TextSliderList;
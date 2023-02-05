import React, { useEffect, useState } from 'react';
import { ReactComponent as StarsRating } from '../../../assets/img/star-rating.svg';
import classes from './rating.module.scss'

const Rating = ({ cl, ratingWidth, ratingSubmit, ratingCheckSubmit }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	function rating(index) {
		setActiveIndex(index)
		ratingSubmit(index)
	}
	useEffect(() => {
		setActiveIndex(0)
	}, [ratingCheckSubmit])
	return (
		<div>
			<div className={cl}>
				<StarsRating />
				<StarsRating />
				<StarsRating />
				<StarsRating />
				<StarsRating />
			</div>
			<div className={cl} style={{ width: `${ratingWidth}%` }}>
				<StarsRating className={activeIndex >= 1 ? `${classes.active}` : null} onClick={() => rating(1)} />
				<StarsRating className={activeIndex >= 2 ? `${classes.active}` : null} onClick={() => rating(2)} />
				<StarsRating className={activeIndex >= 3 ? `${classes.active}` : null} onClick={() => rating(3)} />
				<StarsRating className={activeIndex >= 4 ? `${classes.active}` : null} onClick={() => rating(4)} />
				<StarsRating className={activeIndex >= 5 ? `${classes.active}` : null} onClick={() => rating(5)} />
			</div>
		</div>
	);
};

export default Rating;
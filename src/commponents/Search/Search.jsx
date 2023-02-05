import React, { useState, useEffect } from 'react';
import cl from './Search.module.scss'
import MyLogo from '../UI/logo/MyLogo';
import MyInput from '../UI/input/MyInpu';
import { ReactComponent as SocialIcon2 } from '../../assets/img/search-outline.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainSearch = ({ props, mainSearchActiveFn }) => {

	function insertMark(str, pos, len) {
		return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len);
	}

	const [wines, setWines] = useState([])

	function filterSearch(e) {
		const allTitleSearch = document.querySelectorAll('#searchTitleMain')
		const titleSearchBlock = document.querySelector('#searchTitleMainBlock')
		allTitleSearch.forEach(item => {
			if (e.target.value) {
				titleSearchBlock.style.height = 'auto'
				if (item.innerText.toLowerCase().search(e.target.value.toLowerCase()) !== -1) {
					item.style.display = 'block'
					let str = item.innerText;
					item.innerHTML = insertMark(str, item.innerText.toLowerCase().search(e.target.value.toLowerCase()), e.target.value.length)
				} else {
					item.style.display = 'none'
				}
			} else {
				titleSearchBlock.style.height = '0'
				item.style.display = 'none'
			}
		})
	}
	async function fetchApi() {
		const { data } = await axios.get('https://6276472dbc9e46be1a151e2e.mockapi.io/Wines')
		setWines(data)
	}
	useEffect(() => {
		fetchApi()
	}, [])

	return (
		<div className={props ? `${cl.search} ${cl.active}` : `${cl.search}`}>
			<div className={cl.search__content}>
				<div className={props ? `${cl.search__header} ${cl.active}` : `${cl.search__header}`}>
					<MyLogo className={`${cl.search__logo} ${'logo'}`} />
					<div className={cl.search__close}
						onClick={mainSearchActiveFn}></div>
				</div>
				<form action='#' method='post' className={props ? `${cl.search__form} ${cl.active}` : `${cl.search__form}`}>
					<MyInput type="text" placeholder="Type words and hit enter" onChange={filterSearch} />
					<SocialIcon2 />
					<div className={cl.search__prompt} id='searchTitleMainBlock'>
						{wines.map(item =>
							<Link className={cl.search__prompt__text} to={'/product/' + item.id} key={item.id}><li id='searchTitleMain'>{item.name}</li></Link>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default MainSearch;
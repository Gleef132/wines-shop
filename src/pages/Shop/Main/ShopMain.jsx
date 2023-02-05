import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowSvg } from '../../../assets/img/chevron-forward-outline.svg';
import cl from './ShopMain.module.scss';
import ProductList from '../../../commponents/ProductItems/ProductList';
import { ReactComponent as SocialSearchIcon } from '../../../assets/img/search-outline.svg';
import MyBtn from '../../../commponents/UI/button/MyBtn';
import axios from 'axios';
import Loader from '../../../commponents/UI/Loader/Loader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderPages from '../../../commponents/HeaderPages/HeaderPages';

const ShopMain = () => {
	const [wines, setWines] = useState([])
	const [allWines, setAllWines] = useState([])
	const [copyWines, setCopyWines] = useState([])
	const [totalPages, setTotalPages] = useState(0)
	const [page, setPage] = useState(1)
	const [isProductsLoading, setIsProductsLoading] = useState(false)
	const [filterPrice, setFilterPrice] = useState({ minPrice: '20', maxPrice: '250' })
	const [filterCotegories, setFilterCotegories] = useState({
		red: 0, rose: 0, sparkling: 0,
		topWines: 0, uncategorized: 0, white: 0, all: 0,
	})
	const [filterCotegoriesActive, setFilterCotegirisActive] = useState('All')
	const [transitionFilterPage, setTransitionFilterPage] = useState(true)
	const cart = useSelector(state => state.cart.cart)

	let pagesArray = [];
	for (let i = 0; i < totalPages; i++) {
		pagesArray.push(i + 1)
	}

	async function fetchApi(limit = 6, page = 1) {
		setIsProductsLoading(true)
		const responseMain = await axios.get('https://6276472dbc9e46be1a151e2e.mockapi.io/Wines')
		const response = await axios.get('https://6276472dbc9e46be1a151e2e.mockapi.io/Wines', {
			params: {
				p: page,
				l: limit
			}
		})
		let totalCount = (responseMain.data.length)
		let countPages = Math.ceil(totalCount / limit)
		setTotalPages(countPages)
		setAllWines(responseMain.data)
		setIsProductsLoading(false)
		if (transitionFilterPage) {
			setTransitionFilterPage(false)
		}
		setWines(response.data)
		setCopyWines(response.data)
	}

	function filterCotegoriesCount() {
		let all = filterCotegories.all;
		let red = filterCotegories.red;
		let rose = filterCotegories.rose;
		let sparkling = filterCotegories.sparkling;
		let topWines = filterCotegories.topWines;
		let uncategorized = filterCotegories.uncategorized;
		let white = filterCotegories.white;
		allWines.forEach(item => {
			all += 1;
			if (item.type.split(',').length === 1) {
				if (item.type === 'red') {
					red = red + 1;
				}
				if (item.type === 'rose') {
					rose = rose + 1;
				}
				if (item.type === 'sparkling') {
					sparkling = sparkling + 1;
				}
				if (item.type === 'topWines') {
					topWines = topWines + 1;
				}
				if (item.type === 'uncategorized') {
					uncategorized = uncategorized + 1;
				}
				if (item.type === 'white') {
					white = white + 1;
				}
			} else {
				let a = item.type.split(',')
				if (a[0] === 'red' || a[1] === 'red') {
					red = red + 1;
				}
				if (a[0] === 'rose' || a[1] === 'rose') {
					rose = rose + 1;
				}
				if (a[0] === 'sparkling' || a[1] === 'sparkling') {
					sparkling = sparkling + 1;
				}
				if (a[0] === 'topWines' || a[1] === 'topWines') {
					topWines = topWines + 1;
				}
				if (a[0] === 'uncategorized' || a[1] === 'uncategorized') {
					uncategorized = uncategorized + 1;
				}
				if (a[0] === 'white' || a[1] === 'white') {
					white = white + 1;
				}
			}
		}
		)
		setFilterCotegories({
			...filterCotegories, red: red, rose: rose, sparkling: sparkling,
			topWines: topWines, uncategorized: uncategorized, white: white, all: all,
		})
	}

	useEffect(() => {
		filterCotegoriesCount()
	}, [transitionFilterPage])

	useEffect(() => {
		fetchApi(6, page)
	}, [page])

	function filterClick(text) {
		setIsProductsLoading(true)
		let winesCurrent = [];
		if (text === 'All' && (filterPrice.minPrice === '20' && filterPrice.maxPrice === '250')) {
			setWines(copyWines)
		} else {
			winesCurrent = allWines.filter((item) => {
				let a = item.type.split(' ')
				let b = item.type.split(',')
				let c = (a[0] === text || a[1] === text) || (b[0] === text || b[1] === text);
				let d = (filterPrice.minPrice < Number(item.price.replace(/\$/g, '')) && (filterPrice.maxPrice > Number(item.price.replace(/\$/g, ''))));
				if (text === 'All') {
					console.log('2')
					if (d) {
						return item;
					} else {
						return null;
					}
				}
				if (filterPrice.minPrice === '0' && filterPrice.maxPrice === '250') {
					console.log('3')
					if (c) {
						return item;
					} else {
						return null;
					}
				}
				if (c && d) {
					console.log('4')
					return item
				} else {
					return null;
				}
			})
			setWines(winesCurrent)
		}
		if (winesCurrent.length > 6) {
			setTotalPages(Math.ceil(winesCurrent.length / 6))
		} else {
			setTotalPages(1)
		}
		setTimeout(() => {
			setIsProductsLoading(false)
		}, 1000);
	}

	function filterSlider(e) {
		const progress = document.querySelector('#progress')
		const minRange = document.querySelector('#range-min');
		const maxRange = document.querySelector('#range-max');
		let minValue = minRange.value
		let maxValue = maxRange.value

		if (maxValue - minValue < 30) {
			if (e === 1) {
				minRange.value = parseInt(maxValue) - 30;
				setFilterPrice({ ...filterPrice, maxPrice: maxValue, minPrice: minRange.value })
			} else {
				maxRange.value = parseInt(minValue) + 30;
				setFilterPrice({ ...filterPrice, maxPrice: maxRange.value, minPrice: minRange.value })
			}
		} else {
			progress.style.left = ((minValue / minRange.max) * 100) - 5 + '%';
			progress.style.right = (100 - (maxValue / maxRange.max) * 100) + 5 + '%';
			setFilterPrice({ ...filterPrice, maxPrice: maxValue, minPrice: minValue })
		}

	}

	function filterCotegoriesFn(text) {
		setFilterCotegirisActive(text)
	}

	function insertMark(str, pos, len) {
		return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len);
	}

	function filterSearch(e) {
		const allTitleSearch = document.querySelectorAll('#searchTitle')
		const titleSearchBlock = document.querySelector('#searchTitleBlock')
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

	const scrollToShopContent = () => {
		setTimeout(() => {
			document.querySelector('#shop-content').scrollIntoView({ block: "start", behavior: "smooth" })
		}, 0);
	}


	return (
		<main className={cl.main} id='shop'>
			<HeaderPages children={'Shop'} />
			<div className={`${cl.main__container} ${'_container'}`}>
				<div className={cl.main__content} id='shop-content'>
					<div className={cl.main__products}>
						<div className={isProductsLoading ? `${cl.main__loader} ${cl.active}`
							: `${cl.main__loader}`
						}>
							<Loader />
						</div>
						<div className={isProductsLoading ? `${cl.main__show__product}` :
							`${cl.main__show__product} ${cl.active}`}>
							<ProductList props={wines}
							/>
							{totalPages !== 1 ?
								<div className={cl.main__count__pages}>
									<div className={cl.main__btn__pages}
										onClick={() => {
											page !== 1 ? setPage(page - 1) : setPage(page)
											scrollToShopContent()
										}}
									><ArrowSvg /> </div>
									{pagesArray.map(p =>
										<div className={page === p ? `${cl.main__btn__pages} ${cl.active}` : `${cl.main__btn__pages}`} key={p}
											onClick={() => {
												setPage(p)
												scrollToShopContent()
											}}
										>{p}</div>
									)}
									<div className={cl.main__btn__pages}
										onClick={() => {
											page !== 2 ? setPage(page + 1) : setPage(page)
											scrollToShopContent()
										}}
									><ArrowSvg /> </div>
								</div>
								: null
							}
						</div>
					</div>
					<div className={cl.main__filters}>
						<div className={cl.main__cart}>
							<h5 className={cl.main__filter__title}>Cart</h5>
							<p className={cl.main__cart__text}>{cart.length === 0 ? 'No produts in the cart' : `In cart ${cart.length} products`}</p>
						</div>
						<div className={cl.main__search}>
							<h5 className={cl.main__filter__title}>Search</h5>
							<div className={cl.main__search__input}>
								<SocialSearchIcon />
								<input type="text" placeholder='Search fro products...'
									onChange={filterSearch}
								/>
								<div className={cl.main__search__prompt} id='searchTitleBlock'>
									{allWines.map(item =>
										<Link key={item.id} to={'/product/' + item.id} className={cl.main__search__prompt__text}><li id='searchTitle'>{item.name}</li></Link>
									)}
								</div>
							</div>
						</div>
						<div className={cl.main__categories}>
							<div className={cl.main__filter__title}>Catigories</div>
							<div className={filterCotegoriesActive === 'All' ? `${cl.main__category} ${cl.active}` : `${cl.main__category}`}
								onClick={() => {
									filterCotegoriesFn('All')
									filterClick('All')
								}
								}
							>All ({filterCotegories.all})</div>
							<div className={filterCotegoriesActive === 'red' ? `${cl.main__category} ${cl.active}` : `${cl.main__category}`}
								onClick={() => {
									filterCotegoriesFn('red')
									filterClick('red')
								}
								}
							>Red ({filterCotegories.red})</div>
							<div className={filterCotegoriesActive === 'rose' ? `${cl.main__category} ${cl.active}` : `${cl.main__category}`}
								onClick={() => {
									filterCotegoriesFn('rose')
									filterClick('rose')
								}
								}
							>Rose ({filterCotegories.rose})</div>
							<div className={filterCotegoriesActive === 'sparkling' ? `${cl.main__category} ${cl.active}` : `${cl.main__category}`}
								onClick={() => {
									filterCotegoriesFn('sparkling')
									filterClick('sparkling')
								}
								}
							>Sparkling ({filterCotegories.sparkling})</div>
							<div className={filterCotegoriesActive === 'topWines' ? `${cl.main__category} ${cl.active}` : `${cl.main__category}`}
								onClick={() => {
									filterCotegoriesFn('topWines')
									filterClick('topWines')
								}
								}
							>Top Wines ({filterCotegories.topWines})</div>
							<div className={filterCotegoriesActive === 'uncategorized' ? `${cl.main__category} ${cl.active}` : `${cl.main__category}`}
								onClick={() => {
									filterCotegoriesFn('uncategorized')
									filterClick('uncategorized')
								}
								}
							>Uncategorized ({filterCotegories.uncategorized})</div>
							<div className={filterCotegoriesActive === 'white' ? `${cl.main__category} ${cl.active}` : `${cl.main__category}`}
								onClick={() => {
									filterCotegoriesFn('white')
									filterClick('white')
								}
								}
							>White ({filterCotegories.white})</div>
						</div>
						<div className={cl.main__filter__price}>
							<h5 className={cl.main__filter__title}>Filter</h5>
							<div className={cl.main__filter__slider}>
								<div className={cl.main__progress} id='progress'></div>
								<input id='range-min' type="range" min='20' step='10' max='250' defaultValue='0'
									onChange={() => filterSlider(1)}
								/>
								<input id='range-max' type="range" min='20' step='10' max='250' defaultValue='250'
									onChange={() => filterSlider(2)}
								/>
							</div>
							<div className={cl.main__filter__text}>Price: ${filterPrice.minPrice} - ${filterPrice.maxPrice}</div>
							<MyBtn children={'Filter'}
								onClick={() => filterClick(filterCotegoriesActive)}
							/>
						</div>
					</div>
				</div>
			</div>
		</main >
	);
};

export default ShopMain;

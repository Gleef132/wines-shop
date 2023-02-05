import React, { useState } from 'react'
import { adminAuth } from '../../http/productApi'
import cl from './Admin.module.scss'

import { ReactComponent as Eye } from '../../assets/img/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/img/eye-off.svg';
import axios from 'axios';

const Admin = () => {

	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') || false)
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [passwordVisible, setPasswordVisible] = useState(false)

	const [formInputValues, setFormInputValues] = useState({ name: '', propetry: '', price: '', specialPrice: '', firstImageLink: '', firstFile: '', secondaryImageLink: '', secondaryFile: '', lastImageLink: '', lastFile: '', descripion: ['', '', ''] })
	const [listArray, setListArray] = useState([])

	const singIn = (e) => {
		e.preventDefault()
		if (login && password) {
			adminAuth().then(data => {
				if (login === data.login || password === data.password) {
					localStorage.setItem('isAuth', true)
					setIsAuth(true)
				} else {
					localStorage.setItem('isAuth', false)
				}
			})
		} else {

		}
	}

	const changeCategoryArray = (e) => {
		const text = e.currentTarget.textContent
		if (listArray.indexOf(text) === -1) {
			setListArray([...listArray, e.currentTarget.textContent])
			e.currentTarget.style.color = 'red'
		} else {
			setListArray(listArray.filter(category => category !== text))
			e.currentTarget.style.color = '#42d450'
		}
	}

	const getFile = (e, type) => {
		let file = e.target.files[0]
		const reader = new FileReader()
		reader.readAsDataURL(file)

		switch (type) {
			case 1:
				reader.onload = e => {
					setFormInputValues({ ...formInputValues, firstFile: e.target.result })
				}
				break;
			case 2:
				reader.onload = e => {
					setFormInputValues({ ...formInputValues, secondaryFile: e.target.result })
				}
				break;
			case 3:
				reader.onload = e => {
					setFormInputValues({ ...formInputValues, lastFile: e.target.result })
				}
				break;
			default:
				break;
		}
	}

	const sendDataProduct = (e) => {
		e.preventDefault()
		let dataPost = {
			name: formInputValues.name,
			img: formInputValues.firstFile ? formInputValues.firstFile : formInputValues.firstImageLink,
			imgOne: formInputValues.firstFile ? formInputValues.firstFile : formInputValues.firstImageLink,
			imgTwo: formInputValues.secondaryFile ? formInputValues.secondaryFile : formInputValues.secondaryImageLink,
			imgThree: formInputValues.lastFile ? formInputValues.lastFile : formInputValues.lastImageLink,
			property: formInputValues.propetry,
			price: '$' + formInputValues.price,
			specialPrice: formInputValues.specialPrice ? '$' + formInputValues.specialPrice : null,
			rating: 5,
			type: listArray.join(),
			commends: [],
			description: formInputValues.descripion
		}
		axios.post('https://6276472dbc9e46be1a151e2e.mockapi.io/Wines', dataPost)
	}




	return (
		<div className={cl.admin}>
			<div className={`${cl.admin__container} _container`}>
				{!isAuth ?
					<form className={cl.form}>
						<div className={cl.form__item}>
							<h2 className={cl.form__title}>Login</h2>
							<input type="text" placeholder="Enter login" autoFocus className={cl.form__input} onChange={(e) => setLogin(e.target.value)} />
						</div>
						<div className={cl.form__item}>
							<h2 className={cl.form__title}>Password</h2>
							<div className={cl.form__password}>
								<input type={!passwordVisible ? 'password' : 'text'} placeholder='Enter password' className={cl.form__input} onChange={(e) => setPassword(e.target.value)} />
								<div className={cl.form__password__svg} onClick={() => setPasswordVisible(!passwordVisible)}>
									{!passwordVisible ?
										<Eye />
										:
										<EyeOff />
									}
								</div>
							</div>
						</div>
						<button type="submit" className={cl.form__btn}
							onClick={(e) => singIn(e)}
						><span>Sing In</span></button>
					</form> :
					<div className={cl.admin__content}>
						<form className={cl.admin__body}>
							<div className={cl.admin__item}>
								<div className={cl.admin__title}>Choose categories: {listArray.map((item, index) =>
									index !== listArray.length - 1
										?
										<p key={item}>{item},</p>
										:
										<p key={item}>{item}</p>
								)}
								</div>
								<ul className={cl.admin__list}>
									<li className={cl.admin__link} onClick={changeCategoryArray}>Red</li>
									<li className={cl.admin__link} onClick={changeCategoryArray}>Rose</li>
									<li className={cl.admin__link} onClick={changeCategoryArray}>Sparkling</li>
									<li className={cl.admin__link} onClick={changeCategoryArray}>Top Wines</li>
									<li className={cl.admin__link} onClick={changeCategoryArray}>Uncategorized</li>
									<li className={cl.admin__link} onClick={changeCategoryArray}>White</li>
								</ul>
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>Name</h2>
								<input type="text" placeholder='Name' value={formInputValues.name} className={cl.admin__input} onChange={(e) => setFormInputValues({ ...formInputValues, name: e.target.value })} />
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>Property</h2>
								<input type="text" placeholder='Example: Dry,Sweet' value={formInputValues.propetry} className={cl.admin__input} onChange={(e) => setFormInputValues({ ...formInputValues, propetry: e.target.value })} />
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>Prises</h2>
								<div className={cl.admin__pricies}>
									<input type="text" className={cl.admin__input} placeholder='Price'
										value={formInputValues.price}
										onChange={(e) => setFormInputValues({ ...formInputValues, price: e.target.value })} />
									<input type="text" className={cl.admin__input} placeholder='Special price'
										value={formInputValues.specialPrice}
										onChange={(e) => setFormInputValues({ ...formInputValues, specialPrice: e.target.value })}
									/>
								</div>
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>
									Add first image file or image URL
								</h2>
								<label htmlFor="firstFile">Click to select file, name: unknown</label>
								<input type="file" id="firstFile" className={cl.admin__file} onChange={(e) => getFile(e, 1)} />
								<input type="text" className={cl.admin__input}
									placeholder='Enter image URL'
									value={formInputValues.firstImageLink}
									onChange={(e) => setFormInputValues({ ...formInputValues, firstImageLink: e.target.value })}
								/>
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>
									Add secondary image file or image URL
								</h2>
								<label htmlFor="secondaryFile">Click to select file, name: unknown</label>
								<input type="file" id="secondaryFile" className={cl.admin__file} onChange={(e) => getFile(e, 2)} />
								<input type="text" className={cl.admin__input}
									placeholder='Enter image URL'
									value={formInputValues.secondaryImageLink}
									onChange={(e) => setFormInputValues({ ...formInputValues, secondaryImageLink: e.target.value })}
								/>
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>
									Add last image file or image URL
								</h2>
								<label htmlFor="lastFile">Click to select file, name: unknown</label>
								<input type="file" id="lastFile" className={cl.admin__file} onChange={(e) => getFile(e, 3)} />
								<input type="text" className={cl.admin__input}
									placeholder='Enter image URL'
									value={formInputValues.lastImageLink}
									onChange={(e) => setFormInputValues({ ...formInputValues, lastImageLink: e.target.value })}
								/>
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>First description</h2>
								<textarea placeholder='Write first description' onChange={(e) => setFormInputValues({ ...formInputValues, descripion: [e.target.value, formInputValues.descripion[1], formInputValues.descripion[2]] })} className={cl.admin__textarea}></textarea>
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>Secondary description</h2>
								<textarea placeholder='Write secondary description' onChange={(e) =>
									setFormInputValues({ ...formInputValues, descripion: [formInputValues.descripion[1], e.target.value, formInputValues.descripion[2]] })}
									className={cl.admin__textarea}></textarea>
							</div>
							<div className={cl.admin__item}>
								<h2 className={cl.admin__title}>Last description</h2>
								<textarea placeholder='Write last description' onChange={(e) =>
									setFormInputValues({ ...formInputValues, descripion: [formInputValues.descripion[0], formInputValues.descripion[1], e.target.value] })} className={cl.admin__textarea}></textarea>
							</div>
							<button type='submit' onClick={sendDataProduct} className={cl.admin__btn}>Submit</button>
						</form>
					</div>
				}
			</div>
		</div>
	)
}

export default Admin

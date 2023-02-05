import React from 'react';
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop';
import { Routes, Route, } from 'react-router-dom';
import Header from './commponents/Header/Header';
import Footer from './commponents/Footer/Footer';
import ShopProduct from './pages/Product/ShopProduct';
import Favorite from './pages/Favorite/Favorite';
import Contact from './pages/Contact Us/Contact';
import Chechout from './pages/Checkout/Checkout';
import Cart from './pages/Cart/Cart';
import Admin from './pages/Admin/Admin';
import './styles/App.scss'

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path="/about" element={<Home />} />
				<Route path="/shop" element={<Shop />} />
				<Route path={'/product' + '/:id'} element={<ShopProduct />} />
				<Route path='/favorite' element={<Favorite />} />
				<Route path='/contact-us' element={<Contact />} />
				<Route path='/checkout' element={<Chechout />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/admin' element={<Admin />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;

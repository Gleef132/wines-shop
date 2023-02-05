const defaultState = {
	cart: JSON.parse(localStorage.getItem('cart')) || [],
}

const ADD_CART = 'ADD_CART';
const REMOVE_CART = 'REMOVE_CART'
const AMOUNT_INCREMENT_CART = 'AMOUNT_INCREMENT_CART';
const AMOUNT_DECREMENT_CART = 'AMOUNT_DECREMENT_CART'


export const cartReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_CART:
			return { ...state, cart: [...state.cart, action.payload] }
		case REMOVE_CART:
			return { ...state, cart: state.cart.filter(p => p.id !== action.payload.id) }
		case AMOUNT_INCREMENT_CART:
			return {
				...state, cart: state.cart.filter(p => {
					if (p.id === action.payload.id) {
						p.amount += 1;
						return p
					} else {
						return p
					}
				})
			}
		case AMOUNT_DECREMENT_CART:
			return {
				...state, cart: state.cart.filter(p => {
					if (p.id === action.payload.id) {
						if (p.amount === 1) {
							return null
						}
						p.amount -= 1;
						return p
					} else {
						return p
					}
				})
			}
		default:
			return state
	}
}

export const addCartAction = (payload) => ({ type: ADD_CART, payload })
export const removeCartAction = (payload) => ({ type: REMOVE_CART, payload })
export const incrementAmountCartAction = (payload) => ({ type: AMOUNT_INCREMENT_CART, payload })
export const decrementAmountCartAction = (payload) => ({ type: AMOUNT_DECREMENT_CART, payload })

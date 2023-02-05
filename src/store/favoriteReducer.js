const defaultState = {
	favorite: JSON.parse(localStorage.getItem('favorite')) || [],
}

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const favoriteReducer = (state = defaultState, action) => {
	switch (action.type) {
		case ADD_FAVORITE:
			return { ...state, favorite: [...state.favorite, action.payload] }
		case REMOVE_FAVORITE:
			return { ...state, favorite: state.favorite.filter(p => p.id !== action.payload.id) }
		default:
			return state
	}
}

export const addFavoriteAction = (payload) => ({ type: ADD_FAVORITE, payload })
export const removeFavoriteAction = (payload) => ({ type: REMOVE_FAVORITE, payload })

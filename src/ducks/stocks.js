import axios from 'axios';

// Actions
const ADD_STOCK = 'ADD_STOCK';
const REMOVE_STOCK = 'DELETE_STOCK';

// reducer
export default function Stocks(state = [], action) {
	switch (action.type) {
		case ADD_STOCK: {
			return [...state, action.stockData];
		}
		case REMOVE_STOCK: {
			const removeQuestionList = [
				...state.slice(0, action.index),
				...state.slice(action.index + 1)
			];
			return removeQuestionList;
		}
		default:
			return state;
	}
}

// actionCreators
export function addStock(stockData) {
	return {
		type: ADD_STOCK,
		stockData
	};
}
export function removeStock(index) {
	return {
		type: REMOVE_STOCK,
		index
	};
}

// Async actions with thunk
export function fetchStock(stockCode) {
	return dispatch =>
		axios
			.get(
				`https://www.quandl.com/api/v3/datasets/WIKI/${stockCode}.json?api_key=${process
					.env.REACT_APP_QUANDL_KEY}`
			)
			.then(res => {
				dispatch(addStock(res.data));
				// console.log(res.data);
			})
			.catch(err => {
				console.warn(err);
			});
}

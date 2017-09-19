import axios from 'axios';
import socketIOClient from 'socket.io-client';
import * as toastr from 'toastr';

import { toastOptions } from '../helper';

// Actions
const CHECK_DB = 'CHECK_DB';
const ADD_STOCK = 'ADD_STOCK';
const REMOVE_STOCK = 'DELETE_STOCK';

// reducer
export default function Stocks(state = [], action) {
	switch (action.type) {
		case CHECK_DB: {
			return action.data;
		}
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
export function getDB(data) {
	return {
		type: CHECK_DB,
		data
	};
}
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
export function checkDB(stocks) {
	return dispatch =>
		axios
			.get('/api/stocks')
			.then(res => {
				if (stocks.length === 0) {
					res.data.map(elem => {
						dispatch(fetchStock(elem.stockName));
					});
				} else if (res.data.length < stocks.length) {
					dispatch(removeStock(stocks.length - 1));
				} else {
					let diff = [];
					res.data.map((item, i) => {
						if (i < stocks.length) {
							if (res.data[i].stockName !== stocks[i].dataset.dataset_code) {
								diff.push({
									stockName: item.stockName
								});
							}
						} else if (i === stocks.length) {
							diff.push({
								stockName: item.stockName
							});
						} else {
							diff = [];
						}
					});

					diff.map(elem => {
						dispatch(fetchStock(elem.stockName));
					});
					diff = [];
					// console.log(res);
				}
			})
			.catch(err => {
				console.warn(err);
			});
}

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
				console.error(err);
				toastr['warning'](' ', 'Stock Code cannot be found!');
			});
}

export function newStock(stockCode, socket) {
	socket.emit('update', stockCode);
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
			.then(socket.emit('addStock', stockCode))
			.catch(err => {
				console.error(err);
				toastr['warning'](' ', 'Stock Code cannot be found!');
			});
}

export function deleteStock(ind, stockCode) {
	const socket = socketIOClient('https://createdd-stockmarketchart.herokuapp.com/');
	socket.emit('removeStock', stockCode);
	return dispatch => {
		dispatch(removeStock(ind));
		console.log(`Deleted ${stockCode}`);
	};
}

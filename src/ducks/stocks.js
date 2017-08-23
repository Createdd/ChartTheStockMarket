import axios from 'axios';

// Actions
const FETCHED_STOCK = 'FETCHED_STOCK';
const ADD_STOCK = 'ADD_STOCK';
const DELETE_STOCK = 'DELETE_STOCK';


// reducer
export default function Stocks(state = [], action) {
  switch (action.type) {
    case FETCHED_STOCK:
      return action.polls;
    case ADD_STOCK: {
      return [
        ...state,
        {
          stock: action.question,
        },
      ];
    }
    default:
      return state;
  }
}

// actionCreators
export function addStock(stockCode) {
  return {
    type: ADD_STOCK,
    stockCode,
  };
}


// Async actions with thunk
// export function fetchPolls() {
//   return dispatch =>
// 		axios
// 			.get('/api/polls')
// 			.then((res) => {
//   dispatch(receivePolls(res.data));
// 				// console.log(res);
// })
// 			.catch((err) => {
//   console.warn(err);
// });
// }

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// import reducers
import stocks from './ducks/stocks';

const defaultState = {
  stocks: [],
};

const rootReducer = combineReducers({
  stocks,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	defaultState,
	composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default store;
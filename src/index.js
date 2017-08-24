import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import $ from 'jquery';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'toastr/build/toastr.css';
import 'react-vis/dist/style.css';

import App from './components/App';
import store from './store';

$(document).ready(function() {
	$('.collapsible').collapsible();
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

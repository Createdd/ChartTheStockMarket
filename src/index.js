import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import App from './App';

$(document).ready(function(){
  $('.collapsible').collapsible();
});

ReactDOM.render(<App />, document.getElementById('root'));


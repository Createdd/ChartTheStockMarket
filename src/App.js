import React, { Component } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import CollapsibleCon from './components/sideBar/CollapsibleCon';

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="row">
				<div className="col s12 m3 grey">
				<CollapsibleCon />
				</div>
				<div className="col s12 m9 green">Area for Graph</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;

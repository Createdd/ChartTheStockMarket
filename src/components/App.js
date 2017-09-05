import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import Header from './Header';
import Footer from './Footer';
import CollapsibleCon from './sideBar/CollapsibleCon';
import ChartCon from './chart/ChartCon';

class App extends Component {
	constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:9000"
    };
	}
	componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
		socket.on("stocks", data => this.setState({ response: data }));
		console.log(this.state.response);
  }
	render() {
		return (
			<div
				style={{
					display: 'flex',
					minHeight: '100vh',
					flexDirection: 'column'
				}}
			>
				<Header />
				<main className="grey">
					<div className="row">
						<div className="col s12 m9">
							<ChartCon />
						</div>
						<div className="col s12 m3">
							<CollapsibleCon />
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default App;

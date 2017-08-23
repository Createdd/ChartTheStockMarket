import React from 'react';
import Collapsible from './Collapsible';
import FB from '../../exampleData/FB';
import TSLA from '../../exampleData/TSLA';

export default class CollapsibleCon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examples: [FB, TSLA],
			value: ''
		};
		this.addStock = this.addStock.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	addStock(e) {
		e.preventDefault();
		console.log('Sent stock Code: ' + this.state.value);
		this.setState({ value: "" });
	}
	render() {
		return (
			<Collapsible
				examples={this.state.examples}
				addStock={this.addStock}
				onChange={this.handleChange}
				value={this.state.value}
			/>
		);
	}
}

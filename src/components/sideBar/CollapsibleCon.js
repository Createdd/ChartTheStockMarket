import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Collapsible from './Collapsible';
import { checkDB, newStock, deleteStock } from '../../ducks/stocks';

export class CollapsibleCon extends React.Component {
	constructor(props) {
		super(props);
		const socket = io('http://127.0.0.1:9000');
		this.state = {
			value: '',
			response: '',
			div: 'Hello',
			socket: socket
		};
		this.addStock = this.addStock.bind(this);
		this.removeStock = this.removeStock.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		this.props.checkDB();
	}

	componentDidMount() {
		const socket = io('http://127.0.0.1:9000');
		socket.on('connect', () => {
			return console.warn('socket working! id: ' + socket.id);
		});

		socket.on(
			'update',
			setTimeout(function(data) {
				data => {
					console.log(' ------- update !!!!!!!' + data.stockName);
				};
			}, 3000)
		);

		socket.on('update', data => this.setState({ div: data.stockName }));
		console.warn(this.state.div);
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	addStock(e) {
		e.preventDefault();
		this.props.newStock(this.state.value, this.state.socket);
		this.setState({ value: '' });
	}
	removeStock(ind, stockCode) {
		this.props.deleteStock(ind, stockCode);
	}
	render() {
		return (
			<div>
				{this.state.div}
				<Collapsible
					stocks={this.props.stocks}
					addStock={this.addStock}
					removeStock={this.removeStock}
					onChange={this.handleChange}
					value={this.state.value}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	stocks: state.stocks
});

export default connect(mapStateToProps, { checkDB, newStock, deleteStock })(
	CollapsibleCon
);

CollapsibleCon.propTypes = {
	stocks: PropTypes.arrayOf(
		PropTypes.shape({
			dataset: PropTypes.shape({
				database_code: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired
			})
		})
	).isRequired
};

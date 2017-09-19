import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Collapsible from './Collapsible';
import { checkDB, newStock, deleteStock } from '../../ducks/stocks';

export class CollapsibleCon extends React.Component {
	constructor(props) {
		super(props);
		const socket = io('https://createdd-stockmarketchart.herokuapp.com/');
		this.state = {
			value: '',
			response: '',
			lastAdd: '',
			socket: socket
		};
		this.addStock = this.addStock.bind(this);
		this.removeStock = this.removeStock.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		this.props.checkDB(this.props.stocks);
	}

	componentDidMount() {
		this.state.socket.on('connect', () => {
			return console.warn('socket working! id: ' + this.state.socket.id);
		});
		this.state.socket.on('update', () => {
			this.props.checkDB(this.props.stocks);
		});
		this.state.socket.on('removed', () => {
			this.props.checkDB(this.props.stocks);
		});
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

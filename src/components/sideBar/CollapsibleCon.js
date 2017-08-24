import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Collapsible from './Collapsible';
import { fetchStock } from '../../ducks/stocks';

class CollapsibleCon extends React.Component {
	constructor(props) {

		super(props);
		this.state = {
			value: ''
		};
		this.addStock = this.addStock.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		this.props.fetchStock("TSLA");
		this.props.fetchStock("GOOGL");
	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}
	addStock(e) {
		e.preventDefault();
		this.props.fetchStock(this.state.value);
		this.setState({ value: '' });
	}
	render() {
		return (
			<Collapsible
				stocks={this.props.stocks}
				addStock={this.addStock}
				onChange={this.handleChange}
				value={this.state.value}
			/>
		);
	}
}

const mapStateToProps = state => ({
	stocks: state.stocks
});

export default connect(mapStateToProps, { fetchStock })(CollapsibleCon);

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

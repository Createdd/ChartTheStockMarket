import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chart from './Chart';
import { fetchStock } from '../../ducks/stocks';
import { toastOptions, calculateTicks } from '../../helper';

class ChartCon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		// this.addStock = this.addStock.bind(this);
	}

	renderChart(props) {
		if (props.stocks[0] === undefined) {
			return <div>Currently no data is available</div>;
		} else {
			const arrayColumn = (arr, n) => arr.map(x => x[n]);
			const col1 = arrayColumn(props.stocks[0].dataset.data, 0);
      const col2 = arrayColumn(props.stocks[0].dataset.data, 1);
      const dates = col1.map(date => new Date(date).getTime());
      const tickValues = calculateTicks(dates);

			let data = [];
			let len = props.stocks[0].dataset.data.length;
			for (var i = 0; i < len; i++) {
				data.push({
					x: dates[i],
					y: col2[i]
				});
			}
			return (
				<div>
					<Chart data={data} tickValues={tickValues}/>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderChart(this.props)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	stocks: state.stocks
});

export default connect(mapStateToProps, { fetchStock })(ChartCon);

ChartCon.propTypes = {
	stocks: PropTypes.arrayOf(
		PropTypes.shape({
			dataset: PropTypes.shape({
				database_code: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired
			})
		})
	).isRequired
};

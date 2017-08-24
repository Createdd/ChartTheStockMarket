import React from 'react';
import PropTypes from 'prop-types';
import {
	HorizontalGridLines,
	VerticalGridLines,
	XAxis,
	XYPlot,
	YAxis,
	LineMarkSeries,
	makeWidthFlexible
} from 'react-vis';

const Plot = ({ width, props }) =>
	<XYPlot height={180} width={width} >
		<HorizontalGridLines />
		<VerticalGridLines />
		<XAxis
			tickValues={props.tickValues}
			tickFormat={d => `${new Date(d).getMonth()}-${new Date(d).getFullYear()}`}
			title="Date"
		/>
		<YAxis title="Price" />
		<LineMarkSeries data={props.data} color="green" size={0.1} />
	</XYPlot>;


  Plot.propTypes = { width: PropTypes.number, measurements: PropTypes.array }
  Plot.displayName = 'TimeSeriesLineChartPlot'
const FlexibleXYPlot = makeWidthFlexible(Plot);

const Chart = props => {
	return <FlexibleXYPlot props={props} />;
};

export default Chart;

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
	<XYPlot height={500} width={width} style={{backgroundColor: "c2c4c6"}}  >
		<HorizontalGridLines />
		<VerticalGridLines />
		<XAxis
			tickValues={props.tickValues}
			tickFormat={d => `${new Date(d).getMonth()}-${new Date(d).getFullYear()}`}
			title="Date"
		/>
		<YAxis title="Value" />
		<LineMarkSeries data={props.data} color="green" size={0.1} />
	</XYPlot>;


  Plot.propTypes = { width: PropTypes.number, measurements: PropTypes.array }
  Plot.displayName = 'TimeSeriesLineChartPlot'
const FlexibleXYPlot = makeWidthFlexible(Plot);

const Chart = props => {
	return <FlexibleXYPlot props={props} />;
};

export default Chart;

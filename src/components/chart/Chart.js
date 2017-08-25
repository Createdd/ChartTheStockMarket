import React from 'react';
import PropTypes from 'prop-types';
import {
	HorizontalGridLines,
	VerticalGridLines,
	XAxis,
	XYPlot,
	YAxis,
	LineMarkSeries,
	Borders,
	GradientDefs,
	linearGradient,
	makeWidthFlexible
} from 'react-vis';

const gradient = (
	<GradientDefs>
		<linearGradient id="borderGradient" gradientUnits="userSpaceOnUse">
			<stop offset="10%" stopColor="#455a64" stopOpacity={0.3} />
			<stop offset="33%" stopColor="#546e7a" stopOpacity={0.3} />
			<stop offset="66%" stopColor="#37474f" stopOpacity={0.3} />
			<stop offset="90%" stopColor="#263238" stopOpacity={0.3} />
		</linearGradient>
	</GradientDefs>
);
const renderLines = props => {
	return props.data.map((line, ind) => {
		return <LineMarkSeries data={line} color={'#' + (Math.random().toString(16) + "000000").substring(2,8)} size={0.1} key={ind} />;
	});
};

const renderLongestTimeperiod = (props) => {
	props.tickValues.sort();
}

const Plot = ({ width, props }) =>
	<XYPlot height={500} width={width} style={{ backgroundColor: '#c2c4c6' }}>
		<HorizontalGridLines />
		<VerticalGridLines />
		{renderLongestTimeperiod(props)}
		<XAxis
			tickValues={props.tickValues[0]}
			tickFormat={d => `${new Date(d).getMonth()}-${new Date(d).getFullYear()}`}
			title="Date"
		/>
		<YAxis title="Value" />
		{renderLines(props)}
		{gradient}
		<Borders
			style={{
				right: { fill: '#c2c4c6' },
				top: { fill: '#c2c4c6' },
				bottom: { fill: 'url(#borderGradient)' },
				left: { fill: 'url(#borderGradient)' }
			}}
		/>
	</XYPlot>;

Plot.propTypes = { width: PropTypes.number, measurements: PropTypes.array };
Plot.displayName = 'TimeSeriesLineChartPlot';
const FlexibleXYPlot = makeWidthFlexible(Plot);

const Chart = props => {
	return <FlexibleXYPlot props={props} />;
};

export default Chart;

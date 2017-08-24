import React from 'react';
import {
	HorizontalGridLines,
	VerticalGridLines,
	XAxis,
	XYPlot,
	YAxis,
	LineMarkSeries
} from 'react-vis';

const Chart = props => {
	return (
		<div>
			<XYPlot width={1000} height={500}>
				<XAxis tickValues={props.tickValues} tickFormat={d => `${new Date(d).getMonth()}-${new Date(d).getFullYear()}`} title="Date" />
				<YAxis title="Price" />
				<HorizontalGridLines style={{ size: 2 }} />
				<VerticalGridLines />
				<LineMarkSeries data={props.data} color="green" size={0.1} />
			</XYPlot>
		</div>
	);
};

export default Chart;

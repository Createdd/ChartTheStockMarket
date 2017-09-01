import React from 'react';
import PropTypes from 'prop-types';
import {
	HorizontalGridLines,
	VerticalGridLines,
	XAxis,
	XYPlot,
	YAxis,
	LineSeries,
	Borders,
	GradientDefs,
	linearGradient,
	makeWidthFlexible,
	Crosshair
} from 'react-vis';
import { Colors } from '../../helper';

export default class Chart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			crosshairValues: [{ x: 0, y: 0 }, { x: 0, y: 0 }]
		};
	}

	gradient() {
		return (
			<GradientDefs>
				<linearGradient id="borderGradient" gradientUnits="userSpaceOnUse">
					<stop offset="10%" stopColor="#c5cae9" stopOpacity={0.3} />
					<stop offset="33%" stopColor="#9fa8da" stopOpacity={0.3} />
					<stop offset="66%" stopColor="#7986cb" stopOpacity={0.3} />
					<stop offset="90%" stopColor="#3f51b5" stopOpacity={0.3} />
				</linearGradient>
			</GradientDefs>
		);
	}

	renderLongestTimeperiod(props) {
		props.tickValues.sort();
	}

	renderLines(props) {
		props.data.sort((a, b) => {
			return a.length - b.length;
		});
		return props.data.map((line, ind) => {
			return (
				<LineSeries
					data={line}
					color={Colors.random()}
					size={0.1}
					key={ind}
					onNearestX={(value, { index }) =>
						this.setState({ crosshairValues: props.data.map(d => d[index]) })}
				/>
			);
		});
	}

	renderCrosshair(props) {
		return (
			<Crosshair values={this.state.crosshairValues}>
				<div
					style={{
						background: 'black',
						minWidth: '7em',
						padding: '1em',
						fontSize: '14px',
						color: 'white'
					}}
				>
					<p>
						Date:
						{this.state.crosshairValues[
							this.state.crosshairValues.length - 1
						] === undefined
							? new Date(
									this.state.crosshairValues[this.state.crosshairValues.length]
										.x
								).getMonth() +
								'-' +
								new Date(
									this.state.crosshairValues[this.state.crosshairValues.length]
										.x
								).getFullYear()
							: new Date(
									this.state.crosshairValues[
										this.state.crosshairValues.length - 1
									].x
								).getMonth() +
								'-' +
								new Date(
									this.state.crosshairValues[
										this.state.crosshairValues.length - 1
									].x
								).getFullYear()}
					</p>
					{this.state.crosshairValues.map(
						(elem, ind) =>
							elem === undefined
								? <p key={ind}>No data</p>
								: <p key={ind}>
										{props.stocks[ind] === undefined
											? 'No data'
											: props.stocks[ind].dataset.dataset_code +
												': ' +
												elem.y +
												' $'}
									</p>
					)}
				</div>
			</Crosshair>
		);
	}

	Plot = ({ width, props }) => {
		return (
			<XYPlot
				onMouseLeave={() => this.setState({ crosshairValues: [] })}
				height={500}
				width={width}
				style={{ backgroundColor: '#c2c4c6' }}
			>
				{this.renderCrosshair(props)}
				{this.renderLongestTimeperiod(props)}
				{this.renderLines(props)}
				{this.gradient()}
				<HorizontalGridLines />
				<VerticalGridLines />
				<XAxis
					tickValues={props.tickValues[0]}
					tickFormat={d =>
						`${new Date(d).getMonth()}-${new Date(d).getFullYear()}`}
					title="Date"
				/>
				<YAxis title="Value" />
				<Borders
					style={{
						right: { fill: '#c2c4c6' },
						top: { fill: '#c2c4c6' },
						bottom: { fill: 'url(#borderGradient)' },
						left: { fill: 'url(#borderGradient)' }
					}}
				/>
			</XYPlot>
		);
	};

	render() {
		const FlexibleXYPlot = makeWidthFlexible(this.Plot);
		this.Plot.propTypes = {
			width: PropTypes.number,
			measurements: PropTypes.array
		};
		this.Plot.displayName = 'TimeSeriesLineChartPlot';
		return <FlexibleXYPlot props={this.props} />;
	}
}

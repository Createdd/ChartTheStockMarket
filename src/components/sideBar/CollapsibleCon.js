import React from 'react';
import Collapsible from './Collapsible';
import FB from '../../exampleData/FB';
import TSLA from '../../exampleData/TSLA';

export default class CollapsibleCon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examples: [FB, TSLA]
		};
	}
	render() {
		return <Collapsible examples={this.state.examples} />;
	}
}

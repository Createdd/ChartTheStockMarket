import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App Component', () => {
	it('should render a div', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('div')).toHaveLength(4);
	});

	it('should render a Header', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Header')).toHaveLength(1);
	});

	it('should render a ChartCon', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Connect(ChartCon)')).toHaveLength(1);
	});

	it('should render a CollapsibleCon', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Connect(CollapsibleCon)')).toHaveLength(1);
	});

	it('should check for styling', () => {
		const wrapper = shallow(<App />);
		expect(
			wrapper
				.find('div')
				.first()
				.prop('style')
		).toEqual({
			display: 'flex',
			minHeight: '100vh',
			flexDirection: 'column'
		});
	});
});

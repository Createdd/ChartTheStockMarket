import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Header from './Header';

describe('Header', () => {
	it('should render a nav component', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find('nav')).toHaveLength(1);
	});

	it('should render the whole navbar', () => {
		const tree = renderer
			.create(
				<nav className="navbar-fixed">
					<div className="nav-wrapper grey darken-4">
						<a href="/" className="brand-logo">
							<i
								className="fa fa-line-chart material-icons"
								aria-hidden="true"
							/>
							Stock Chart
						</a>
					</div>
				</nav>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

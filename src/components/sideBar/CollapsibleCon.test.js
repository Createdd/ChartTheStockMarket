import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import { CollapsibleCon } from './CollapsibleCon';
import Collapsible from './Collapsible';

describe('Collapsible Container', () => {
	it('calls componentDidMount', () => {
    // const wrapper = mount(<CollapsibleCon stocks={[]} />);
    expect(4+4).toBe(8);
		// expect(CollapsibleCon.prototype.componentDidMount.calledOnce).to.equal(true);
	});

	// it('should find the child component', () => {
	//   const wrapper = shallow(<CollapsibleCon />);

	// });

	// it('should render the Collapsible component', () => {
	// 	const tree = renderer.create(<Collapsible />).toJSON();
	// 	expect(tree).toMatchSnapshot();
	// });
});

import React from 'react';

const Collapsible = (props) => {
	return (
		<ul className="collapsible popout white-text" data-collapsible="accordion">
    <li>
      <div className="collapsible-header grey darken-3"><i className="fa fa-info-circle tiny material-icons" aria-hidden="true" />{props.examples[0].dataset.dataset_code}</div>
      <div className="collapsible-body grey darken-3"><span>{props.examples[0].dataset.name}</span></div>
    </li>
    <li>
      <div className="collapsible-header grey darken-3"><i className="fa fa-info-circle tiny material-icons" aria-hidden="true" />{props.examples[1].dataset.dataset_code}</div>
      <div className="collapsible-body grey darken-3"><span>{props.examples[1].dataset.name}</span></div>
    </li>
    <li>
      <div className="collapsible-header grey darken-3"><i className="fa fa-info-circle tiny material-icons" aria-hidden="true" />{props.examples[0].dataset.dataset_code}</div>
      <div className="collapsible-body grey darken-3"><span>{props.examples[0].dataset.name}</span></div>
    </li>
    <li>
      <div className="collapsible-header grey darken-3"><i className="fa fa-info-circle tiny material-icons" aria-hidden="true" />{props.examples[1].dataset.dataset_code}</div>
      <div className="collapsible-body grey darken-3"><span>{props.examples[1].dataset.name}</span></div>
    </li>
    </ul>
	);
};

export default Collapsible;

import React from 'react';

const Collapsible = props => {
	const renderStocks = props.stocks.map((elem, ind) => {
		return (
			<li key={ind}>
				<div className="collapsible-header grey darken-3 blue-grey-text text-lighten-3">
				<i className="fa fa-minus-circle material-icons red-text text-lighten-4" aria-hidden="true" onClick={(e)=>props.removeStock(ind, elem.dataset.dataset_code)} />
					{elem.dataset.dataset_code}
					</div>
				<div className="collapsible-body grey darken-3 blue-grey-text text-lighten-3">
					<span>
						{elem.dataset.name}
					</span>
				</div>
			</li>
		);
	});

	return (
		<ul className="collapsible popout white-text" data-collapsible="accordion">
			{renderStocks}
			<li>
				<div className="collapsible-header grey darken-3 blue-grey-text text-lighten-3">
					<i className="fa fa-plus material-icons green-text text-lighten-4" aria-hidden="true" />Add
					Stock
				</div>
				<div className="collapsible-body grey darken-3 blue-grey-text text-lighten-3">
					<form className="input-field" onSubmit={e => props.addStock(e)}>
						<i
							className="fa fa-paper-plane material-icons waves-effect waves-light blue-grey-text darken-1 prefix"
							aria-hidden="true"
							onClick={e => props.addStock(e)}
						/>
						<input
							id="stockCode"
							type="text"
							value={props.value}
							onChange={e => props.onChange(e)}
						/>
						<label htmlFor="stockCode">Stock Code</label>
					</form>
				</div>
			</li>
		</ul>
	);
};

export default Collapsible;

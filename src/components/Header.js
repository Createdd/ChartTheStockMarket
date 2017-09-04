import React from 'react';

const Header = () => {
	return (
		<nav className="navbar-fixed">
				<div className="nav-wrapper grey darken-4">
					<a href="/" className="brand-logo">
						<i className="fa fa-line-chart material-icons" aria-hidden="true" />
						Stock Chart
					</a>
				</div>
		</nav>
	);
};

export default Header;

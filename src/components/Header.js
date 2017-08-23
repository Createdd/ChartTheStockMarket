import React from 'react';

const Header = () => {
	return (
		<div className="navbar-fixed">
			<nav>
				<div className="nav-wrapper grey darken-4">
					<a href="/" className="brand-logo">
						<i className="fa fa-line-chart material-icons" aria-hidden="true" />
						Stock Chart
					</a>
				</div>
			</nav>
		</div>
	);
};

export default Header;

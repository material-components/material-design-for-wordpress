import React from 'react';
import { __ } from '@wordpress/i18n';
import { Logo } from '../svg/logo';

const Header = () => {
	return (
		<div className="mdc-layout-grid__inner">
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-1 mdc-layout-grid__cell--align-middle">
				{ <Logo /> }
			</div>
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-11 mdc-layout-grid__cell--align-middle">
				<h2 className="mdc-typography--headline5">
					{ __( 'Material Design for WordPress', 'material-theme-builder' ) }
				</h2>
			</div>
		</div>
	);
};

export default Header;

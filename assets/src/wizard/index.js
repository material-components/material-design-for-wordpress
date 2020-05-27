import React from 'react';
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Wizard = () => {
	return (
		<div className="material-wizard">
			<h2>
				{ __( 'Material Design for WordPress', 'material-theme-builder' ) }
			</h2>
		</div>
	);
};

render( <Wizard />, document.getElementById( 'material-onboarding-wizard' ) );

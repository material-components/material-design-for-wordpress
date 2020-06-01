/* global mtbWizard */
import React from 'react';
import { __ } from '@wordpress/i18n';
import Card from './card';

/**
 * Welcome screen
 */
const Welcome = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<Card image={ mtbWizard.placeholderImage } imageSpan="5">
				<h3 className="mdc-typography--headline4">
					{ __( 'Start building', 'material-theme-builder' ) }
				</h3>

				<p>
					{ __(
						'Material Design for Wordpress lets you use Material Components and custom styles in your Wordpress site.',
						'material-theme-builder'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Welcome;

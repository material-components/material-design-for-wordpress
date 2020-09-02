/* global mtbWizard, mtbOnboarding */
import React from 'react';
import { __ } from '@wordpress/i18n';
import { ADDONS } from '../../constants';
import Card from './card';

/**
 * Addon selection screen
 */
const Addons = () => {
	return (
		<div className="mdc-layout-grid__cell--span-12">
			<h3 className="mdc-typography--headline3 material-wizard__title">
				{ __( 'Install addons', 'material-theme-builder' ) }
			</h3>

			<Card
				image={ `${ mtbWizard.assetsPath }addon-material-theme.png` }
				switch={ ADDONS.OVERVIEW }
				disabled={ 'ok' === mtbOnboarding.themeStatus }
			>
				<h4 className="mdc-typography--headline4">
					{ __( 'Material Theme', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'This applies Material Design principles and Material Theming to your site, so you can customize its style.',
						'material-theme-builder'
					) }
				</p>
			</Card>

			<hr />

			<Card
				image={ `${ mtbWizard.assetsPath }addon-quick-start-examples.png` }
				switch={ ADDONS.OVERVIEW }
			>
				<h4 className="mdc-typography--headline4">
					{ __( 'Quick Start Examples', 'material-theme-builder' ) }
				</h4>

				<p>
					{ __(
						'Contains a number of page examples for home, about, a projects page, blog, and a contact page. These layouts show different ways you can use Material Components to address common user needs.',
						'material-theme-builder'
					) }
				</p>
			</Card>
		</div>
	);
};

export default Addons;

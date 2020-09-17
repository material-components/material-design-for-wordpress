/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../get-config';

export const Wizard = props => {
	return (
		<>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __(
					'Quick Start',
					'material-theme-builder'
				) }
			</h2>
			<p>
				{ __(
					'Install the Material Theme and quick start examples.',
					'material-theme-builder'
				) }
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Re-run quick start', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					onClick={ props.handleClick }
					link={ getConfig( 'wizardUrl' ) }
				/>
			</div>
		</>
	);
};

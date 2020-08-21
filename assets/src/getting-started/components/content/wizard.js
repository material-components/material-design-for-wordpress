/* global mtbGsm */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

export const Wizard = props => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Quick Start', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus,
				at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare
				metus varius in.
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Re-run Wizard', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					onClick={ props.handleClick }
					link={ mtbGsm.wizardUrl }
				/>
			</div>
		</Fragment>
	);
};

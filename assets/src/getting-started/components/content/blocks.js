/* global mtbGsm */
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

export const Blocks = () => {
	return (
		<Fragment>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __( 'Material blocks', 'material-theme-builder' ) }
			</h2>
			<p className="material-gsm__content-description">
				Aenean egestas, ante vitae placerat tempor, felis ipsum finibus lectus,
				at eleifend neque tellus ac elit. Praesent cursus lectus felis, a ornare
				metus varius in.
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Explore', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					link={ mtbGsm.editorUrl }
				/>
			</div>
		</Fragment>
	);
};

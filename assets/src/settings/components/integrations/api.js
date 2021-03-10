/**
 * WordPress dependencies
 */
import { useState, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import SettingsContext from '../../context';

const Api = () => {
	const { state } = useContext( SettingsContext );
	const [ api, setApi ] = useState( null );

	return (
		<div className="material-settings__api mdc-layout-grid">
			<div className="mdc-layout-grid__inner">
				<TextControl
					className="material-settings__api-input mdc-layout-grid__cell"
					value={ api }
					placeholder={ __( 'Google API Key', 'material-design' ) }
					onChange={ value => {
						console.log( value );
						setApi( value );
					} }
				/>

				<div className="mdc-layout-grid__cell">
					<button
						className="mdc-button mdc-button--raised"
						disabled={ ! api && ! state.api }
					>
						<span className="mdc-button__label">
							{ __( 'Activate', 'material-design' ) }
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Api;

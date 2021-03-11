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
import { ACTIONS, KEY_PLACEHOLDER } from '../../constants';
import Button from '../../../wizard/components/navigation/button';

const Api = () => {
	const { state, dispatch } = useContext( SettingsContext );
	const [ api, setApi ] = useState( null );
	const isApiOk = 'ok' === state.apiStatus;

	const removeApiKey = () => {
		dispatch( { type: ACTIONS.REMOVE_API_KEY } );
	};

	const activateApiKey = () => {
		dispatch( { type: ACTIONS.ADD_API_KEY, payload: { key: api } } );
		setApi( '' );
	};

	return (
		<div className="material-settings__api mdc-layout-grid">
			<div className="mdc-layout-grid__inner">
				{ ! isApiOk && (
					<TextControl
						className="material-settings__api-input mdc-layout-grid__cell"
						value={ api }
						placeholder={ __( 'Google API Key', 'material-design' ) }
						onChange={ value => {
							setApi( value );
						} }
					/>
				) }

				{ isApiOk && (
					<TextControl
						className="material-settings__api-input material-settings__api-input--disabled mdc-layout-grid__cell"
						value={ KEY_PLACEHOLDER }
						disabled
					/>
				) }

				<div className="mdc-layout-grid__cell">
					{ ! isApiOk && (
						<button
							className="mdc-button mdc-button--raised"
							disabled={ ! api }
							onClick={ activateApiKey }
						>
							<span className="mdc-button__label">
								{ __( 'Activate', 'material-design' ) }
							</span>
						</button>
					) }

					{ isApiOk && (
						<Button
							text={ __( 'Remove', 'material-design' ) }
							leadingIcon="delete"
							onClick={ removeApiKey }
						/>
					) }
				</div>
			</div>
		</div>
	);
};

export default Api;

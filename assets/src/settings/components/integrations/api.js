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
	const isApiOk = 'ok' === state.apiStatus;

	return (
		<div className="material-settings__api mdc-layout-grid">
			<div className="mdc-layout-grid__inner">
				{ ! isApiOk && (
					<TextControl
						className="material-settings__api-input mdc-layout-grid__cell"
						value={ api }
						placeholder={ __( 'Google API Key', 'material-design' ) }
						onChange={ value => {
							console.log( value );
							setApi( value );
						} }
					/>
				) }

				{ isApiOk && (
					<TextControl
						className="material-settings__api-input material-settings__api-input--disabled mdc-layout-grid__cell"
						value="•••••••••••••••••••••••••••••"
						disabled
					/>
				) }

				<div className="mdc-layout-grid__cell">
					{ ! isApiOk && (
						<button
							className="mdc-button mdc-button--raised"
							disabled={ ! api }
						>
							<span className="mdc-button__label">
								{ __( 'Activate', 'material-design' ) }
							</span>
						</button>
					) }

					{ isApiOk && (
						<button className="mdc-button">
							<i
								className="material-icons mdc-button__icon leading-icon"
								aria-hidden="true"
							>
								delete
							</i>
							<span className="mdc-button__label">
								{ __( 'Remove', 'material-design' ) }
							</span>
						</button>
					) }
				</div>
			</div>
		</div>
	);
};

export default Api;

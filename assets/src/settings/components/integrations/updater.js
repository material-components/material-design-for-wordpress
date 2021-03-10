/**
 * External dependencies
 */
import _uniqueId from 'lodash/uniqueId';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingsContext from '../../context';
import Switch from './switch';

const Updater = ( { title, lastUpdated, needsKey, checked, onChange } ) => {
	const [ id ] = useState( _uniqueId( 'updater-' ) );
	const { state } = useContext( SettingsContext );
	const isDisabled = needsKey && ! state.apiKey;

	return (
		<div className="material-settings__updater">
			<div className="mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid__cell--align-middle">
						<h3 className="mdc-typography--headline6">{ title }</h3>

						{ isDisabled && (
							<p
								className="mdc-typography--body1"
								dangerouslySetInnerHTML={ {
									__html: sprintf(
										__(
											'To enable Google Fonts updates please %s first',
											'material-design'
										),
										`<a href="http://google.com">${ __(
											'activate Google API Key',
											'material-design'
										) }</a>`
									),
								} }
							></p>
						) }

						{ ! isDisabled && (
							<p className="mdc-typography--body1">{ lastUpdated }</p>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--align-middle material-settings__cell--justify-end">
						{ ! isDisabled && (
							<Switch checked={ checked } onChange={ onChange } id={ id } />
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--align-middle material-settings__cell--justify-end">
						{ isDisabled && (
							<div className="material-settings__message material-settings__message--error">
								<i
									className="material-icons mdc-button__icon leading-icon"
									aria-hidden="true"
								>
									error
								</i>
								<span className="material-settings__message-text">
									{ __( 'Updates disabled', 'material-design' ) }
								</span>
							</div>
						) }

						{ ! isDisabled && (
							<button className="mdc-button mdc-button--raised">
								<i
									className="material-icons mdc-button__icon leading-icon"
									aria-hidden="true"
								>
									cached
								</i>
								<span className="mdc-button__label">
									{ __( 'Update', 'material-design' ) }
								</span>
							</button>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Updater;

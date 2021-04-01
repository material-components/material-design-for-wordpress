/**
 * External dependencies
 */
import _uniqueId from 'lodash/uniqueId';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
import { dateI18n } from '@wordpress/date';

/**
 * Internal dependencies
 */
import { ACTIONS } from '../../constants';
import SettingsContext from '../../context';
import Switch from './switch';
import Button from '../../../wizard/components/navigation/button';
import { update } from '../../utils';

const Updater = ( {
	title,
	lastUpdated,
	needsKey,
	checked,
	type,
	onChange,
} ) => {
	const [ id ] = useState( _uniqueId( 'updater-' ) );
	const { state, dispatch } = useContext( SettingsContext );
	const isDisabled = needsKey && 'ok' !== state.apiStatus;
	const updatedDate = lastUpdated
		? dateI18n( 'M j, Y, h:i A', lastUpdated )
		: __( 'never', 'material-design' );
	const [ isUpdating, setIsUpdating ] = useState( false );
	const shouldUpdate = ! isDisabled && state.updaters[ type ].updateAvailable;
	const shouldNotUpdate =
		! isDisabled && ! state.updaters[ type ].updateAvailable;

	const handleUpdate = response => {
		setIsUpdating( true );

		update( type ).then( () => {
			setIsUpdating( false );
			dispatch( {
				type: ACTIONS.SET_UPDATED,
				payload: {
					type,
					lastUpdated: response.lastUpdated,
				},
			} );
		} );

	};

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
										`<a href="https://developers.google.com/fonts/docs/developer_api#APIKey">${ __(
											'activate Google API Key',
											'material-design'
										) }</a>`
									),
								} }
							></p>
						) }

						{ ! isDisabled && (
							<p className="mdc-typography--body1">
								{ sprintf(
									__( 'Last update on %s', 'material-design' ),
									updatedDate
								) }
							</p>
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

						{ shouldUpdate && (
							<Button
								style="mdc-button--raised"
								text={ __( 'Update', 'material-design' ) }
								leadingIcon="cached"
								onClick={ handleUpdate }
								loading={ isUpdating }
							/>
						) }

						{ shouldNotUpdate && (
							<Button
								style="mdc-button--raised"
								leadingIcon="done"
								disabled={ true }
								text={ __( 'Updated', 'material-design' ) }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Updater;

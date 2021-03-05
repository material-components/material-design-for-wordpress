/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Updater from './updater';
import SettingsContext from '../../context';
import { UPDATERS, ACTIONS } from '../../constants';

const Integrations = () => {
	const { state, dispatch } = useContext( SettingsContext );

	const handleUpdateChange = type => {
		dispatch( { type: ACTIONS.TOGGLE_UPDATES, payload: { update: type } } );
	};

	return (
		<div className="material-settings__integrations">
			<h2 className="mdc-typography--headline6">
				{ __( 'Integrations', 'material-design' ) }
			</h2>

			<p
				className="mdc-typography--body1"
				dangerouslySetInnerHTML={ {
					__html: sprintf(
						__(
							'Integrate %s and %s to get the most out of the Material Theme.',
							'material-design'
						),
						`<a href="http://google.com">${ __(
							'Google Fonts',
							'material-design'
						) }</a>`,
						`<a href="http://material.io">${ __(
							'Material icons',
							'material-design'
						) }</a>`
					),
				} }
			></p>

			<p className="mdc-typography--body1">
				{ __(
					'Turn on auto-updater or update your resources manually.',
					'material-design'
				) }
			</p>

			<div className="material-settings__updates">
				<Updater
					title={ __( 'Google Fonts', 'material-design' ) }
					disabled={ true }
					needsKey={ true }
					checked={ state.updates[ UPDATERS.FONT ] }
					onChange={ () => {
						handleUpdateChange( UPDATERS.FONT );
					} }
				/>

				<Updater
					title={ __( 'Material Icons', 'material-design' ) }
					lastUpdated={ Date.now() }
					checked={ state.updates[ UPDATERS.ICON ] }
					onChange={ () => {
						handleUpdateChange( UPDATERS.ICON );
					} }
				/>
			</div>
		</div>
	);
};

export default Integrations;

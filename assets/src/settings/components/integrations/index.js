/**
 * External dependencies
 */
import uniqueId from 'lodash/uniqueId';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingsContext from '../../context';
import { UPDATERS, ACTIONS } from '../../constants';
import Updater from './updater';
import Api from './api';

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
				{ Object.keys( UPDATERS ).map( key => (
					<Updater
						key={ uniqueId( 'updater-' ) }
						title={ UPDATERS[ key ].title }
						needsKey={ UPDATERS[ key ].needsKey }
						checked={ state.updates[ UPDATERS[ key ].type ] }
						lastUpdated={ state.updaters[ key ].lastUpdated }
						type={ UPDATERS[ key ].type }
						onChange={ () => {
							handleUpdateChange( UPDATERS[ key ].type );
						} }
					/>
				) ) }
			</div>

			<h2 className="mdc-typography--headline6">
				{ __( 'Google API Key', 'material-design' ) }
			</h2>

			<p
				className="mdc-typography--body1"
				dangerouslySetInnerHTML={ {
					__html: sprintf(
						__(
							'To use Google Fonts in Material Theme, please activate your %s and enable updates',
							'material-design'
						),
						`<a href="http://google.com">${ __(
							'Google API Key',
							'material-design'
						) }</a>`
					),
				} }
			></p>

			<Api />
		</div>
	);
};

export default Integrations;

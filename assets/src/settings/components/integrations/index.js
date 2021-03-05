/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Updater from './updater';

const Integrations = () => {
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
				/>

				<Updater
					title={ __( 'Material Icons', 'material-design' ) }
					lastUpdated={ Date.now() }
				/>
			</div>
		</div>
	);
};

export default Integrations;

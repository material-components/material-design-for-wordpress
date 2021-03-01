/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

const Integrations = () => {
	return (
		<div className="mdc-layout-grid material-settings__integrations">
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
		</div>
	);
};

export default Integrations;

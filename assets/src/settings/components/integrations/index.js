/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const Integrations = () => {
	return (
		<div className="mdc-layout-grid material-settings__integrations">
			<h2 className="mdc-typography--headline6">
				{ __( 'Integrations', 'material-design' ) }
			</h2>

			<p className="mdc-typography--body1">
				{ __(
					'Integrate Google Fonts and Material icons to get the most out of the Material Theme.',
					'material-design'
				) }
			</p>

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

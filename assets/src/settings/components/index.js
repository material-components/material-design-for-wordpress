/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Integrations from './integrations';

const Settings = () => {
	return (
		<>
			<div className="mdc-layout-grid__inner">
				<h1 className="mdc-typography--headline3">
					{ __( 'Material Settings', 'material-design' ) }
				</h1>

				<Integrations />
			</div>
		</>
	);
};

export default Settings;

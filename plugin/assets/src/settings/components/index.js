/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SettingsProvider } from '../context';
import Errors from './errors';
import Integrations from './integrations';

const Settings = () => {
	return (
		<SettingsProvider>
			<h1 className="mdc-typography--headline3">
				{ __( 'Material Settings', 'material-design' ) }
			</h1>

			<Errors />

			<Integrations />
		</SettingsProvider>
	);
};

export default Settings;

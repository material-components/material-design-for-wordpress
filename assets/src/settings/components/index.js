/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

const Settings = () => {
	return (
		<>
			<div className="mdc-layout-grid__inner">
				<h1 className="mdc-typography--headline3">
					{ __( 'Material Settings', 'material-design' ) }
				</h1>
			</div>
		</>
	);
};

export default Settings;

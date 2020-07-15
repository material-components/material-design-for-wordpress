import { __ } from '@wordpress/i18n';
import { TABS } from '../../constants';
import Tab from './tab';

const Navigation = () => {
	return (
		<div className="material-gsm__navigation mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
			<div className="material-gsm__heading">
				<div className="mdc-typography--headline6">
					{ __( 'Getting Started', 'material-theme-builder' ) }
				</div>
			</div>
			<div className="material-gsm__tabs">
				{ Object.keys( TABS ).map( tab => (
					<Tab key={ tab } id={ tab } text={ TABS[ tab ].title } />
				) ) }
			</div>
		</div>
	);
};

export default Navigation;

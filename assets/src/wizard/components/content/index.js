/* global mtbWizard */
import React, { useContext, useEffect, Fragment } from 'react';
import StepContext from '../../context';
import { STEPS, STATUS, ADDONS, ACTIONS } from '../../constants';
import {
	handleDemoImporter,
	handleThemeActivation,
	redirectToSettings,
} from '../../utils';
import Welcome from './welcome';
import Addons from './addons';
import Work from './work';
import Notice from '../notice/index';

/**
 * Generic content wrapper
 */
const Content = () => {
	const { state, dispatch } = useContext( StepContext );
	const { addons, status } = state;

	const handleError = error => {
		window.scrollTo( 0, 0 );
		dispatch( { type: ACTIONS.WIZARD_ERROR, payload: error } );
	};

	useEffect( () => {
		if ( status === STATUS.PENDING ) {
			if ( 0 === addons.length ) {
				return window.location.replace( mtbWizard.settingsUrl );
			}

			if (
				addons.includes( ADDONS.THEME ) &&
				! addons.includes( ADDONS.DEMO )
			) {
				handleThemeActivation().catch( handleError );
			}

			if (
				addons.includes( ADDONS.DEMO ) &&
				! addons.includes( ADDONS.THEME )
			) {
				handleDemoImporter().catch( handleError );
			}

			if ( addons.includes( ADDONS.THEME ) && addons.includes( ADDONS.DEMO ) ) {
				handleThemeActivation()
					.then( () => {
						handleDemoImporter()
							.then( redirectToSettings )
							.catch( handleError );
					} )
					.catch( handleError );
			}
		}
	}, [ status, addons, dispatch ] );

	return (
		<Fragment>
			{ STATUS.ERROR === state.status && (
				<Notice type="notice-error" message={ state.error.message } />
			) }
			<div className="material-wizard__content mdc-layout-grid__inner">
				{ state.active === STEPS.WELCOME && <Welcome /> }
				{ state.active === STEPS.ADDONS && <Addons /> }
				{ state.active === STEPS.WORK && <Work /> }
			</div>
		</Fragment>
	);
};

export default Content;

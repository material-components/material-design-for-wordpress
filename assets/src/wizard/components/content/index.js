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

	useEffect( () => {
		if ( status === STATUS.PENDING ) {
			if ( 0 === addons.length ) {
				return window.location.replace( mtbWizard.settingsUrl );
			}

			const requests = [];

			if ( addons.includes( ADDONS.THEME ) ) {
				requests.push( handleThemeActivation() );
			}

			if (
				addons.includes( ADDONS.DEMO ) &&
				! addons.includes( ADDONS.THEME )
			) {
				requests.push( handleDemoImporter() );
			}

			Promise.all( requests ).then( values => {
				// Ensure menu items are attached to the theme.
				if (
					addons.includes( ADDONS.DEMO ) &&
					addons.includes( ADDONS.THEME )
				) {
					handleDemoImporter()
						.then( response => {
							redirectToSettings( response );
						} )
						.catch( error => {
							window.scrollTo( 0, 0 );
							dispatch( { type: ACTIONS.WIZARD_ERROR, payload: error } );
						} );
				} else {
					redirectToSettings( values[ 0 ] || values[ 1 ] );
				}
			} );
		}
	}, [ status ] );

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

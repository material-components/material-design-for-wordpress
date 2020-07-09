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

	/**
	 * Display error when found
	 *
	 * @param {Object} error WP_Error
	 */
	const handleError = error => {
		window.scrollTo( 0, 0 );
		dispatch( { type: ACTIONS.WIZARD_ERROR, payload: error } );
	};

	/**
	 * Decide fate of onboarding
	 *
	 * @param {Array} selectedAddons Selected addons
	 */
	const triggerOnboardingActions = selectedAddons => {
		if ( 0 === selectedAddons.length ) {
			return window.location.replace( mtbWizard.settingsUrl );
		}

		if (
			selectedAddons.includes( ADDONS.THEME ) &&
			! selectedAddons.includes( ADDONS.DEMO )
		) {
			handleThemeActivation()
				.then( redirectToSettings )
				.catch( handleError );
		}

		if (
			selectedAddons.includes( ADDONS.DEMO ) &&
			! selectedAddons.includes( ADDONS.THEME )
		) {
			handleDemoImporter()
				.then( redirectToSettings )
				.catch( handleError );
		}

		if (
			selectedAddons.includes( ADDONS.THEME ) &&
			selectedAddons.includes( ADDONS.DEMO )
		) {
			handleThemeActivation()
				.then( () => {
					handleDemoImporter()
						.then( redirectToSettings )
						.catch( handleError );
				} )
				.catch( handleError );
		}
	};

	useEffect( () => {
		if ( status === STATUS.PENDING ) {
			triggerOnboardingActions( addons );
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

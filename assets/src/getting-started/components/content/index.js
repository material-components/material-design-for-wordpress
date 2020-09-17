/**
 * WordPress dependencies
 */
import { useContext, useEffect } from '@wordpress/element';

/**
 * WordPress dependencies
 */
import { STATUS } from '../../../wizard/constants';
import {
	handleThemeActivation,
	handleDemoImporter,
} from '../../../wizard/utils';
import Notice from '../../../wizard/components/notice';
import TabContext from '../../context';
import { ACTIONS } from '../../constants';
import { Wizard, Overview, Customize } from './content';

const Content = () => {
	const { state, dispatch } = useContext( TabContext );
	const { activeTab, status, actionToInstall, error } = state;

	const handleClick = () => {
		dispatch( { type: ACTIONS.NEXT_STEP } );
	};

	/**
	 * Display error when found
	 *
	 * @param {Object} errorObject WP_Error
	 */
	const handleError = errorObject => {
		dispatch( { type: ACTIONS.ERROR, payload: errorObject } );
	};

	/**
	 * Move on to next step
	 */
	const handleThemeSuccess = () => {
		dispatch( { type: ACTIONS.THEME_INSTALLED } );
		dispatch( { type: ACTIONS.NEXT_STEP } );
	};

	/**
	 * Move on to next step
	 */
	const handleDemoSuccess = () => {
		dispatch( { type: ACTIONS.DEMO_INSTALLED } );
		dispatch( { type: ACTIONS.NEXT_STEP } );
	};

	useEffect( () => {
		if ( ! actionToInstall ) {
			return;
		}

		if (
			ACTIONS.ACTIVATE_THEME === actionToInstall ||
			ACTIONS.INSTALL_THEME === actionToInstall
		) {
			handleThemeActivation()
				.then( handleThemeSuccess )
				.catch( handleError );
		}

		if ( ACTIONS.INSTALL_DEMO_CONTENT === actionToInstall ) {
			handleDemoImporter()
				.then( handleDemoSuccess )
				.catch( handleError );
		}
	}, [ actionToInstall ] ); // eslint-disable-line

	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			{ STATUS.ERROR === status && (
				<Notice type="notice-error" message={ error.message } />
			) }
			{ 'WIZARD' === activeTab && <Wizard handleClick={ handleClick } /> }
			{ 'OVERVIEW' === activeTab && <Overview handleClick={ handleClick } /> }
			{ 'CUSTOMIZE' === activeTab && <Customize handleClick={ handleClick } /> }
		</div>
	);
};

export default Content;

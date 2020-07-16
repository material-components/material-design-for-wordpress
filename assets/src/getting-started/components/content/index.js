import { useContext, useEffect } from '@wordpress/element';
import { STATUS } from '../../../wizard/constants';
import {
	handleThemeActivation,
	handleDemoImporter,
} from '../../../wizard/utils';
import Notice from '../../../wizard/components/notice';
import TabContext from '../../context';
import { ACTIONS } from '../../constants';
import { Wizard, Theme, Demo, Editor, Blocks } from './content';

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
	const handleSuccess = () => {
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
				.then( handleSuccess )
				.catch( handleError );
		}

		if ( ACTIONS.INSTALL_DEMO_CONTENT === actionToInstall ) {
			handleDemoImporter()
				.then( handleSuccess )
				.catch( handleError );
		}
	}, [ actionToInstall, handleError, handleSuccess ] );

	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			{ STATUS.ERROR === status && (
				<Notice type="notice-error" message={ error.message } />
			) }
			{ 'WIZARD' === activeTab && <Wizard handleClick={ handleClick } /> }
			{ 'THEME' === activeTab && <Theme /> }
			{ 'DEMO' === activeTab && <Demo /> }
			{ 'EDITOR' === activeTab && <Editor handleClick={ handleClick } /> }
			{ 'BLOCKS' === activeTab && <Blocks /> }
		</div>
	);
};

export default Content;

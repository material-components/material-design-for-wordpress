import { useContext, useEffect } from '@wordpress/element';
import { STATUS } from '../../../wizard/constants';
import {
	handleThemeActivation,
	handleDemoImporter,
} from '../../../wizard/utils';
import Button from '../../../wizard/components/navigation/button';
import TabContext from '../../context';
import { TABS, ACTIONS } from '../../constants';

const Content = () => {
	const { state, dispatch } = useContext( TabContext );
	const { activeTab, status, actionToInstall } = state;
	const { title, actionText, content, link, icon, action } = TABS[ activeTab ];
	const isDisabled = ! icon;
	const isLoading = status === STATUS.PENDING;

	const handleClick = () => {
		dispatch( { type: action } );
	};

	/**
	 * Display error when found
	 *
	 * @param {Object} error WP_Error
	 */
	const handleError = error => {
		dispatch( { type: ACTIONS.ERROR, payload: error } );
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
	}, [ actionToInstall ] );

	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ title }
			</h2>
			<p className="material-gsm__content-description">{ content }</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ actionText }
					trailingIcon={ icon }
					onClick={ handleClick }
					link={ link }
					disabled={ isDisabled }
					loading={ isLoading }
				/>
			</div>
		</div>
	);
};

export default Content;

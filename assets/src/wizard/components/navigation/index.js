/* global mtbWizard */

/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from './button';
import StepContext from '../../context';
import { STEPS, STATUS, ACTIONS } from '../../constants';

/**
 * Nav buttons at the bottom of app
 */
const Navigation = () => {
	const { state, dispatch } = useContext( StepContext );
	const isLast = state.active === STEPS.WORK;
	const isAddons = state.active === STEPS.ADDONS;
	const isLoading = state.status === STATUS.PENDING;

	const handleClick = type => {
		if ( ACTIONS.SUBMIT_WIZARD === type ) {
		}

		if ( ACTIONS.NEXT_STEP === type ) {
			if ( isAddons ) {
				dispatch( { type: ACTIONS.SUBMIT_WIZARD } );
			} else {
				window.scrollTo( 0, 0 );
				dispatch( { type: ACTIONS.NEXT_STEP } );
			}
		}

		if ( ACTIONS.PREVIOUS_STEP === type ) {
			window.scrollTo( 0, 0 );
			dispatch( { type: ACTIONS.PREVIOUS_STEP } );
		}
	};

	return (
		<div className="mdc-layout-grid__inner">
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-7">
				<Button
					style="material-wizard__close"
					text={ __( 'Close', 'material-theme-builder' ) }
					link={ mtbWizard.settingsUrl }
				/>
			</div>
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-5">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
						{ state.active !== STEPS.WELCOME && (
							<Button
								style="material-wizard__next"
								text={ __( 'Previous Step', 'material-theme-builder' ) }
								leadingIcon="navigate_before"
								onClick={ () => handleClick( ACTIONS.PREVIOUS_STEP ) }
							/>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
						{ ! isLast && (
							<Button
								style="material-wizard__next mdc-button--raised"
								text={ __( 'Next Step', 'material-theme-builder' ) }
								trailingIcon="navigate_next"
								onClick={ () => handleClick( ACTIONS.NEXT_STEP ) }
								loading={ isLoading }
							/>
						) }
						{ isLast && (
							<Button
								style="material-wizard__next mdc-button--raised"
								text={ __( 'Finish', 'material-theme-builder' ) }
								trailingIcon="navigate_next"
								link={ mtbWizard.settingsUrl }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;

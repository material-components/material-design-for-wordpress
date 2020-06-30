/* global mtbWizard */
import React, { useContext } from 'react';
import { __ } from '@wordpress/i18n';
import Button from './button';
import StepContext from '../../context';
import { STEPS, STATUS, ACTIONS } from '../../constants';

/**
 * Nav buttons at the bottom of app
 */
const Navigation = () => {
	const { state, dispatch } = useContext( StepContext );
	const isLast = state.active === STEPS.WORK;
	const isLoading = state.status === STATUS.PENDING;

	const handleClick = type => {
		if ( ACTIONS.START_SUBMIT_WIZARD === type ) {
			dispatch( { type: ACTIONS.SUBMIT_WIZARD } );
		}

		if ( ACTIONS.NEXT_STEP === type ) {
			window.scrollTo( 0, 0 );
			dispatch( { type: ACTIONS.NEXT_STEP } );
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
								onClick={ () => handleClick( 'PREVIOUS_STEP' ) }
							/>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
						{ ! isLast && (
							<Button
								style="material-wizard__next mdc-button--raised"
								text={ __( 'Next Step', 'material-theme-builder' ) }
								trailingIcon="navigate_next"
								onClick={ () => handleClick( 'NEXT_STEP' ) }
							/>
						) }
						{ isLast && (
							<Button
								style="material-wizard__next mdc-button--raised"
								text={ __( 'Finish', 'material-theme-builder' ) }
								trailingIcon="navigate_next"
								onClick={ () => handleClick( 'START_SUBMIT_WIZARD' ) }
								loading={ isLoading }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;

/* global mtbWizard */
import React, { useContext } from 'react';
import { __ } from '@wordpress/i18n';
import Button from './button';
import StepContext from '../../context';
import { STEPS } from '../../steps';

const actions = {
	SUBMIT_WIZARD: 'SUBMIT_WIZARD',
	NEXT_STEP: 'NEXT_STEP',
	PREVIOUS_STEP: 'PREVIOUS_STEP',
};

/**
 * Nav buttons at the bottom of app
 */
const Navigation = () => {
	const { state, dispatch } = useContext( StepContext );
	const isLast = state.active === STEPS.WORK;

	const handleClick = type => {
		if ( actions.SUBMIT_WIZARD === type ) {
			dispatch( { type: actions.SUBMIT_WIZARD } );
		}

		if ( actions.NEXT_STEP === type ) {
			window.scrollTo( 0, 0 );
			dispatch( { type: actions.NEXT_STEP } );
		}

		if ( actions.PREVIOUS_STEP === type ) {
			window.scrollTo( 0, 0 );
			dispatch( { type: actions.PREVIOUS_STEP } );
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
								onClick={ () => handleClick( 'SUBMIT_WIZARD' ) }
								loading={ state.loading }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;

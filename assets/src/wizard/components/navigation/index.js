/* global mtbWizard */
import React, { useContext } from 'react';
import { __ } from '@wordpress/i18n';
import Button from './button';
import StepContext from '../../context';
import { STEPS } from '../../steps';

const Navigation = () => {
	const { active, previousStep, nextStep } = useContext( StepContext );

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
						{ active !== STEPS.WELCOME && (
							<Button
								style="material-wizard__next"
								text={ __( 'Previous Step', 'material-theme-builder' ) }
								leadingIcon="navigate_before"
								onClick={ previousStep }
							/>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
						<Button
							style="material-wizard__next mdc-button--raised"
							text={ __( 'Next Step', 'material-theme-builder' ) }
							trailingIcon="navigate_next"
							onClick={ nextStep }
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;

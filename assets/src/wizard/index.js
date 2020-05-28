import React, { useState } from 'react';
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { StepProvider } from './context';
import { STEPS } from './steps';
import ProgressBar from './components/progress-bar';
import Navigation from './components/navigation';
import Content from './components/content';

const Wizard = () => {
	const [ step, setStep ] = useState( STEPS.WELCOME );
	const [ previousSteps, setPreviousSteps ] = useState( [] );
	const steps = Object.keys( STEPS );

	const nextStep = () => {
		const stepIndex = steps.indexOf( step );

		if ( stepIndex + 1 === steps.length ) {
			return step;
		}

		setPreviousSteps( [ step, ...previousSteps ] );
		setStep( steps[ stepIndex + 1 ] );
	};

	const previousStep = () => {
		const stepIndex = steps.indexOf( step );

		if ( stepIndex === 1 ) {
			setPreviousSteps( [] );
		} else {
			setPreviousSteps( previousSteps.filter( item => item !== step ) );
		}

		setStep( steps[ stepIndex - 1 ] );
	};

	const initialContext = {
		active: step,
		previous: previousSteps,
		nextStep,
		previousStep,
	};

	return (
		<StepProvider value={ initialContext }>
			<div className="material-wizard mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--align-middle">
						<h2 className="mdc-typography--headline5">
							{ __(
								'Material Design for WordPress',
								'material-theme-builder'
							) }
						</h2>
					</div>
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--align-middle">
						<ProgressBar />
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
						<Content />
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-12 material-wizard__navigation">
						<Navigation />
					</div>
				</div>
			</div>
		</StepProvider>
	);
};

render( <Wizard />, document.getElementById( 'material-onboarding-wizard' ) );

import React, { useState } from 'react';
import { render } from '@wordpress/element';
import { StepProvider } from './context';
import { STEPS } from './steps';
import ProgressBar from './components/progress-bar';
import Navigation from './components/navigation';
import Content from './components/content';
import Header from './components/header';

const Wizard = () => {
	const [ step, setStep ] = useState( STEPS.WELCOME );
	const [ previousSteps, setPreviousSteps ] = useState( [] );
	const [ addons, setAddons ] = useState( [] );
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

	const toggleAddon = id => {
		if ( ! addons.includes( id ) ) {
			setAddons( [ id, ...addons ] );
		} else {
			setAddons( addons.filter( item => item !== id ) );
		}
	};

	const initialContext = {
		active: step,
		previous: previousSteps,
		addons,
		toggleAddon,
		nextStep,
		previousStep,
	};

	return (
		<StepProvider value={ initialContext }>
			<div className="material-wizard mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--align-middle">
						<Header />
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

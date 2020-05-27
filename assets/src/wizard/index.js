import React from 'react';
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { StepProvider } from './context';
import { STEPS } from './steps';
import ProgressBar from './components/progress-bar';

const Wizard = () => {
	const initialContext = {
		active: STEPS.WELCOME,
		previous: [],
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
						wrapper
					</div>
				</div>
			</div>
		</StepProvider>
	);
};

render( <Wizard />, document.getElementById( 'material-onboarding-wizard' ) );

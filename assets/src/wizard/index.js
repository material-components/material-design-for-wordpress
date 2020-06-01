import React from 'react';
import { render } from '@wordpress/element';
import { StepProvider } from './context';
import ProgressBar from './components/progress-bar';
import Navigation from './components/navigation';
import Content from './components/content';
import Header from './components/header';

const Wizard = () => {
	return (
		<StepProvider>
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

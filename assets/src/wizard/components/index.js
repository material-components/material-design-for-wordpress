import { StepProvider } from '../context';
import ProgressBar from './progress-bar';
import Navigation from './navigation';
import Content from './content';
import Header from './header';

/**
 * Renders basic layout
 */
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

export default Wizard;

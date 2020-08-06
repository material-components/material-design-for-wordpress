import { TabProvider } from '../context';
import Navigation from './navigation';
import Content from './content';

const GettingStarted = () => {
	return (
		<TabProvider>
			<div className="mdc-layout-grid mdc-typography">
				<div className="mdc-layout-grid__inner">
					<Navigation />
					<Content />
				</div>
			</div>
		</TabProvider>
	);
};

export default GettingStarted;

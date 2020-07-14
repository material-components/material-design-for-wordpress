import { render } from '@wordpress/element';
import { TabProvider } from './context';
import Navigation from './components/navigation';
import Content from './components/content';

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

render( <GettingStarted />, document.getElementById( 'material-gsm' ) );

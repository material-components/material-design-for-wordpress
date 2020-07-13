import { render } from '@wordpress/element';
import Navigation from './components/navigation';
import Content from './components/content';

const GettingStarted = () => {
	return (
		<div className="mdc-layout-grid">
			<div className="mdc-layout-grid__inner">
				<Navigation />
				<Content />
			</div>
		</div>
	);
};

render( <GettingStarted />, document.getElementById( 'material-gsm' ) );

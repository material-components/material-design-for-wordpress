import { useContext } from '@wordpress/element';
import Button from '../../../wizard/components/navigation/button';
import TabContext from '../../context';
import { ACTIONS, TABS } from '../../constants';

const Content = () => {
	const { state, dispatch } = useContext( TabContext );
	const { title, action, content } = TABS[ state.activeTab ];

	const handleClick = () => {
		dispatch( { type: ACTIONS.NEXT_STEP } );
	};

	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ title }
			</h2>
			<p className="material-gsm__content-description">{ content }</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ action }
					trailingIcon="navigate_next"
					onClick={ handleClick }
				/>
			</div>
		</div>
	);
};

export default Content;

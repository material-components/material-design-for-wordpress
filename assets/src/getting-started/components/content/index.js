import { useContext } from '@wordpress/element';
import Button from '../../../wizard/components/navigation/button';
import TabContext from '../../context';
import { ACTIONS, TABS } from '../../constants';

const Content = () => {
	const { state, dispatch } = useContext( TabContext );
	const { title, actionText, content, link, icon } = TABS[ state.activeTab ];
	const isDisabled = ! icon;

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
					text={ actionText }
					trailingIcon={ icon }
					onClick={ handleClick }
					link={ link }
					disabled={ isDisabled }
				/>
			</div>
		</div>
	);
};

export default Content;

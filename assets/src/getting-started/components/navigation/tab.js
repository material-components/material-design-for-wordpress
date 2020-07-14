import { useContext } from '@wordpress/element';
import TabContext from '../../context';
import { ACTIONS } from '../../constants';

const Tab = props => {
	const { dispatch } = useContext( TabContext );
	const { text } = props;

	const handleClick = () => {
		dispatch( { type: ACTIONS.GOTO_STEP, payload: { value: props.id } } );
	};

	return (
		<button className="material-gsm__tab" type="button" onClick={ handleClick }>
			<i className="material-icons">lens</i>
			<div className="material-gsm__tab-title">{ text }</div>
		</button>
	);
};

export default Tab;

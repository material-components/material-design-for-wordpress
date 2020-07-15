import { useContext } from '@wordpress/element';
import classNames from 'classnames';
import TabContext from '../../context';
import { ACTIONS } from '../../constants';

const Tab = props => {
	const { state, dispatch } = useContext( TabContext );
	const { text } = props;
	const isCompleted = state.previous.includes( props.id );

	const handleClick = () => {
		dispatch( { type: ACTIONS.GOTO_STEP, payload: { value: props.id } } );
	};

	return (
		<button
			className={ classNames( 'material-gsm__tab', {
				'material-gsm__tab-completed': isCompleted,
			} ) }
			type="button"
			onClick={ handleClick }
		>
			<i className="material-icons">lens</i>
			<div className="material-gsm__tab-title">{ text }</div>
		</button>
	);
};

export default Tab;

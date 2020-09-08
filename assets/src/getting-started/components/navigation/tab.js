/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import classNames from 'classnames';
import TabContext from '../../context';
import { ACTIONS } from '../../constants';

const Tab = props => {
	const { state, dispatch } = useContext( TabContext );
	const { text } = props;
	const isActive = state.activeTab === props.id;
	const isCompleted = state.completed.includes( props.id );
	const icon = isCompleted ? 'check_circle_outline' : 'lens';

	const handleClick = () => {
		dispatch( { type: ACTIONS.GOTO_STEP, payload: { value: props.id } } );
	};

	return (
		<button
			className={ classNames( 'material-gsm__tab', {
				'material-gsm__tab-completed': isCompleted,
				'material-gsm__tab-active': isActive,
			} ) }
			type="button"
			onClick={ handleClick }
		>
			<i className="material-icons">{ icon }</i>
			<div className="material-gsm__tab-title">{ text }</div>
		</button>
	);
};

export default Tab;

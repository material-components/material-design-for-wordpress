/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

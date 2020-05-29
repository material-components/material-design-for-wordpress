import React, { useContext } from 'react';
import StepContext from '../../context';
import { Check } from '../svg/check';

const Step = props => {
	const stepContext = useContext( StepContext );
	const isActive = props.id === stepContext.active;
	const isChecked = stepContext.previous.includes( props.id );
	let status = '';

	if ( isActive ) {
		status = 'active';
	} else if ( isChecked ) {
		status = 'checked';
	}

	return (
		<li className={ status }>
			<span className="material-wizard__progress-dot"></span>
			<span className="material-wizard__progress-check">
				<Check />
			</span>
		</li>
	);
};

export default Step;

import React from 'react';
import { STEPS } from '../../constants';
import Step from './step';

/**
 * Displays which step are we on
 */
const ProgressBar = () => {
	const steps = Object.keys( STEPS );

	return (
		<ul className="material-wizard__progress">
			{ steps.map( id => (
				<Step id={ id } key={ id } />
			) ) }
		</ul>
	);
};

export default ProgressBar;

import React from 'react';
import { STEPS } from '../../steps';
import Step from './step';

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

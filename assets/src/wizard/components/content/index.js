import React, { useContext } from 'react';
import StepContext from '../../context';
import { STEPS } from '../../steps';
import Welcome from './welcome';
import Addons from './addons';
import Work from './work';

const Content = () => {
	const { state } = useContext( StepContext );

	return (
		<div className="material-wizard__content mdc-layout-grid__inner">
			{ state.active === STEPS.WELCOME && <Welcome /> }
			{ state.active === STEPS.ADDONS && <Addons /> }
			{ state.active === STEPS.WORK && <Work /> }
		</div>
	);
};

export default Content;

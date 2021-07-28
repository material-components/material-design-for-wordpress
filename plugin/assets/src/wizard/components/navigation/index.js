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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from './button';
import StepContext from '../../context';
import { STEPS, STATUS, ACTIONS } from '../../constants';
import getConfig from '../../../admin/get-config';

/**
 * Nav buttons at the bottom of app
 */
const Navigation = () => {
	const { state, dispatch } = useContext( StepContext );
	const isLast = state.active === STEPS.WORK;
	const isAddons = state.active === STEPS.ADDONS;
	const isLoading = state.status === STATUS.PENDING;

	const handleClick = type => {
		if ( ACTIONS.SUBMIT_WIZARD === type ) {
		}

		if ( ACTIONS.NEXT_STEP === type ) {
			if ( isAddons ) {
				dispatch( { type: ACTIONS.SUBMIT_WIZARD } );
			} else {
				window.scrollTo( 0, 0 );
				dispatch( { type: ACTIONS.NEXT_STEP } );
			}
		}

		if ( ACTIONS.PREVIOUS_STEP === type ) {
			window.scrollTo( 0, 0 );
			dispatch( { type: ACTIONS.PREVIOUS_STEP } );
		}
	};

	return (
		<div className="mdc-layout-grid__inner">
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-7">
				<Button
					style="material-wizard__close"
					text={ __( 'Close', 'material-design' ) }
					link={ getConfig( 'settingsUrl' ) }
				/>
			</div>
			<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-5">
				<div className="mdc-layout-grid__inner">
					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
						{ state.active !== STEPS.WELCOME && (
							<Button
								style="material-wizard__next"
								text={ __( 'Previous Step', 'material-design' ) }
								leadingIcon="navigate_before"
								onClick={ () => handleClick( ACTIONS.PREVIOUS_STEP ) }
							/>
						) }
					</div>

					<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
						{ ! isLast && (
							<Button
								style="material-wizard__next mdc-button--raised"
								text={ __( 'Next Step', 'material-design' ) }
								trailingIcon="navigate_next"
								onClick={ () => handleClick( ACTIONS.NEXT_STEP ) }
								loading={ isLoading }
							/>
						) }
						{ isLast && (
							<Button
								style="material-wizard__next mdc-button--raised"
								text={ __( 'Finish', 'material-design' ) }
								trailingIcon="navigate_next"
								link={ getConfig( 'settingsUrl' ) }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;

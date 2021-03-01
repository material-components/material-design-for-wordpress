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
import { __ } from '@wordpress/i18n';
import { useEffect, useContext } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TabContext from '../../context';
import { TABS, ACTIONS } from '../../constants';
import getConfig from '../../get-config';
import Tab from './tab';

const Navigation = () => {
	const { dispatch } = useContext( TabContext );

	useEffect( () => {
		// Change initial tab if content and theme are already installed.
		if ( 'ok' === getConfig( 'themeStatus' ) ) {
			dispatch( { type: ACTIONS.SET_THEME_OK } );
			dispatch( { type: ACTIONS.GOTO_STEP, payload: { value: 'CUSTOMIZE' } } );
			dispatch( {
				type: ACTIONS.MARK_COMPLETE,
				payload: { value: [ 'WIZARD' ] },
			} );
			dispatch( {} );
		}

		if ( 'ok' === getConfig( 'contentStatus' ) ) {
			dispatch( { type: ACTIONS.SET_DEMO_OK } );
			dispatch( { type: ACTIONS.GOTO_STEP, payload: { value: 'CUSTOMIZE' } } );
			dispatch( {
				type: ACTIONS.MARK_COMPLETE,
				payload: {
					value: [ 'WIZARD' ],
				},
			} );
		}
	}, [] ); // eslint-disable-line

	return (
		<div className="material-gsm__navigation mdc-layout-grid__cell mdc-layout-grid__cell--span-3">
			<div className="material-gsm__heading">
				<div className="mdc-typography--headline6">
					{ __( 'Getting Started', 'material-design' ) }
				</div>
			</div>
			<div className="material-gsm__tabs">
				{ Object.keys( TABS ).map( tab => (
					<Tab key={ tab } id={ tab } text={ TABS[ tab ] } />
				) ) }
			</div>
		</div>
	);
};

export default Navigation;

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
import StepContext from '../../context';
import Switch from './switch';

/**
 * Diplay information related to the current screen.
 *
 * @param {*} props Inherited props
 */

const Card = props => {
	const imageSpan = props.imageSpan || 4;
	const { state } = useContext( StepContext );
	const checked = props.switch && state.addons.includes( props.switch );

	let contentSpan = props.contentSpan || 12 - imageSpan;

	if ( props.switch ) {
		contentSpan = contentSpan - 1;
	}

	return (
		<div className="material-wizard__card mdc-layout-grid__inner mdc-layout-grid__cell--align-middle">
			<div
				className={ `mdc-layout-grid__cell mdc-layout-grid__cell--span-${ imageSpan }` }
			>
				<img src={ props.image } alt="" />
			</div>
			<div
				className={ `mdc-layout-grid__cell mdc-layout-grid__cell--span-${ contentSpan } mdc-layout-grid__cell--align-middle` }
			>
				{ props.children }
			</div>
			{ props.switch && (
				<div
					className={ `mdc-layout-grid__cell mdc-layout-grid__cell--span-1 mdc-layout-grid__cell--align-middle` }
				>
					<Switch
						id={ props.switch }
						checked={ checked }
						disabled={ props.disabled }
					/>
				</div>
			) }
		</div>
	);
};

export default Card;

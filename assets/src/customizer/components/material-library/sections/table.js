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

/**
 * Internal dependencies
 */
import IconButtonLink from '../common/icon-button-link';

const Table = ( { radius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Data Tables', 'material-design' ) }
		</h4>
		<IconButtonLink href="https://material.io/components/data-tables"></IconButtonLink>
		<p>
			{ __(
				'Data tables display sets of data across rows and columns.',
				'material-design'
			) }
		</p>
		<div className="mdc-data-table" style={ { borderRadius: `${ radius }px` } }>
			<table className="mdc-data-table__table">
				<thead>
					<tr className="mdc-data-table__header-row">
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Dessert', 'material-design' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Calories', 'material-design' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Fat', 'material-design' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Carbs', 'material-design' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Protein (g)', 'material-design' ) }
						</th>
					</tr>
				</thead>
				<tbody className="mdc-data-table__content">
					<tr
						data-row-id="u9"
						className="mdc-data-table__row"
						aria-selected="false"
					>
						<td className="mdc-data-table__cell" id="u9">
							{ __( 'Frozen Yogurt', 'material-design' ) }
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							159
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							6
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							24
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							4
						</td>
					</tr>
					<tr
						data-row-id="u10"
						className="mdc-data-table__row"
						aria-selected="false"
					>
						<td className="mdc-data-table__cell" id="u10">
							{ __( 'Ice Cream Sandwich', 'material-design' ) }
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							237
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							9
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							37
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							4.3
						</td>
					</tr>
					<tr
						data-row-id="u11"
						className="mdc-data-table__row"
						aria-selected="false"
					>
						<td className="mdc-data-table__cell" id="u11">
							{ __( 'Eclair', 'material-design' ) }
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							262
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							16
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							24
						</td>
						<td className="mdc-data-table__cell mdc-data-table__cell--numeric">
							6
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
);

export default Table;

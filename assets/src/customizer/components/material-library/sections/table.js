import { __ } from '@wordpress/i18n';

const Table = ( { radius } ) => (
	<div>
		<h4 className="mdc-typography--headline4" style={ { margin: 0 } }>
			{ __( 'Table', 'material-theme-builder' ) }
		</h4>
		<form target="_blank">
			<button
				className="mdc-icon-button material-icons"
				formAction="https://material.io/components/data-tables"
			>
				open_in_new
			</button>
		</form>
		<p>
			{ __(
				'Data tables display sets of data across rows and columns.',
				'material-theme-builder'
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
							{ __( 'Dessert', 'material-theme-builder' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Calories', 'material-theme-builder' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Fat', 'material-theme-builder' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Carbs', 'material-theme-builder' ) }
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							{ __( 'Protein (g)', 'material-theme-builder' ) }
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
							{ __( 'Frozen Yogurt', 'material-theme-builder' ) }
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
							{ __( 'Ice Cream Sandwich', 'material-theme-builder' ) }
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
							{ __( 'Eclair', 'material-theme-builder' ) }
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

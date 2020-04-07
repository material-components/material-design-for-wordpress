import { H3 } from '../styles';

const Table = ( { radius } ) => (
	<div>
		<H3>Table</H3>
		<p>This component can be created as a block in WordPress.</p>
		<div className="mdc-data-table" style={ { borderRadius: radius } }>
			<table className="mdc-data-table__table">
				<thead>
					<tr className="mdc-data-table__header-row">
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							Dessert
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							Calories
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							Fat
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							Carbs
						</th>
						<th
							className="mdc-data-table__header-cell"
							role="columnheader"
							scope="col"
						>
							Protein (g)
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
							Frozen yogurt
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
							Ice cream sandwich
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
							Eclair
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

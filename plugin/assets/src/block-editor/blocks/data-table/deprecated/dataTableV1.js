/*
 *
 *  Copyright 2022 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *
 */

import { RichText, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
const SaveV1 = ( { attributes } ) => {
	const { hasFixedLayout, head, body, foot, caption, className } = attributes;

	const isEmpty = ! head.length && ! body.length && ! foot.length;

	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const blockProps = useBlockProps.save( {
		className: classnames(
			'wp-block-table',
			( className || '' ).replace( 'wp-block-table', '' )
		),
	} );

	if ( isEmpty ) {
		return null;
	}

	const classes = classnames( 'mdc-data-table__table', {
		'has-fixed-layout': hasFixedLayout,
	} );

	const hasCaption = ! RichText.isEmpty( caption );

	const Section = ( { type, rows } ) => {
		if ( ! rows.length ) {
			return null;
		}

		const Tag = `t${ type }`;
		const tagClass = 'body' === type ? 'mdc-data-table__content' : '';
		const trClass = classnames( {
			'mdc-data-table__header-row': 'head' === type,
			'mdc-data-table__row': 'head' !== type,
		} );

		return (
			<Tag className={ tagClass }>
				{ rows.map( ( { cells }, rowIndex ) => (
					<tr key={ rowIndex } className={ trClass }>
						{ cells.map(
							( { content, tag, scope, align }, cellIndex ) => {
								const cellClasses = classnames( {
									[ `has-text-align-${ align }` ]: align,
									'mdc-data-table__cell': 'head' !== type,
									'mdc-data-table__header-cell':
										'head' === type,
								} );

								return (
									<RichText.Content
										className={ cellClasses }
										data-align={ align }
										tagName={ tag }
										value={ content }
										key={ cellIndex }
										scope={
											tag === 'th' ? scope : undefined
										}
									/>
								);
							}
						) }
					</tr>
				) ) }
			</Tag>
		);
	};

	return (
		<div { ...blockProps }>
			<div className="mdc-data-table">
				<table className={ classes }>
					<Section type="head" rows={ head } />
					<Section type="body" rows={ body } />
					<Section type="foot" rows={ foot } />
				</table>
			</div>

			{ hasCaption && (
				<div className="mdc-data-table__caption">
					<RichText.Content tagName="figcaption" value={ caption } />
				</div>
			) }
		</div>
	);
};

export default SaveV1;

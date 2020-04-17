/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, getColorClassName } from '@wordpress/block-editor';

const Save = ( { attributes, hasCaption } ) => {
	const {
		hasFixedLayout,
		head,
		body,
		foot,
		backgroundColor,
		caption,
		className,
	} = attributes;
	const isEmpty = ! head.length && ! body.length && ! foot.length;

	if ( isEmpty ) {
		return null;
	}

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	const classes = classnames( backgroundClass, 'mdc-data-table__table', {
		'has-fixed-layout': hasFixedLayout,
		'has-background': !! backgroundClass,
	} );

	hasCaption = hasCaption && ! RichText.isEmpty( caption );

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
						{ cells.map( ( { content, tag, scope, align }, cellIndex ) => {
							const cellClasses = classnames( {
								[ `has-text-align-${ align }` ]: align,
								'mdc-data-table__cell': 'head' !== type,
								'mdc-data-table__header-cell': 'head' === type,
							} );

							return (
								<RichText.Content
									className={ cellClasses }
									data-align={ align }
									tagName={ tag }
									value={ content }
									key={ cellIndex }
									scope={ tag === 'th' ? scope : undefined }
								/>
							);
						} ) }
					</tr>
				) ) }
			</Tag>
		);
	};

	return (
		<div
			className={ classnames(
				'wp-block-table',
				className.replace( 'wp-block-table', '' )
			) }
		>
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

export default Save;

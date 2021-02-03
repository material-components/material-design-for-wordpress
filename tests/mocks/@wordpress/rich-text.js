import { forwardRef } from '@wordpress/element';

const original = jest.requireActual( '@wordpress/rich-text' );

const RichText = forwardRef(
	(
		{ tagName: Tag = 'div', value, placeholder, onChange, className = '' },
		// eslint-disable-next-line no-unused-vars
		ref
	) => {
		let classes = [ 'rich-text', 'block-editor-rich-text__editable' ];

		if ( className ) {
			classes = classes.concat( className.split( ' ' ) );
		}

		return (
			<Tag
				aria-label={ placeholder }
				aria-multiline="true"
				className={ [ ...new Set( classes ) ].join( ' ' ) }
				style={ { whiteSpace: 'pre-wrap' } }
				role="textbox"
				onInput={ node => onChange( node.currentTarget.textContent ) }
			>
				{ value }
			</Tag>
		);
	}
);

RichText.isEmpty = () => false;
RichText.Content = ( { tagName: Tag = 'div', value, className = '' } ) => (
	<Tag className={ className }>
		<div>{ value }</div>
	</Tag>
);

module.exports = {
	__experimentalRichText: RichText,
	...original,
};

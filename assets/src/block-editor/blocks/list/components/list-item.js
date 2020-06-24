import { useEffect, useRef } from '@wordpress/element';
import { __experimentalRichText as RichText } from '@wordpress/rich-text';

const ListItem = ( {
	primaryText,
	secondaryText,
	icon,
	iconPosition,
	isSecondaryEnabled,
	onEnter,
	onFocus,
	isSelected,
	isSecondarySelected,
	index,
	setItem,
	deleteItem,
} ) => {
	const primaryRef = useRef();
	const secondaryRef = useRef();
	const rangeRef = useRef( { start: 0, end: 0 } );

	const focusElement = element => {
		if ( ! element || element === document.activeElement ) {
			return;
		}

		const selection = window.getSelection(),
			range = document.createRange();
		range.setStart( element.childNodes[ 0 ] || element, rangeRef.current );
		range.collapse( true );
		selection.removeAllRanges();
		selection.addRange( range );
	};

	const onPrimaryEnter = event => {
		rangeRef.current = 0;
		if ( isSecondaryEnabled ) {
			if ( event.value ) {
				setItem( index, {
					primaryText: event.value.text.slice( 0, event.value.end ),
					secondaryText: `${ event.value.text.slice(
						event.value.end
					) } ${ secondaryText }`,
				} );
			}
			onEnter( index, isSecondaryEnabled );
		} else {
			onSecondaryEnter();
		}
	};

	const onSecondaryEnter = () => {
		rangeRef.current = 0;
		onEnter( index + 1 );
	};

	const onPrimaryDelete = event => {
		deleteItem( index, event.value.text );
	};

	const onSecondaryDelete = event => {
		if ( event.value && 0 === event.value.start ) {
			rangeRef.current = primaryText.length;
			setItem( index, {
				primaryText: `${ primaryText }${ event.value.text }`,
				secondaryText: '',
			} );
		}
	};

	const onPrimaryTextChange = text => {
		setItem( index, {
			primaryText: text,
		} );
	};

	const onSecondaryChange = text => {
		setItem( index, {
			secondaryText: text,
		} );
	};

	const onSelectionChange = () => {};

	useEffect( () => {
		if ( isSecondarySelected ) {
			focusElement( secondaryRef.current );
		} else if ( isSelected ) {
			focusElement( primaryRef.current );
		}
	}, [ isSecondaryEnabled, isSelected, isSecondarySelected ] );

	return (
		<li className="mdc-list-item">
			{ 'leading' === iconPosition && (
				<span className="mdc-list-item__graphic material-icons">{ icon }</span>
			) }

			<span className="mdc-list-item__text">
				<span className="mdc-list-item__primary-text">
					<RichText
						ref={ primaryRef }
						value={ primaryText }
						onChange={ onPrimaryTextChange }
						onSelectionChange={ onSelectionChange }
						__unstableOnCreateUndoLevel={ onSelectionChange }
						onDelete={ onPrimaryDelete }
						onEnter={ onPrimaryEnter }
						unstableOnFocus={ () => onFocus( index ) }
						className="rich-text block-editor-rich-text__editable"
					/>
				</span>

				{ isSecondaryEnabled && (
					<span className="mdc-list-item__secondary-text">
						<RichText
							ref={ secondaryRef }
							value={ secondaryText }
							onChange={ onSecondaryChange }
							onSelectionChange={ onSelectionChange }
							__unstableOnCreateUndoLevel={ onSelectionChange }
							onDelete={ onSecondaryDelete }
							onEnter={ onSecondaryEnter }
							unstableOnFocus={ () => onFocus( index, isSecondaryEnabled ) }
							className="rich-text block-editor-rich-text__editable"
						/>
					</span>
				) }
			</span>

			{ 'trailing' === iconPosition && (
				<span className="mdc-list-item__meta material-icons">{ icon }</span>
			) }
		</li>
	);
};

export default ListItem;

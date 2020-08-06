/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';
import {
	__experimentalRichText as RichText,
	create,
	insert,
} from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

/**
 * Material list item edit component.
 */
const ListItem = ( {
	primaryText,
	secondaryText,
	icon,
	iconPosition,
	isSecondaryEnabled,
	onSplit,
	onFocus,
	isSelected,
	isSecondarySelected,
	index,
	selectionStart,
	setItem,
	deleteItem,
	onPrimaryTextChange: primaryTextChange,
	onSecondaryTextChange: secondaryTextChange,
} ) => {
	const primaryRef = useRef();
	const secondaryRef = useRef();
	const rangeStartRef = useRef( 0 );

	const [ editedText, setEditedText ] = useState( '' );

	// Set rangeStartRef based on selectionStart prop.
	useEffect( () => {
		rangeStartRef.current = selectionStart;
	}, [ selectionStart ] );

	// Focus element based on selected status.
	useEffect( () => {
		if ( isSecondarySelected ) {
			setEditedText( secondaryText );
			focusElement( secondaryRef.current );
		} else if ( isSelected ) {
			setEditedText( primaryText );
			focusElement( primaryRef.current );
		}
	}, [ isSecondaryEnabled, isSelected, isSecondarySelected, selectionStart ] ); // eslint-disable-line

	/**
	 * Focus an element.
	 *
	 * @param {Node} element Element to focus.
	 */
	const focusElement = element => {
		if ( ! element ) {
			return;
		}

		const selection = window.getSelection(),
			range = document.createRange();

		try {
			range.setStart(
				element.childNodes[ 0 ] || element,
				rangeStartRef.current
			);
		} catch ( e ) {
			range.setStart( element.childNodes[ 0 ] || element, 0 );
		}

		range.collapse( true );
		selection.removeAllRanges();
		selection.addRange( range );
	};

	/**
	 * Get the split before and after values from a Break/Enter event.
	 *
	 * @param {Event} event
	 */
	const getSplitValues = event => {
		let before = '',
			after = '';

		if ( event.value ) {
			before = event.value.text.slice( 0, event.value.end );
			after = event.value.text.slice( event.value.end );
		}

		return { before, after };
	};

	/**
	 * Handle Enter keypress event on primary text.
	 *
	 * @param {Event} event Enter keypress event.
	 */
	const onPrimaryEnter = event => {
		rangeStartRef.current = 0;
		const splitValues = getSplitValues( event );

		if ( isSecondaryEnabled ) {
			setItem( index, {
				primaryText: splitValues.before,
				secondaryText: `${ splitValues.after }${ secondaryText }`,
			} );
			onFocus( index, isSecondaryEnabled );
			return;
		}

		setItem( index, {
			primaryText: splitValues.before,
		} );
		onSplit( index, splitValues.after );
	};

	/**
	 * Handle Enter keypress event on secondary text.
	 *
	 * @param {Event} event Enter keypress event.
	 */
	const onSecondaryEnter = event => {
		const splitValues = getSplitValues( event );
		setItem( index, {
			secondaryText: splitValues.before,
		} );
		onSplit( index, splitValues.after );
	};

	/**
	 * Handle delete keypress event on primary text.
	 *
	 * @param {Event} event Delete keypress event.
	 */
	const onPrimaryDelete = event => {
		deleteItem( index, event.value.text, secondaryText );
	};

	/**
	 * Handle delete keypress event on secondary text.
	 *
	 * @param {Event} event Delete keypress event.
	 */
	const onSecondaryDelete = event => {
		if ( event.value && 0 === event.value.start ) {
			rangeStartRef.current = primaryText.length;
			setItem( index, {
				primaryText: `${ primaryText }${ event.value.text }`,
				secondaryText: '',
			} );
			onFocus( index );
		}
	};

	/**
	 * Handle primary text change
	 *
	 * @param {string} text Primary Text
	 */
	const onPrimaryTextChange = text => {
		setEditedText( text );
		primaryTextChange( index, text );
	};

	/**
	 * Handle secondary text change
	 *
	 * @param {string} text secondary Text
	 */
	const onSecondaryTextChange = text => {
		setEditedText( text );
		secondaryTextChange( index, text );
	};

	/**
	 * Handle paste event.
	 *
	 * @param {Object} pasted Object with pasted value props.
	 */
	const onPaste = ( { value, plainText } ) => {
		const valueToInsert = create( { html: plainText } );
		const toInsert = insert( value, valueToInsert );

		rangeStartRef.current = toInsert.start;

		if ( isSecondarySelected ) {
			return onSecondaryTextChange( toInsert.text );
		}

		onPrimaryTextChange( toInsert.text );
	};

	const isPrimarySelected = isSelected && ! isSecondarySelected;

	// Noop function.
	const noop = () => {};

	return (
		<li className="mdc-list-item">
			{ 'leading' === iconPosition && (
				<span className="mdc-list-item__graphic material-icons">{ icon }</span>
			) }

			<span className="mdc-list-item__text">
				<span className="mdc-list-item__primary-text">
					<RichText
						ref={ primaryRef }
						value={ isPrimarySelected ? editedText : primaryText }
						onChange={ onPrimaryTextChange }
						__unstableOnCreateUndoLevel={ noop }
						onDelete={ onPrimaryDelete }
						onEnter={ onPrimaryEnter }
						onPaste={ onPaste }
						unstableOnFocus={ () => onFocus( index ) }
						className="rich-text block-editor-rich-text__editable"
						__unstableIsSelected={ isPrimarySelected }
						onSelectionChange={ noop }
						selectionStart={ rangeStartRef.current }
						selectionEnd={ rangeStartRef.current }
					/>
				</span>

				{ isSecondaryEnabled && (
					<span className="mdc-list-item__secondary-text">
						<RichText
							ref={ secondaryRef }
							value={ isSecondarySelected ? editedText : secondaryText }
							onChange={ onSecondaryTextChange }
							__unstableOnCreateUndoLevel={ noop }
							onDelete={ onSecondaryDelete }
							onEnter={ onSecondaryEnter }
							onPaste={ onPaste }
							unstableOnFocus={ () => onFocus( index, isSecondaryEnabled ) }
							className="rich-text block-editor-rich-text__editable"
							placeholder={ __( 'Secondary text…', 'material-theme-builder' ) }
							__unstableIsSelected={ isSecondarySelected }
							onSelectionChange={ noop }
							selectionStart={ rangeStartRef.current }
							selectionEnd={ rangeStartRef.current }
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

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
import { findDOMNode, useEffect, useRef } from '@wordpress/element';
import { create, insert } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	RichText,
	isExperimentalRichText,
} from '../../../components/polyfills';
import { useStateCallback } from '../../../helpers/hooks';

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
	preview,
} ) => {
	const primaryRef = useRef();
	const secondaryRef = useRef();
	const rangeStartRef = useRef( 0 );

	const [ editedText, setEditedText ] = useStateCallback( '' );

	// Focus element based on selected status.
	useEffect( () => {
		if ( preview ) {
			return;
		}

		rangeStartRef.current = selectionStart;

		if ( isSecondarySelected ) {
			focusElement( secondaryRef.current );

			setEditedText( secondaryText, () =>
				focusElement( secondaryRef.current )
			);
		} else if ( isSelected ) {
			focusElement( primaryRef.current );

			setEditedText( primaryText, () => focusElement( primaryRef.current ) );
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

		if ( ! ( element instanceof window.Node ) ) {
			/*
			 * For back-compat. Older versions of `rich-text` do not use `forwardRef`
			 * that results in the ref incorrectly set to the React component
			 */
			element = findDOMNode( element ); // eslint-disable-line react/no-find-dom-node
		}

		if ( ! element ) {
			return;
		}

		const selection = window.getSelection(),
			range = document.createRange(),
			target = element.childNodes ? element.childNodes[ 0 ] : element;

		try {
			range.setStart( target, rangeStartRef.current );
		} catch ( e ) {
			if ( target instanceof window.Node ) {
				range.setStart( target, 0 );
			}
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
			const secondText = `${ splitValues.after }${ secondaryText }`;
			setItem( index, {
				primaryText: splitValues.before,
				secondaryText: secondText,
			} );
			setEditedText( secondText );
			onFocus( index, isSecondaryEnabled, 0 );
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
			setItem( index, {
				primaryText: `${ primaryText }${ event.value.text }`,
				secondaryText: '',
			} );
			onFocus( index, false, primaryText.length );
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

	const onSelectionChange = start => {
		if ( 'undefined' !== typeof start ) {
			rangeStartRef.current = start;
		}
	};

	// Noop function.
	const noop = () => {};

	const richTextProps = ! isExperimentalRichText
		? {
				selectionStart: rangeStartRef.current,
				selectionEnd: rangeStartRef.current,
				onSelectionChange,
		  }
		: { onSelectionChange: noop };

	return (
		<li className="mdc-list-item">
			{ 'leading' === iconPosition && (
				<span className="mdc-list-item__graphic material-icons">{ icon }</span>
			) }

			<span className="mdc-list-item__text">
				<span className="mdc-list-item__primary-text">
					<RichText
						ref={ primaryRef }
						value={ isPrimarySelected && ! preview ? editedText : primaryText }
						onChange={ onPrimaryTextChange }
						__unstableOnCreateUndoLevel={ noop }
						onDelete={ onPrimaryDelete }
						onEnter={ onPrimaryEnter }
						onPaste={ onPaste }
						unstableOnFocus={ () => onFocus( index ) }
						className="rich-text block-editor-rich-text__editable"
						__unstableIsSelected={ isPrimarySelected }
						{ ...richTextProps }
					/>
				</span>

				{ isSecondaryEnabled && (
					<span className="mdc-list-item__secondary-text">
						<RichText
							ref={ secondaryRef }
							value={
								isSecondarySelected && ! preview ? editedText : secondaryText
							}
							onChange={ onSecondaryTextChange }
							__unstableOnCreateUndoLevel={ noop }
							onDelete={ onSecondaryDelete }
							onEnter={ onSecondaryEnter }
							onPaste={ onPaste }
							unstableOnFocus={ () => onFocus( index, isSecondaryEnabled ) }
							className="rich-text block-editor-rich-text__editable"
							placeholder={ __( 'Secondary text…', 'material-design' ) }
							__unstableIsSelected={ isSecondarySelected }
							{ ...richTextProps }
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

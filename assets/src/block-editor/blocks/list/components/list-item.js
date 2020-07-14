import { useEffect, useRef } from '@wordpress/element';
import { __experimentalRichText as RichText } from '@wordpress/rich-text';
import { __ } from '@wordpress/i18n';

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
	selectionStart,
	setItem,
	deleteItem,
	onPrimaryTextChange,
	onSecondaryTextChange,
	setPrimaryFocus,
} ) => {
	const primaryRef = useRef();
	const secondaryRef = useRef();
	const rangeStartRef = useRef( 0 );

	// Set rangeStartRef based on selectionStart prop.
	useEffect( () => {
		rangeStartRef.current = selectionStart;
	}, [ selectionStart ] );

	// Focus element based on selected status.
	useEffect( () => {
		if ( isSecondarySelected ) {
			focusElement( secondaryRef.current );
		} else if ( isSelected ) {
			focusElement( primaryRef.current );
		}
	}, [ isSecondaryEnabled, isSelected, isSecondarySelected ] );

	/**
	 * Focus an element.
	 *
	 * @param {Node} element Element to focus.
	 */
	const focusElement = element => {
		if ( ! element || element === document.activeElement ) {
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

	const onSplit = text => {
		rangeStartRef.current = 0;
		onEnter( index + 1, false, text );
	};

	const onPrimaryEnter = event => {
		rangeStartRef.current = 0;
		const splitValues = getSplitValues( event );

		if ( isSecondaryEnabled ) {
			setItem( index, {
				primaryText: splitValues.before,
				secondaryText: `${ splitValues.after }${ secondaryText }`,
			} );
			onEnter( index, isSecondaryEnabled );
		} else {
			setItem( index, {
				primaryText: splitValues.before,
			} );
			onSplit( splitValues.after );
		}
	};

	const onSecondaryEnter = event => {
		const splitValues = getSplitValues( event );
		setItem( index, {
			secondaryText: splitValues.before,
		} );
		onSplit( splitValues.after );
	};

	const onPrimaryDelete = event => {
		deleteItem( index, event.value.text, secondaryText );
	};

	const onSecondaryDelete = event => {
		if ( event.value && 0 === event.value.start ) {
			rangeStartRef.current = primaryText.length;
			setItem( index, {
				primaryText: `${ primaryText }${ event.value.text }`,
				secondaryText: '',
			} );
			setPrimaryFocus( index );
		}
	};

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
						value={ primaryText }
						onChange={ text => onPrimaryTextChange( index, text ) }
						onSelectionChange={ noop }
						__unstableOnCreateUndoLevel={ noop }
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
							onChange={ text => onSecondaryTextChange( index, text ) }
							onSelectionChange={ noop }
							__unstableOnCreateUndoLevel={ noop }
							onDelete={ onSecondaryDelete }
							onEnter={ onSecondaryEnter }
							unstableOnFocus={ () => onFocus( index, isSecondaryEnabled ) }
							className="rich-text block-editor-rich-text__editable"
							placeholder={ __( 'Secondary text…', 'material-theme-builder' ) }
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

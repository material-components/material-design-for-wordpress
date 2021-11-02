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
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useStateCallback } from '../../../helpers/hooks';

/**
 * Material list item edit component.
 *
 * @param {Object}   props
 * @param {string}   props.primaryText
 * @param {string}   props.secondaryText
 * @param {string}   props.icon
 * @param {string}   props.iconPosition
 * @param {boolean}  props.isSecondaryEnabled
 * @param {Function} props.onSplit
 * @param {Function} props.onFocus
 * @param {string}   props.isSelected
 * @param {boolean}  props.isSecondarySelected
 * @param {string}   props.index
 * @param {number}   props.selectionStart
 * @param {Function} props.setItem
 * @param {Function} props.deleteItem
 * @param {Function} props.onPrimaryTextChange
 * @param {Function} props.onSecondaryTextChange
 * @param {boolean}  props.preview
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

			setEditedText( primaryText, () =>
				focusElement( primaryRef.current )
			);
		}
	}, [isSecondaryEnabled, isSelected, isSecondarySelected, selectionStart]); // eslint-disable-line

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

		// eslint-disable-next-line @wordpress/no-global-get-selection
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
	 * Handle Enter keypress event on primary text.
	 *
	 * @param {string}  value
	 * @param {boolean} isBefore
	 * @param {boolean} isSecondaryCall
	 */
	const onSplitCallback = ( value, isBefore, isSecondaryCall = false ) => {
		rangeStartRef.current = 0;
		if ( isSecondaryEnabled ) {
			if ( isBefore ) {
				// When split is called from primary text with secondary enabled,
				setItem( index, {
					[ isSecondaryCall
						? 'secondaryText'
						: 'primaryText' ]: value,
				} );
				onFocus( index, isSecondaryEnabled, 0 );
				return;
			}
			// After value handle.
			if ( isSecondaryCall ) {
				// When split is called from secondary text we insert new item.
				onSplit( index, value );
				return;
			}
			// When split is called from the primary text and secondary is enabled.
			const secondText = `${ value }${ secondaryText }`;
			setItem( index, {
				secondaryText: secondText,
			} );
			setEditedText( secondText );
			onFocus( index, isSecondaryEnabled, 0 );
			return;
		}
		// When secondary is disabled.
		if ( isBefore ) {
			setItem( index, {
				primaryText: value,
			} );
		} else {
			onSplit( index, value );
		}
	};

	/**
	 * On Primary Delete.
	 */
	const onPrimaryDelete = () => {
		deleteItem( index, '', '' );
	};

	/**
	 * On Secondary Delete.
	 */
	const onSecondaryDelete = () => {
		setItem( index, {
			primaryText: `${ primaryText }`,
			secondaryText: '',
		} );
		onFocus( index, false, primaryText.length );
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

	const isPrimarySelected = isSelected && ! isSecondarySelected;

	/**
	 * Handle merge.
	 *
	 * @param {boolean} isMergeWithBottom
	 * @param {boolean} isSecondaryCall
	 */
	const onMerge = ( isMergeWithBottom, isSecondaryCall = false ) => {
		if ( ! isMergeWithBottom ) {
			if ( isSecondaryEnabled && isSecondaryCall ) {
				const mergedText = `${ primaryText }${ editedText }`;
				setItem( index, {
					primaryText: mergedText,
					secondaryText: '',
				} );
				setEditedText( mergedText );
				onFocus( index, false, primaryText.length );
			} else {
				deleteItem( index, editedText, secondaryText );
			}
		}
	};

	return (
		<li className="mdc-list-item">
			{ 'leading' === iconPosition && (
				<span className="mdc-list-item__graphic material-icons">
					{ icon }
				</span>
			) }

			<span className="mdc-list-item__text">
				<span className="mdc-list-item__primary-text">
					<RichText
						identifier="values"
						ref={ primaryRef }
						value={
							isPrimarySelected && ! preview
								? editedText
								: primaryText
						}
						onChange={ onPrimaryTextChange }
						onRemove={ onPrimaryDelete }
						onMerge={ onMerge }
						onSplit={ onSplitCallback }
						onReplace={ () => {} }
						unstableOnFocus={ () => onFocus( index ) }
						className="rich-text block-editor-rich-text__editable"
						isSelected={ isPrimarySelected }
						disableLineBreaks={ true }
					/>
				</span>

				{ isSecondaryEnabled && (
					<span className="mdc-list-item__secondary-text">
						<RichText
							ref={ secondaryRef }
							value={
								isSecondarySelected && ! preview
									? editedText
									: secondaryText
							}
							onChange={ onSecondaryTextChange }
							onRemove={ onSecondaryDelete }
							onSplit={ ( v, b ) =>
								onSplitCallback( v, b, true )
							}
							onReplace={ () => {} }
							onMerge={ m => onMerge( m, true ) }
							unstableOnFocus={ () =>
								onFocus( index, isSecondaryEnabled )
							}
							className="rich-text block-editor-rich-text__editable"
							placeholder={ __(
								'Secondary text…',
								'material-design'
							) }
							isSelected={ isSecondarySelected }
							disableLineBreaks={ true }
						/>
					</span>
				) }
			</span>

			{ 'trailing' === iconPosition && (
				<span className="mdc-list-item__meta material-icons">
					{ icon }
				</span>
			) }
		</li>
	);
};

export default ListItem;

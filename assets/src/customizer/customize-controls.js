/* global jQuery, requestAnimationFrame, mtb, mdc */

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains extra logic for our Customizer controls & settings.
 *
 * @since 1.0.0
 */

/**
 * External dependencies
 */
import 'select-woo';
import { camelCase } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { render } from '@wordpress/element';
import { unmountComponentAtNode } from 'react-dom';

/**
 * Internal dependencies
 */
import colorUtils from '../common/color-utils';
import RangeSliderControl from './components/range-slider-control';
import KitchenSink from './components/kitchen-sink';
import {
	initButtons,
	initTabBar,
	initLists,
} from '../common/mdc-components-init';
import MaterialColorPalette from '../block-editor/components/material-color-palette';
import ThemePrompt from './components/theme-prompt';

( ( $, api ) => {
	let notificationCount = false;

	// Bind for previwer events.
	$( function() {
		api.previewer.bind( 'mtb', settings => {
			notificationCount = settings.notificationCount;
			showHideNotification();
		} );

		api.panel( mtb.slug ).expanded.bind( expanded => {
			if ( ! expanded ) {
				const code = 'mtb_components';
				api.notifications.remove( code );
			}
		} );
	} );

	/**
	 * Show or hide the material components notification.
	 */
	const showHideNotification = () => {
		const code = 'mtb_components';
		const kitchenSink = $( '#mcb-kitchen-sink-preview' );

		if (
			false !== notificationCount &&
			2 > notificationCount &&
			! kitchenSink.is( ':visible' ) &&
			api.panel( mtb.slug ).expanded()
		) {
			api.notifications.add(
				new api.Notification( code, {
					message: mtb.l10n.componentsNotice,
					type: 'warning',
					dismissible: true,
					render() {
						const li = api.Notification.prototype.render.call( this ),
							link = li.find( 'a' );

						link.on( 'click', event => {
							event.preventDefault();
							loadKitchenSink();

							api.notifications.remove( code );
						} );

						// Handle dismissal of notice.
						li.find( '.notice-dismiss' ).on( 'click', () => {
							const request = wp.ajax.post( 'mtb_notification_dismiss', {
								nonce: mtb.notify_nonce,
							} );

							request.done( response => {
								if ( response && response.count ) {
									notificationCount = response.count;
								}
							} );
						} );

						return li;
					},
				} )
			);
		} else {
			api.notifications.remove( code );
		}
	};

	/**
	 * Renders the kitchen sink with all the settings.
	 */
	const renderKitchenSink = () => {
		render(
			<KitchenSink { ...getSettings() } />,
			$( '#mcb-kitchen-sink-preview' ).get( 0 )
		);

		initMaterialComponents();
	};

	/**
	 * Gets all the controls' setting
	 * values and returns them in an object.
	 */
	const getSettings = () => {
		const controlProps = {
			theme: api.settings.theme.stylesheet,
		};

		if ( ! mtb.controls || ! Array.isArray( mtb.controls ) ) {
			return controlProps;
		}

		mtb.controls.forEach( name => {
			const control = api.control( name );
			const prop = camelCase( name.replace( `${ mtb.slug }_`, '' ) );

			if ( control.setting ) {
				controlProps[ prop ] = control.setting.get();
			}
		} );

		return controlProps;
	};

	const onSettingChange = () => {
		const kitchenSink = $( '#mcb-kitchen-sink-preview' );

		if (
			kitchenSink.get( 0 ) &&
			unmountComponentAtNode( kitchenSink.get( 0 ) )
		) {
			renderKitchenSink();
		}
	};

	const initMaterialComponents = function() {
		initButtons();
		initTabBar();
		initLists();

		try {
			const states = [
				{ state: 'checked', value: false },
				{ state: 'checked', value: true },
				{ state: 'indeterminate', value: true },
				{ state: 'disabled', value: true },
			];

			document
				.querySelectorAll( '.mdc-checkbox' )
				.forEach( ( chkbox, index ) => {
					const checkbox = new mdc.checkbox.MDCCheckbox( chkbox );
					checkbox[ states[ index ].state ] = states[ index ].value;
				} );

			document
				.querySelectorAll( '.mdc-radio' )
				.forEach( radio => new mdc.radio.MDCRadio( radio ) );

			document
				.querySelectorAll( '.mdc-text-field' )
				.forEach( txtField => new mdc.textField.MDCTextField( txtField ) );

			const chipSetEl = document.querySelector( '.mdc-chip-set' );
			new mdc.chips.MDCChipSet( chipSetEl );

			new mdc.switchControl.MDCSwitch(
				document.querySelector( '.mdc-switch' )
			);
		} catch ( err ) {}
	};

	const toggleKitchenSink = () => {
		let kitchenSink = $( '#mcb-kitchen-sink-preview' );
		const customizePreview = $( '#customize-preview' );

		// Toggle between kitchen sink and default customizer view.
		if ( ! kitchenSink.is( ':visible' ) ) {
			if ( ! kitchenSink.length ) {
				customizePreview.before(
					$( '<div></div>' )
						.attr( { id: 'mcb-kitchen-sink-preview' } )
						.addClass( 'wp-full-overlay-main' )
				);

				kitchenSink = $( '#mcb-kitchen-sink-preview' );
			}

			$( this ).addClass( 'active' );
			renderKitchenSink();

			customizePreview.hide();
			kitchenSink.show();
		} else {
			$( this ).removeClass( 'active' );
			kitchenSink.hide();
			customizePreview.show();
		}
	};

	$( '.customize-pane-parent' ).ready( function() {
		if ( window.localStorage.getItem( 'themeInstallerDismissed' ) !== null ) {
			return;
		}

		$( '.customize-pane-parent' ).prepend( `
			<li id="accordion-section-theme-installer" class="accordion-section control-panel-themes customize-info"></li>
		` );

		render(
			<ThemePrompt status={ mtb.themeStatus } />,
			$( '#accordion-section-theme-installer' ).get( 0 )
		);
	} );

	/**
	 * Show/hide kitchen sink button near the "Publish" button.
	 */
	$( '#customize-save-button-wrapper' ).ready( function() {
		$( '#customize-save-button-wrapper' ).prepend(
			$( '<button></button>' )
				.attr( { type: 'button' } )
				.css( 'display', 'none' )
				.addClass( 'button toggle-kitchen-sink' )
				.text( __( 'Material Library', 'material-theme-builder' ) )
		);

		api.panel( mtb.slug ).expanded.bind( function( expanded ) {
			const showOrHide = expanded ? 'block' : 'none';
			$( '.toggle-kitchen-sink' ).css( 'display', showOrHide );

			if ( ! expanded && $( '#mcb-kitchen-sink-preview' ).is( ':visible' ) ) {
				toggleKitchenSink();
			}
		} );
	} );

	/**
	 * Handle the kitchen sink swap right here.
	 */
	let mdcLoaded = false;
	const loadKitchenSink = () => {
		// Load MDC assets
		if ( ! mdcLoaded ) {
			$( 'head' ).append( `
				<link href="https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css" rel="stylesheet">
				<link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
			` );

			$.getScript(
				'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js',
				initMaterialComponents
			);
		}

		toggleKitchenSink();

		mdcLoaded = true;
	};

	$( document ).on( 'click', '.toggle-kitchen-sink', loadKitchenSink );

	/**
	 * Collapse a DOM node by animating it's height to 0.
	 *
	 * @param {Node} element
	 */
	const collapseSection = element => {
		// Get the height of the element's inner content, regardless of its actual size.
		const sectionHeight = element.scrollHeight;

		// Temporarily disable all css transitions.
		const elementTransition = element.style.transition;
		element.style.transition = '';

		// On the next frame (as soon as the previous style change has taken effect),
		// explicitly set the element's height to its current pixel height, so we
		// aren't transitioning out of 'auto'.
		requestAnimationFrame( () => {
			element.style.height = sectionHeight + 'px';
			element.style.transition = elementTransition;

			// On the next frame (as soon as the previous style change has taken effect),
			// have the element transition to height: 0.
			requestAnimationFrame( () => {
				element.style.height = 0 + 'px';
			} );
		} );
		// Mark the section as "currently collapsed".
		element.setAttribute( 'data-collapsed', 'true' );
	};

	/**
	 * Expand a DOM node by animating it's height to full.
	 *
	 * @param {Node} element
	 */
	const expandSection = element => {
		// Get the height of the element's inner content, regardless of its actual size.
		const sectionHeight = element.scrollHeight + 2;

		const removeEvent = () => {
			element.style.height = 'auto';

			// Remove this event listener so it only gets triggered once.
			element.removeEventListener( 'transitionend', removeEvent );
		};

		// Have the element transition to the height of its inner content.
		element.style.height = sectionHeight + 'px';

		// When the next css transition finishes (which should be the one we just triggered).
		element.addEventListener( 'transitionend', removeEvent );

		// Mark the section as "currently not collapsed".
		element.setAttribute( 'data-collapsed', 'false' );
	};

	/**
	 * Extend wp.customize.Section as a collapsible section
	 */
	api.CollapsibleSection = api.Section.extend( {
		defaultExpandedArguments: $.extend(
			{},
			api.Section.defaultExpandedArguments,
			{ allowMultiple: true }
		),

		/**
		 * wp.customize.CollapsibleSection
		 *
		 * Custom section which would act as a collapsible (accordion).
		 *
		 * @constructs wp.customize.CollapsibleSection
		 * @augments   wp.customize.Section
		 *
		 * @param {string} id - ID.
		 * @param {Object} options - Options.
		 * @return {void}
		 */
		initialize( id, options ) {
			const section = this;
			api.Section.prototype.initialize.call( section, id, options );

			// Move the section to it's parent panel.
			section.headContainer.append( $( '#sub-accordion-section-' + id ) );

			if ( section.panel && section.panel() ) {
				const panel = api.panel( section.panel() );

				if ( panel ) {
					panel.container.last().addClass( 'control-section-collapse-parent' );
				}
			}
		},

		/**
		 * Attach events.
		 *
		 * @return {void}
		 */
		attachEvents() {
			const section = this;
			api.Section.prototype.attachEvents.call( section );

			if ( section.panel() && api.panel( section.panel() ) ) {
				api
					.panel( section.panel() )
					.container.find( '.customize-panel-back' )
					.on( 'click keydown', event => {
						if ( api.utils.isKeydownButNotEnterEvent( event ) ) {
							return;
						}
						event.preventDefault(); // Keep this AFTER the key filter above.

						if ( section.expanded() ) {
							section.collapse( { delayed: true } );
						}
					} );
			}
		},

		/**
		 * Update UI to reflect expanded state
		 *
		 * @param {boolean}  expanded - Expanded state.
		 * @param {Object}   args - Args.
		 * @return {void}
		 */
		onChangeExpanded( expanded, args ) {
			const section = this;

			// Immediately call the complete callback if there were no changes.
			if ( args.unchanged ) {
				if ( args.completeCallback ) {
					args.completeCallback();
				}
				return;
			}

			const overlay = section.headContainer.closest( '.wp-full-overlay' );

			if ( expanded ) {
				if ( ! args.allowMultiple ) {
					api.section.each( otherSection => {
						if ( otherSection !== section ) {
							otherSection.collapse( { duration: args.duration } );
						}
					} );
				}

				section.contentContainer.addClass( 'open' );

				if ( false !== args.transition ) {
					expandSection( section.contentContainer.get( 0 ) );
				}

				overlay.addClass( 'section-collapse-open' );
				section.headContainer.addClass( 'expanded' );
			} else {
				setTimeout( () => {
					section.contentContainer.removeClass( 'open' );
				}, 200 );

				if ( args.delayed ) {
					setTimeout( () => {
						collapseSection( section.contentContainer.get( 0 ) );
					}, 400 );
				} else {
					collapseSection( section.contentContainer.get( 0 ) );
				}

				overlay.removeClass( 'section-collapse-open' );
				section.container.removeClass( 'busy' );
				section.headContainer.removeClass( 'expanded' );
			}
		},
	} );

	/**
	 * Extends wp.customize.sectionConstructor with section constructor for collapsible section.
	 */
	$.extend( api.sectionConstructor, {
		collapse: api.CollapsibleSection,
	} );

	api.MaterialColorControl = api.ColorControl.extend( {
		template: wp.template( 'customize-control-material_color-tabs' ),
		accessibilityTemplate: wp.template(
			'customize-control-material_color-accessibility'
		),

		/**
		 * Callback when the control is ready and inserted into DOM.
		 */
		ready() {
			const control = this;

			api.ColorControl.prototype.ready.call( control );

			const picker = control.container.find( '.wp-picker-holder' );
			const container = control.container.find( '.wp-picker-container' );

			// Append the tabs markup to container.
			container.append( control.template( { id: control.id } ) );

			// Move picker to the custom tab.
			container.find( '.tab-custom' ).append( picker );

			// Add the tab links click event to show/hide tab content.
			container.find( '.mtb-tab-link' ).on( 'click', event => {
				event.preventDefault();

				const link = $( event.target );
				const targetId = link
					.attr( 'href' )
					.split( '#' )
					.pop();

				container.find( '.active' ).removeClass( 'active' );

				container.find( `#${ targetId }` ).addClass( 'active' );
				link.addClass( 'active' );
			} );

			// Render the material palette component with accessibility warnings.
			control.renderPaletteWithAccessibilityWarnings();

			control.setting.bind( value => {
				// Re-render the material palette component and accessibility warnings if the color is updated.
				control.renderPaletteWithAccessibilityWarnings( value );
			} );

			const colorToggler = container.find( '.wp-color-result' ),
				colorInput = container.find( '.wp-color-picker' );

			// Add our own custom color picker open/close events.
			colorToggler.off( 'click' ).on( 'click', () => {
				if ( colorToggler.hasClass( 'wp-picker-open' ) ) {
					colorInput.data( 'wpWpColorPicker' ).close();
				} else {
					colorInput.data( 'wpWpColorPicker' ).open();

					// Render the material palette component with accessibility warnings.
					control.renderPaletteWithAccessibilityWarnings();
				}
			} );

			// Remove the `click.wpcolorpicker` event and add our own.
			container
				.off( 'click.wpcolorpicker' )
				.on( 'click.wpcolorpicker', event => {
					// Stop propagation only if the click is not from a material color select
					// react will handle the event propagation.
					if (
						event.originalEvent &&
						event.originalEvent.target &&
						event.originalEvent.target.classList.contains( 'components-button' )
					) {
						// Remove the body click event and add it back after a second.
						$( 'body' ).off( 'click.wpcolorpicker' );
						setTimeout(
							() =>
								$( 'body' ).on(
									'click.wpcolorpicker',
									colorInput.data( 'wpWpColorPicker' ).close
								),
							500
						);
						return true;
					}

					event.stopPropagation();
				} );

			// Activate the first tab.
			container
				.find( '.mtb-tab-link' )
				.first()
				.trigger( 'click' );

			container
				.find( '.wp-picker-default' )
				.off( 'click' )
				.on( 'click', event => {
					const style = api( mtb.prevStyleControl ).get();

					if (
						mtb &&
						mtb.designStyles &&
						mtb.designStyles.hasOwnProperty( style )
					) {
						const $control = $( event.target ).closest(
								'.customize-control-material_color'
							),
							controlName = $control
								.attr( 'id' )
								.replace( 'customize-control-', '' ),
							colorControl = api.control( controlName );

						// Unbind the custom value change event.
						colorControl.setting.unbind( onCustomValueChange );

						// Set the value from style defaults.
						colorControl.setting.set(
							mtb.designStyles[ style ][
								controlName.replace( `${ mtb.slug }_`, '' )
							]
						);

						// Rebind the custom value change event.
						colorControl.setting.bind( onCustomValueChange );
					}
				} );
		},

		/**
		 * Render the `MaterialColorPalette` component in the palette tab.
		 *
		 * @param {string|boolean} selectedColor
		 */
		renderMaterialPalette( selectedColor = false ) {
			const control = this;
			render(
				<MaterialColorPalette
					value={ selectedColor || control.setting.get() }
					onChange={ newValue => {
						control.setting.set( newValue );
						control.setting._dirty = true;
					} }
					materialColorsOnly={ true }
				/>,
				control.container.find( '.tab-palette' ).get( 0 )
			);
		},

		/**
		 * Render accessibility warnings for a color.
		 *
		 * @param {string} selectedColor Hex code of the selected color.
		 */
		renderAccessibilityWarnings( selectedColor = false ) {
			const control = this,
				colors = [];

			selectedColor = selectedColor || control.setting.get();

			let color,
				textColor,
				colorRange,
				isText = true;
			const textColorLabel =
				-1 !== control.id.indexOf( 'primary' )
					? __( 'On Primary', 'material-theme-builder' )
					: __( 'On Secondary', 'material-theme-builder' );

			if ( control.params.relatedTextSetting ) {
				color = selectedColor;
				textColor = api( control.params.relatedTextSetting ).get();
				colorRange = colorUtils.generateColorFromHex( selectedColor );
				isText = false;
			} else {
				textColor = selectedColor;
				color = api( control.params.relatedSetting ).get();
				colorRange = colorUtils.generateColorFromHex( color );
			}

			const colorRanges = [
				{
					color,
					name: control.params.label,
				},
				{
					color: colorRange.range.light.hex,
					name: __( 'Light variation', 'material-theme-builder' ),
				},
				{
					color: colorRange.range.dark.hex,
					name: __( 'Dark variation', 'material-theme-builder' ),
				},
			];

			colorRanges.forEach( ( { color: colorHex, name }, i ) => {
				// For text color ignore light and dark variations.
				if ( isText && 0 !== i ) {
					return;
				}

				colors.push(
					colorUtils.getColorAccessibility(
						colorHex,
						name,
						textColor,
						textColorLabel
					)
				);
			} );

			control.container
				.find( '.mtb-accessibility' )
				.html( control.accessibilityTemplate( { colors } ) );
		},

		/**
		 * Render the material palette and the accessibility warnings.
		 *
		 * @param {string|boolean} selectedColor Hex code of the selected color.
		 */
		renderPaletteWithAccessibilityWarnings( selectedColor = false ) {
			// Render the material palette component.
			this.renderMaterialPalette( selectedColor );

			// Render the accessibility warnings.
			this.renderAccessibilityWarnings( selectedColor );
		},
	} );

	/**
	 * Extends wp.customize.controlConstructor with material color constructor.
	 */
	$.extend( api.controlConstructor, {
		material_color: api.MaterialColorControl,
	} );

	/**
	 * Render the Range Slider Control.
	 *
	 * @param {Object} control Control
	 */
	const renderRangeSliderControl = control => {
		const props = {
			id: control.id,
			label: control.params.label,
			description: control.params.description,
			min: control.params.min,
			max: control.params.max,
			value: Number( control.setting.get() ) || control.params.initialValue,
		};

		render(
			<RangeSliderControl
				{ ...props }
				onChange={ newValue => {
					control.setting.set( newValue );
					control.setting._dirty = true;
				} }
			/>,
			control.container.find( '.mtb-range_slider' ).get( 0 )
		);
	};

	/**
	 * Callback when a "Design Style" is changed.
	 *
	 * @param {string} newValue Updated value.
	 * @param {string} oldValue Previous Value.
	 */
	const onStyleChange = ( newValue, oldValue ) => {
		// Bail out if custom style is selected or if we don't have a valid style.
		if (
			'custom' === newValue ||
			! mtb.designStyles ||
			! mtb.designStyles.hasOwnProperty( newValue )
		) {
			return;
		}

		// If a style is selected from custom, show confirm dialogue.
		if (
			'custom' === oldValue &&
			! window.confirm( mtb.l10n.confirmChange ) // eslint-disable-line
		) {
			api.control( mtb.styleControl ).setting.set( oldValue );
			return;
		}

		// Get defaults for selected design style.
		const defaults = mtb.designStyles[ newValue ];

		// Iterate through all the default values for the selected style
		// and update the corresponding control value.
		Object.keys( defaults ).forEach( name => {
			const value = defaults[ name ];
			const control = api.control( `${ mtb.slug }_${ name }` );

			if ( value && control ) {
				// Unbind the custom value change event.
				control.setting.unbind( onCustomValueChange );

				// Set the value from style defaults.
				control.setting.set( value );

				// Force unmount and re render the Ranger Slider control.
				if ( control.params.type === 'range_slider' ) {
					unmountComponentAtNode(
						control.container.find( '.mtb-range_slider' ).get( 0 )
					);
					renderRangeSliderControl( control );
				}

				// Rebind the custom value change event.
				control.setting.bind( onCustomValueChange );
			}
		} );

		onSettingChange();
		showHideNotification();
	};

	/**
	 * Callback when any of our control value is changed.
	 */
	const onCustomValueChange = () => {
		const styleSetting = api( mtb.styleControl );

		// If the style is not custom, change it to custom.
		if ( 'custom' !== styleSetting.get() ) {
			api( mtb.prevStyleControl ).set( styleSetting.get() );
			styleSetting.set( 'custom' );
		}

		onSettingChange();
	};

	api.RangeSliderControl = api.Control.extend( {
		ready() {
			const control = this;
			renderRangeSliderControl( control );
		},
	} );

	/**
	 * Extends wp.customize.controlConstructor with ranger slider constructor.
	 */
	$.extend( api.controlConstructor, {
		range_slider: api.RangeSliderControl,
	} );

	api.bind( 'ready', () => {
		// Iterate through our controls and bind events for value change.
		if ( mtb.controls && Array.isArray( mtb.controls ) ) {
			mtb.controls.forEach( name => {
				api( name, setting => {
					// Design style control has it's own change handler.
					if ( mtb.styleControl === name ) {
						return setting.bind( onStyleChange );
					}

					setting.bind( onCustomValueChange );
				} );
			} );
		}

		$( '.customize-control-google-fonts-wrap select' ).each( ( i, select ) => {
			const $select = $( select );

			// On value change, trigger a `change` event so select2 can update the selected dropdown option.
			api( select.id ).bind( value => {
				$select.val( value ).trigger( 'change' );
			} );

			$select
				.selectWoo( {
					data: mtb.googleFonts,
					width: '100%',
				} )
				.val( $select.data( 'value' ) )
				.trigger( 'change' );
		} );
	} );

	api.controlConstructor.icon_radio = api.Control.extend( {
		ready() {
			const control = this;
			$( 'input:radio', control.container ).change( function() {
				control.setting.set( $( this ).val() );
			} );
		},
	} );
} )( jQuery, wp.customize );

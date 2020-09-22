/* global jQuery */

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
import GlobalRangeSliderControl from './components/range-slider-control/global';
import MaterialColorPalette from '../block-editor/components/material-color-palette';
import GoogleFontsControl from './components/google-fonts-control';
import {
	loadMaterialLibrary,
	reRenderMaterialLibrary,
} from './material-library';
import {
	collapseSection,
	expandSection,
	removeOptionPrefix,
	getControlName,
	sanitizeControlId,
} from './utils';
import {
	init as notificationsInit,
	showHideNotification,
} from './notifications';
import getConfig from '../block-editor/utils/get-config';

( ( $, api ) => {
	// Allow backbone templates access to the `sanitizeControlId` function.
	window.mtbSanitizeControlId = sanitizeControlId;

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

			control.colorContainer = control.container.find( '.wp-picker-container' );

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
					if ( 'custom' !== api( getConfig( 'styleControl' ) ).get() ) {
						return;
					}

					const style = api( getConfig( 'prevStyleControl' ) ).get();
					const designStyles = getConfig( 'designStyles' );

					if ( designStyles && designStyles.hasOwnProperty( style ) ) {
						const $control = $( event.target ).closest(
								'.customize-control-material_color'
							),
							name = $control
								.attr( 'id' )
								.replace( 'customize-control-', '' )
								.replace( `${ getConfig( 'slug' ) }-`, '' ),
							controlName = getControlName( name );

						setSettingDefault(
							controlName,
							designStyles[ style ][ removeOptionPrefix( controlName ) ]
						);
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
			const textColorLabel = control.params.a11yLabel || '';

			if (
				control.params.relatedTextSetting &&
				api( control.params.relatedTextSetting )
			) {
				color = selectedColor;
				textColor = api( control.params.relatedTextSetting ).get();
				colorRange = colorUtils.generateColorFromHex( selectedColor );
				isText = false;
			} else if (
				control.params.relatedSetting &&
				api( control.params.relatedSetting )
			) {
				textColor = selectedColor;
				color = api( control.params.relatedSetting ).get();
				colorRange = colorUtils.generateColorFromHex( color );
			}

			if ( ! color || ! colorRange.range ) {
				return;
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
			// Bail out if the color picker is not active.
			if ( ! this.colorContainer.hasClass( 'wp-picker-active' ) ) {
				return;
			}

			// Render the material palette component.
			this.renderMaterialPalette( selectedColor );

			// Render the accessibility warnings.
			this.renderAccessibilityWarnings( selectedColor );
		},
	} );

	api.RangeSliderControl = api.Control.extend( {
		ready() {
			renderRangeSliderControl( this );
		},
	} );

	api.IconRadioControl = api.Control.extend( {
		ready() {
			const control = this;
			$( 'input:radio', control.container ).on( 'change', function() {
				control.setting.set( $( this ).val() );
			} );
		},
	} );

	api.GoogleFontsControl = api.Control.extend( {
		ready() {
			renderGoogleFontsControl( this );
		},
	} );

	/**
	 * Extends wp.customize.controlConstructor with custom controls.
	 */
	$.extend( api.controlConstructor, {
		material_color: api.MaterialColorControl,
		range_slider: api.RangeSliderControl,
		icon_radio: api.IconRadioControl,
		google_fonts: api.GoogleFontsControl,
	} );

	/**
	 * Handle reset for global range slider control.
	 *
	 * @param {Object} control Control
	 * @param {boolean} setDefault Should the default value be set for the global control ?
	 */
	const onResetGlobalRangeSliderControl = ( control, setDefault = false ) => {
		let style = api( getConfig( 'styleControl' ) ).get();
		if ( 'custom' === style ) {
			style = api( getConfig( 'prevStyleControl' ) ).get();
		}

		if ( style && getConfig( 'designStyles' ).hasOwnProperty( style ) ) {
			const defaults = getConfig( 'designStyles' )[ style ];
			let settingId = removeOptionPrefix( control.id );

			if ( setDefault ) {
				setSettingDefault( control.id, defaults[ settingId ] );
			}

			if ( control.params.children ) {
				control.params.children.forEach( slider => {
					settingId = removeOptionPrefix( slider.id );
					setSettingDefault( slider.id, defaults[ settingId ] );
				} );
			}

			unmountComponentAtNode(
				control.container.find( '.mtb-range_slider' ).get( 0 )
			);
			renderRangeSliderControl( control );
			reRenderMaterialLibrary();
		}
	};

	/**
	 * Render the Range Slider Control.
	 *
	 * @param {Object} control Control
	 */
	const renderRangeSliderControl = control => {
		let childSliders = [];

		if ( control.params.children ) {
			childSliders = control.params.children.map( slider => {
				const value = api( slider.id ).get();
				slider.value = Number(
					'' !== value ? value : control.params.initialValue
				);
				return slider;
			} );
		}

		const props = {
			id: control.id,
			label: control.params.label,
			description: control.params.description,
			min: control.params.min,
			max: control.params.max,
			value: Number(
				'' !== control.setting.get()
					? control.setting.get()
					: control.params.initialValue
			),
			childSliders,
		};

		const onReset = () => {
			onResetGlobalRangeSliderControl( control, true );
		};

		render(
			<GlobalRangeSliderControl
				{ ...props }
				onChange={ newValue => {
					control.setting.set( newValue );
					control.setting._dirty = true;
				} }
				onChildChange={ ( name, value ) => {
					api( name ).set( value );
					reRenderMaterialLibrary();
				} }
				onResetToDefault={ onReset }
			/>,
			control.container.find( '.mtb-range_slider' ).get( 0 )
		);
	};

	const renderGoogleFontsControl = control => {
		const googleFonts = getConfig( 'googleFonts' );
		const { params, id, setting } = control;
		const selectedFont = setting.get();
		let children = [];

		if ( 0 !== params.children.length ) {
			children = params.children.map( child => {
				if ( googleFonts.hasOwnProperty( selectedFont ) ) {
					child.weight.choices = googleFonts[ selectedFont ].variants;
				}

				if ( ! child.value ) {
					return child;
				}

				const valueObject = JSON.parse( child.value );

				child.size.value = valueObject.size;
				child.weight.value = valueObject.weight;

				return child;
			} );
		}

		const props = {
			id,
			label: params.label,
			description: params.description,
			value: selectedFont,
			children,
			fonts: getConfig( 'googleFonts' ),
			onChange: event => {
				const value = event.currentTarget.value;
				setting.set( value );
			},
		};

		if ( 0 === params.children.length ) {
			return;
		}

		render( <GoogleFontsControl { ...props } />, control.container.get( 0 ) );
	};

	/**
	 * Callback when a "Design Style" is changed.
	 *
	 * @param {string} newValue Updated value.
	 * @param {string} oldValue Previous Value.
	 */
	const onStyleChange = ( newValue, oldValue ) => {
		const designStyles = getConfig( 'designStyles' );

		// Bail out if custom style is selected or if we don't have a valid style.
		if (
			'custom' === newValue ||
			! designStyles ||
			! designStyles.hasOwnProperty( newValue )
		) {
			return;
		}

		// If a style is selected from custom, show confirm dialogue.
		if (
			'custom' === oldValue &&
			! window.confirm( getConfig( 'l10n' ).confirmChange ) // eslint-disable-line
		) {
			api.control( getConfig( 'styleControl' ) ).setting.set( oldValue );
			return;
		}

		// Get defaults for selected design style.
		const defaults = designStyles[ newValue ];

		// Iterate through all the default values for the selected style
		// and update the corresponding control value.
		Object.keys( defaults ).forEach( name => {
			if ( ! name.includes( 'global_radius' ) && name.includes( '_radius' ) ) {
				return;
			}

			const value = defaults[ name ];
			const settingName = getControlName( name );

			setSettingDefault( settingName, value, () => {
				const control = api.control( settingName );

				// Force unmount and re render the Ranger Slider control.
				if (
					control &&
					control.params.type === 'range_slider' &&
					control.params.children &&
					control.params.children.length
				) {
					onResetGlobalRangeSliderControl( control );
				}

				if ( settingName.includes( 'font_family' ) ) {
					api
						.control( settingName )
						.container.find( '.google-fonts-control-selection' )
						.val( value )
						.trigger( 'change' );
				}
			} );
		} );

		reRenderMaterialLibrary();
		showHideNotification( loadMaterialLibrary );
	};

	/**
	 * Callback when any of our control value is changed.
	 */
	const onCustomValueChange = () => {
		const styleSetting = api( getConfig( 'styleControl' ) );

		// If the style is not custom, change it to custom.
		if ( 'custom' !== styleSetting.get() ) {
			api( getConfig( 'prevStyleControl' ) ).set( styleSetting.get() );
			styleSetting.set( 'custom' );
		}

		reRenderMaterialLibrary();
	};

	/**
	 * Set default value for a setting.
	 *
	 * @param {string}        settingId ID of the setting.
	 * @param {string|number} value     Value of the setting.
	 * @param {Function}      onSet     Callback after the value is set.
	 */
	const setSettingDefault = ( settingId, value, onSet ) => {
		const setting = api( settingId );

		if ( setting ) {
			// Unbind the custom value change event.
			setting.unbind( onCustomValueChange );

			// Set the value from style defaults.
			setting.set( value );

			if ( 'function' === typeof onSet ) {
				onSet.call();
			}

			// Rebind the custom value change event.
			setting.bind( onCustomValueChange );
		}
	};

	api.bind( 'ready', () => {
		const controls = getConfig( 'controls' );
		const styleControl = getConfig( 'styleControl' );

		// Iterate through our controls and bind events for value change.
		if ( controls && Array.isArray( controls ) ) {
			controls.forEach( name => {
				api( name, setting => {
					// Design style control has it's own change handler.
					if ( styleControl === name ) {
						return setting.bind( onStyleChange );
					}

					setting.bind( onCustomValueChange );
				} );
			} );
		}

		const focusSection = api.settings.autofocus.section;
		if (
			focusSection &&
			focusSection === `${ getConfig( 'slug' ) }_corner_styles`
		) {
			api.section( focusSection, instance => {
				instance.deferred.embedded.done( () => {
					api.previewer.deferred.active.done( () => {
						setTimeout( () => {
							api
								.control( `${ getConfig( 'slug' ) }[global_radius]` )
								.container.find( '.range-slider-control-settings-expanded' )
								.trigger( 'click' );
						}, 500 );
					} );
				} );
			} );
		}
	} );

	// Trigger notification init on ready.
	$( notificationsInit );

	// Material Blocks.
	$( document ).on( 'click', '.toggle-material-library', loadMaterialLibrary );

	// Show material library if the material-library hash exists.
	if ( window.location.hash && window.location.hash === '#material-library' ) {
		$( '#customize-save-button-wrapper' ).ready( loadMaterialLibrary );
	}
} )( jQuery, wp.customize );

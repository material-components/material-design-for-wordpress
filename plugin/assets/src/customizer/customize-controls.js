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
import StyleSettingsControl from './components/style-settings-control';
import ColorControl from './components/color-control';
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
	window.materialDesignSanitizeControlId = sanitizeControlId;

	const getNamespace = id => `material_design_${ id }`;

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

	api.StylesSection = api.Section.extend( {
		defaultExpandedArguments: $.extend(
			{},
			api.Section.defaultExpandedArguments,
			{ allowMultiple: false }
		),

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
					.container.find( '.material-style-change-settings' )
					.on( 'click keydown', event => {
						section.collapse( { showSettings: true } );
						event.stopPropagation();
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
			const settingsSection = api.section( getNamespace( 'style_settings' ) );

			// Immediately call the complete callback if there were no changes.
			if ( args.showSettings ) {
				if ( args.completeCallback ) {
					args.completeCallback();
					if ( settingsSection ) {
						settingsSection.expand();
					}
				}
				return;
			}

			// Expand section normally
			api.Section.prototype.onChangeExpanded.call( section, expanded, args );
		},
	} );

	api.ColorsSection = api.CollapsibleSection.extend( {
		defaultExpandedArguments: $.extend(
			{},
			api.Section.defaultExpandedArguments,
			{ allowMultiple: true }
		),

		template: wp.template( 'customize-section-material_color-tabs' ),

		/**
		 * wp.customize.ColorsSection
		 *
		 * Custom section which would act as a collapsible (accordion).
		 *
		 * @constructs wp.customize.ColorsSection
		 * @augments   wp.customize.Section
		 *
		 * @param {string} id - ID.
		 * @param {Object} options - Options.
		 * @return {void}
		 */
		initialize( id, options ) {
			const section = this;
			api.Section.prototype.initialize.call( section, id, options );

			// Add classes
			section.container.addClass( 'control-section-collapse' );

			// Move the section to it's parent panel.
			section.headContainer.append( $( '#sub-accordion-section-' + id ) );

			if ( section.panel && section.panel() ) {
				const panel = api.panel( section.panel() );

				if ( panel ) {
					panel.container.last().addClass( 'control-section-collapse-parent' );
				}
			}
		},

		ready() {
			const section = this;

			api.Section.prototype.ready.call( section );

			const content = section.contentContainer.html();

			section.contentContainer.html(
				section.template( { id: section.id, content } )
			);

			section.contentContainer
				.find( '.material-design-section-tabs .material-design-tab-link' )
				.on( 'click', event => {
					const { target } = event;

					if ( ! target ) {
						return;
					}

					const { palette } = target.dataset;

					if ( ! palette ) {
						return;
					}

					section.contentContainer
						.find( '.material-design-tab-link--active' )
						.removeClass( 'material-design-tab-link--active' );

					target.classList.add( 'material-design-tab-link--active' );

					// Display content.
					const activeTab = section.contentContainer.find(
						`.material-design-tab-content.tab-${ palette }`
					);

					if ( 0 === activeTab.length ) {
						return;
					}

					section.contentContainer
						.find( `.material-design-tab-content` )
						.removeClass( 'active' );

					section.contentContainer
						.find( `.material-design-tab-content.tab-${ palette }` )
						.addClass( 'active' );

					// Setup new colors.
					api.previewer.send( 'materialDesignPaletteUpdate', palette );
				} );
		},
	} );

	/**
	 * Extends wp.customize.sectionConstructor with section constructor for collapsible section.
	 */
	$.extend( api.sectionConstructor, {
		collapse: api.CollapsibleSection,
		styles: api.StylesSection,
		colors: api.ColorsSection,
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

			/* control.colorContainer = control.container.find( '.wp-picker-container' );

			const picker = control.container.find( '.wp-picker-holder' );
			const container = control.container.find( '.wp-picker-container' );

			// Append the tabs markup to container.
			container.append( control.template( { id: control.id } ) );

			// Move picker to the custom tab.
			container.find( '.tab-custom' ).append( picker );

			// Add the tab links click event to show/hide tab content.
			container.find( '.material-design-tab-link' ).on( 'click', event => {
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
				.find( '.material-design-tab-link' )
				.first()
				.trigger( 'click' );

			container
				.find( '.wp-picker-default' )
				.val( __( 'Reset', 'material-design' ) )
				.attr( 'aria-label', __( 'Reset to default color', 'material-design' ) )
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
				} ); */

			renderColorControl( this );
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
				colorRange = colorUtils.getColorRangeFromHex( selectedColor );
				isText = false;
			} else if (
				control.params.relatedSetting &&
				api( control.params.relatedSetting )
			) {
				textColor = selectedColor;
				color = api( control.params.relatedSetting ).get();
				colorRange = colorUtils.getColorRangeFromHex( color );
			}

			if ( ! color || ! colorRange ) {
				return;
			}

			const colorRanges = [
				{
					color,
					name: control.params.label,
				},
				{
					color: colorRange.light.hex,
					name: __( 'Light variation', 'material-design' ),
				},
				{
					color: colorRange.dark.hex,
					name: __( 'Dark variation', 'material-design' ),
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
				.find( '.material-design-accessibility' )
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

	api.StyleSettingsControl = api.Control.extend( {
		ready() {
			renderStyleSettingsControl( this );
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
		style_settings: api.StyleSettingsControl,
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
				control.container.find( '.material-design-range_slider' ).get( 0 )
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
			control.container.find( '.material-design-range_slider' ).get( 0 )
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

	const renderStyleSettingsControl = control => {
		const { setting } = control;
		let defaultValue = setting.get();
		const selectedStyle = api( getConfig( 'styleControl' ) ).get();

		if ( 'string' === typeof defaultValue ) {
			defaultValue = JSON.parse( defaultValue );
		}

		const props = {
			defaultValue,
			selectedStyle,
			setValue: value => {
				setting.set(
					JSON.stringify( {
						...defaultValue,
						[ selectedStyle ]: {
							...value,
						},
					} )
				);
			},
		};

		render( <StyleSettingsControl { ...props } />, control.container.get( 0 ) );
	};

	const renderColorControl = control => {
		const { setting, params } = control;
		let mode = 'default';
		let range = null;

		if ( params.defaultModeSetting ) {
			const parentDefaultColor = api.control( params.defaultModeSetting );

			mode = params.id?.includes( '_dark' ) ? 'dark' : 'contrast';
			range = colorUtils.getColorRangeFromHex(
				parentDefaultColor.setting.get()
			);
		}

		const props = {
			defaultValue: setting.get(),
			onColorChange: value => {
				control.setting.set( value );
			},
			params,
			api,
			range,
			mode,
		};

		render( <ColorControl { ...props } />, control.container.get( 0 ) );
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
		reRenderColorControls();
		updateActiveStyleName();
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
		updateActiveStyleName();
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

	const updateActiveStyleName = () => {
		const sectionTitleElement = document.querySelector(
			'#accordion-section-material_design_style .customize-title'
		);

		if ( ! sectionTitleElement ) {
			return;
		}

		const currentStyle = api( getConfig( 'styleControl' ) ).get();
		const control = api.control( getConfig( 'styleSettings' ) );
		const controlsSectionElement = document.querySelector(
			'#js-customize-section-style'
		);
		const sectionPreview = document.querySelector(
			'#accordion-section-material_design_style .control-section-styles-preview'
		);

		sectionTitleElement.textContent = currentStyle;
		controlsSectionElement.textContent = currentStyle;

		sectionPreview.src = getConfig( 'styleChoices' )[ currentStyle ].url;

		unmountComponentAtNode( control.container.get( 0 ) );

		renderStyleSettingsControl( control );
	};

	const reRenderColorControls = () => {
		const controlObjects = getConfig( 'colorControls' );

		controlObjects.forEach( controlObject => {
			const setting =
				controlObject.related_text_setting || controlObject.related_setting;
			const control = api.control( setting );

			if ( ! control ) {
				return;
			}

			unmountComponentAtNode( control.container.get( 0 ) );

			renderColorControl( control );
		} );
	};

	api.bind( 'ready', () => {
		const controls = getConfig( 'controls' );
		const styleControl = getConfig( 'styleControl' );
		const styleSettings = getConfig( 'styleSettings' );

		// Iterate through our controls and bind events for value change.
		if ( controls && Array.isArray( controls ) ) {
			controls.forEach( name => {
				api( name, setting => {
					// Design style control has it's own change handler.
					if ( styleControl === name ) {
						return setting.bind( onStyleChange );
					}

					// Style settings don't trigger custom style handler.
					if ( styleSettings === name ) {
						return;
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

		setTimeout( arrangeDarkMode, 3000 );
	} );

	const arrangeDarkMode = () => {
		const colorSection = api.section( getNamespace( 'colors' ) );

		if ( ! colorSection ) {
			return;
		}

		const controls = getConfig( 'colorControls' );

		const defaultModeTab = colorSection.container.find( '.tab-default' );
		const darkModeTab = colorSection.container.find( '.tab-dark-mode' );
		const contrastModeTab = colorSection.container.find( '.tab-high-contrast' );

		controls.forEach( controlObject => {
			const control = api.control( `material_design[${ controlObject.id }]` );

			defaultModeTab.append( control.container.get( 0 ) );
		} );

		controls.forEach( controlObject => {
			const control = api.control(
				`material_design[${ controlObject.id }_dark]`
			);

			darkModeTab.append( control.container.get( 0 ) );
		} );

		controls.forEach( controlObject => {
			const control = api.control(
				`material_design[${ controlObject.id }_contrast]`
			);

			contrastModeTab.append( control.container.get( 0 ) );
		} );
	};

	// Trigger notification init on ready.
	$( notificationsInit );

	// Material Blocks.
	$( document ).on( 'click', '.toggle-material-library', loadMaterialLibrary );

	// Show material library if the material-library hash exists.
	if ( window.location.hash && window.location.hash === '#material-library' ) {
		$( '#customize-save-button-wrapper' ).ready( loadMaterialLibrary );
	}
} )( jQuery, wp.customize );

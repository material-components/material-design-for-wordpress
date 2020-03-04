/* global jQuery, requestAnimationFrame, mtb */

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains extra logic for our Customizer controls & settings.
 *
 * @since 0.0.1
 */
import { render } from '@wordpress/element';
import MaterialColorPalette from '../block-editor/components/material-color-palette';

( ( $, api ) => {
	/**
	 * Collapse a DOM node by animating it's height to 0.
	 *
	 * @param {Node} element
	 */
	const collapseSection = element => {
		// get the height of the element's inner content, regardless of its actual size
		const sectionHeight = element.scrollHeight;

		// temporarily disable all css transitions
		const elementTransition = element.style.transition;
		element.style.transition = '';

		// on the next frame (as soon as the previous style change has taken effect),
		// explicitly set the element's height to its current pixel height, so we
		// aren't transitioning out of 'auto'
		requestAnimationFrame( () => {
			element.style.height = sectionHeight + 'px';
			element.style.transition = elementTransition;

			// on the next frame (as soon as the previous style change has taken effect),
			// have the element transition to height: 0
			requestAnimationFrame( () => {
				element.style.height = 0 + 'px';
			} );
		} );
		// mark the section as "currently collapsed"
		element.setAttribute( 'data-collapsed', 'true' );
	};

	/**
	 * Expand a DOM node by animating it's height to full.
	 *
	 * @param {Node} element
	 */
	const expandSection = element => {
		// get the height of the element's inner content, regardless of its actual size
		const sectionHeight = element.scrollHeight + 2;

		const removeEvent = () => {
			element.style.height = 'auto';

			// remove this event listener so it only gets triggered once
			element.removeEventListener( 'transitionend', removeEvent );
		};

		// have the element transition to the height of its inner content
		element.style.height = sectionHeight + 'px';

		// when the next css transition finishes (which should be the one we just triggered)
		element.addEventListener( 'transitionend', removeEvent );

		// mark the section as "currently not collapsed"
		element.setAttribute( 'data-collapsed', 'false' );
	};

	/**
	 * Extend wp.customize.Section as a collapsible section
	 */
	api.CollapsibleSection = api.Section.extend( {
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

			if ( section.panel() ) {
				const panel = api.panel( section.panel() );
				panel.container
					.find( '.customize-panel-back' )
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
				// if ( ! args.allowMultiple ) {
				// 	api.section.each( otherSection => {
				// 		if ( otherSection !== section ) {
				// 			otherSection.collapse( { duration: args.duration } );
				// 		}
				// 	} );
				// }

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

			// Render the material palette component in the palette tab.
			control.renderMaterialPalette();

			// Re-render the material palette component if the color is updated.
			control.setting.bind( value => control.renderMaterialPalette( value ) );

			const colorToggler = container.find( '.wp-color-result' ),
				colorInput = container.find( '.wp-color-picker' );

			// Add our own custom color picker open/close events.
			colorToggler.off( 'click' ).on( 'click', () => {
				if ( colorToggler.hasClass( 'wp-picker-open' ) ) {
					colorInput.data( 'wpWpColorPicker' ).close();
				} else {
					colorInput.data( 'wpWpColorPicker' ).open();
				}
			} );

			// Remove the `click.wpcolorpicker` event and add our own.
			container
				.off( 'click.wpcolorpicker' )
				.on( 'click.wpcolorpicker', event => {
					// Stop prpagation only if the click is not from a material color select
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
							1000
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
		},

		/**
		 * Render the `MaterialColorPalette` component in the palette tab.
		 *
		 * @param {string} value
		 */
		renderMaterialPalette( value ) {
			const control = this;
			render(
				<MaterialColorPalette
					value={ value || control.setting.get() }
					onChange={ newValue => control.setting.set( newValue ) }
					materialColorsOnly={ true }
				/>,
				control.container.find( '.tab-palette' ).get( 0 )
			);
		},
	} );

	/**
	 * Extends wp.customize.controlConstructor with material color constructor.
	 */
	$.extend( api.controlConstructor, {
		material_color: api.MaterialColorControl,
	} );

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
		if ( 'custom' === oldValue && ! window.confirm( mtb.l10n.confirmChange ) ) { // eslint-disable-line
			api.control( mtb.styleControl ).setting.set( oldValue );
			return;
		}

		const defaults = mtb.designStyles[ newValue ];

		// Iterate through all the default values for the selected style
		// and update the corresponding control value.
		Object.keys( defaults ).forEach( name => {
			const value = defaults[ name ];
			const control = api.control( `mtb_${ name }` );

			if ( value && control ) {
				// Unbind the custom value change event.
				control.setting.unbind( onCustomValueChange );

				// Set the value from style defaults.
				control.setting.set( value );

				// Rebind the custom value change event.
				control.setting.bind( onCustomValueChange );
			}
		} );
	};

	/**
	 * Callback when any of our control value is changed.
	 */
	const onCustomValueChange = () => {
		const styleSetting = api( mtb.styleControl );
		if ( 'custom' !== styleSetting.get() ) {
			styleSetting.set( 'custom' );
		}
	};

	api.bind( 'ready', () => {
		// Iterate through our controls and bind events for value change.
		if ( mtb.controls && Array.isArray( mtb.controls ) ) {
			mtb.controls.forEach( name => {
				api( name, setting => {
					if ( mtb.styleControl === name ) {
						return setting.bind( onStyleChange );
					}

					setting.bind( onCustomValueChange );
				} );
			} );
		}
	} );
} )( jQuery, wp.customize );

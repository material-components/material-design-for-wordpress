/* global jQuery, requestAnimationFrame, mtb */

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains extra logic for our Customizer controls & settings.
 *
 * @since 0.0.1
 */

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

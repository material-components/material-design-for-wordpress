/* global jQuery */
/**
 * Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Customizer preview reload changes asynchronously.
 *
 * @since 1.0.0
 */

( $ => {
	const parentApi = window.parent.wp.customize;
	const controls = window.parent._wpCustomizeSettings.controls;
	const colorControls = {};
	Object.keys( controls ).forEach( control => {
		const args = controls[ control ];

		if (
			args &&
			!! args.cssVar &&
			( !! args.relatedTextSetting || !! args.relatedSetting )
		) {
			colorControls[ control ] = args.cssVar;
		}
	} );

	/**
	 * Add styles to elements in the preview pane.
	 *
	 * @since 1.0.0
	 *
	 * @return {void}
	 */
	const generateColorPreviewStyles = () => {
		const stylesheedID = 'mtb-customizer-preview-styles';
		let stylesheet = $( '#' + stylesheedID ),
			styles = '';

		// If the stylesheet doesn't exist, create it and append it to <head>.
		if ( ! stylesheet.length ) {
			$( 'head' ).append( '<style id="' + stylesheedID + '"></style>' );
			stylesheet = $( '#' + stylesheedID );
		}

		Object.keys( colorControls ).forEach( control => {
			styles += `${ colorControls[ control ] }: ${ parentApi(
				control
			).get() };`;
		} );

		styles = `:root{
			${ styles }
		}`;

		// Add styles.
		stylesheet.html( styles );
	};

	Object.keys( colorControls ).forEach( control => {
		parentApi( control, value => {
			value.bind( () => {
				generateColorPreviewStyles();
			} );
		} );
	} );
} )( jQuery );

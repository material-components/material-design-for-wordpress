import { useSelect } from '@wordpress/data';
import '@wordpress/escape-html';
import { __experimentalRichText } from '@wordpress/rich-text';

if (
	window.wp &&
	window.wp.richText &&
	! window.wp.richText.__experimentalRichText
) {
	window.wp.richText.__experimentalRichText = __experimentalRichText;
}

if ( window.wp && window.wp.data && ! window.wp.data.useSelect ) {
	window.wp.data.useSelect = useSelect;
}

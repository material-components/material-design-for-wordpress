import { __experimentalRichText } from '@wordpress/rich-text';
import { RichText } from '@wordpress/block-editor';

export default __experimentalRichText || RichText;
export const isExperimental = 'undefined' !== __experimentalRichText;

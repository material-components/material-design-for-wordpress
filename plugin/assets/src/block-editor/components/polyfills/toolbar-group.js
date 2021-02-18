/**
 * WordPress dependencies
 */
import {
	ToolbarGroup as MaybeToolbarGroup,
	Toolbar,
} from '@wordpress/components';

export default MaybeToolbarGroup || Toolbar;

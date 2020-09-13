/**
 * Internal dependencies
 */
import icon from './components/block-icon';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import transforms from './transforms';

import './style.css';

export const { name } = metadata;

export const settings = {
	...metadata,
	icon,
	edit,
	save,
	transforms,
};

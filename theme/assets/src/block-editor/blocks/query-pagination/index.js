/**
 * Internal dependencies
 */

import metadata from './block.json';
import './hooks';
import edit from './edit';
import save from './save';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon: () => (
		<span className="material-icons material-icons__button">
			more_horiz
		</span>
	),
	edit,
	save,
};

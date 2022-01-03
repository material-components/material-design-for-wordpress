import metadata from './block.json';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon: () => (
		<span className="material-icons material-icons__button">
			navigate_next
		</span>
	),
};

import { icons as rawIcons } from '!!json-loader!material-design-icons/iconfont/MaterialIcons-Regular.ijmap';

/**
 * Search and find a material icon by name.
 *
 * @param {string} iconName The icon to search for.
 */
export default iconName => {
	const icons = Object.keys( rawIcons );

	const foundIcon = icons.find(
		icon => rawIcons[ icon ].name.toLowerCase() === iconName.toLowerCase()
	);

	return foundIcon ? { name: iconName, hex: parseInt( foundIcon, 16 ) } : null;
};

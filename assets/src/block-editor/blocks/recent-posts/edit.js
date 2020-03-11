/**
 * Internal dependencies
 */
import InspectorControls from './components/inspector-controls';
import EditWithSelect from '../common-posts-list/edit-with-select';

/**
 * Recent Posts Edit component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Component attributes.
 * @param {string} props.name - Component name.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	return (
		<>
			<InspectorControls { ...props } />
			<EditWithSelect { ...props } />
		</>
	);
};

export default Edit;

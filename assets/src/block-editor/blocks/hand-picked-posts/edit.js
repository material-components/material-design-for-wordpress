/**
 * WordPress dependencies
 */
import { withSpokenMessages } from '@wordpress/components';

/**
 * Internal dependencies
 */
import PostsPicker from './components/posts-picker';
import HandpickedPostBlockControls from './components/block-controls';
import InspectorControls from '../common-posts-list/components/inspector-controls';
import './editor.css';
import EditWithSelect from '../common-posts-list/edit-with-select';

/**
 * Hand-picked Posts Edit component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.attributes - Component attributes.
 * @param {string} props.name - Component name.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const {
		attributes: { editMode },
	} = props;

	return (
		<>
			<InspectorControls { ...props } />
			<HandpickedPostBlockControls { ...props } />
			{ editMode ? (
				<PostsPicker { ...props } />
			) : (
				<EditWithSelect { ...props } />
			) }
		</>
	);
};

export default withSpokenMessages( Edit );

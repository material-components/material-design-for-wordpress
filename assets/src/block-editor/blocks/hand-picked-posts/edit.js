/**
 * WordPress dependencies
 */
import { ServerSideRender } from '@wordpress/editor';
import { Disabled, withSpokenMessages } from '@wordpress/components';

/**
 * Internal dependencies
 */
import PostsPicker from './components/posts-picker';
import HandpickedPostBlockControls from './components/block-controls';
import HandpickedPostInspectorControls from '../common-posts-list/components/inspector-controls';
import '../common-posts-list/style.css';
import './editor.css';

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
	const { attributes, name } = props;
	const { editMode } = attributes;

	return (
		<>
			<HandpickedPostBlockControls { ...props } />
			<HandpickedPostInspectorControls { ...props } />
			{ editMode ? (
				<PostsPicker { ...props } />
			) : (
				<Disabled>
					<ServerSideRender block={ name } attributes={ attributes } />
				</Disabled>
			) }
		</>
	);
};

export default withSpokenMessages( Edit );

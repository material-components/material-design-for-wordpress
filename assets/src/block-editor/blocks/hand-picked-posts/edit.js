/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { withSpokenMessages } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PostsPicker from './components/posts-picker';
import HandpickedPostBlockControls from './components/block-controls';
import InspectorControls from '../common-posts-list/components/inspector-controls';
import './editor.css';
import EditWithSelect from '../common-posts-list/edit-with-select';
import getConfig from '../../utils/get-config';

/**
 * Curated Post Collection Edit component.
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

	if ( props.attributes.preview ) {
		return (
			<img
				src={ getConfig( 'handpicked_posts_preview' ) }
				alt={ __( 'Curated Post Collection Preview', 'material-design' ) }
			/>
		);
	}

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

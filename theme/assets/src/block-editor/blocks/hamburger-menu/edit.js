/**
 * Copyright 2022 Google LLC
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
import {
	useBlockProps,
	BlockControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { edit } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import Button from './button';

/** @type {Array} */
const ALLOWED_BLOCKS = [ 'material/drawer' ];

/**
 * Edit.
 *
 * @param {Object} props
 *
 * @return {JSX.Element} Block edit.
 */
const Edit = props => {
	const {
		setAttributes,
		clientId,
		attributes: { isDrawerOpen },
	} = props;

	const toggleDrawer = () => {
		setAttributes( { isDrawerOpen: ! isDrawerOpen } );
	};

	const innerBlockCount = useSelect( select => {
		return select( 'core/block-editor' ).getBlock( clientId ).innerBlocks
			.length;
	} );

	const customAppender = () => {
		if ( innerBlockCount > 0 ) {
			return false;
		}

		return <InnerBlocks.ButtonBlockAppender />;
	};

	return (
		<>
			<BlockControls>
				<ToolbarButton
					label={ __( 'Edit Drawer', 'material-design' ) }
					onClick={ toggleDrawer }
					icon={ edit }
				/>
			</BlockControls>
			<div { ...useBlockProps() }>
				<Button />

				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ [ ALLOWED_BLOCKS ] }
					renderAppender={ customAppender }
				/>
			</div>
		</>
	);
};

export default Edit;

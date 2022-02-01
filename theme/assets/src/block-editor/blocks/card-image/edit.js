/**
 * Copyright 2020 Google LLC
 *
 * Licensed uder the Apache License, Version 2.0 (the "License");
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
 * External dependencies
 */
/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import { name } from './block.json';

/**
 * Edit.
 *
 * @param {Object}                                         props
 * @param {{postType:string,postId:number,queryId:number}} props.context
 * @param {Object}                                         props.attributes
 * @return {JSX.Element} Block edit.
 */
const Edit = ( { context, attributes } ) => {
	const urlQueryArgs = {
		materialParamContext: [],
	};
	// Server side rendering doesn't support passing context yet. This hack adds context as url param to later manually parse in php.
	for ( const key in context ) {
		urlQueryArgs.materialParamContext[ key ] = context[ key ];
	}
	const ssrAttributes = {
		...attributes,
		...{ isEditMode: true },
	};
	return (
		<>
			<div { ...useBlockProps() }>
				<ServerSideRender
					block={ name }
					urlQueryArgs={ urlQueryArgs }
					attributes={ ssrAttributes }
				/>
			</div>
		</>
	);
};

export default Edit;

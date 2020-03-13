/**
 * WordPress dependencies
 */
import { createContext } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

export const ListContext = createContext( { parentClientId: null } );

/**
 * Material list edit component.
 */
const ListEdit = ( { className, clientId } ) => (
	<ListContext.Provider value={ { parentClientId: clientId } }>
		<ul className={ `mdc-list mdc-list--two-line ${ className }` }>
			<InnerBlocks
				template={ [ [ 'material/list-item' ], [ 'material/list-item' ] ] }
				allowedBlocks={ [ 'material/list-item' ] }
			/>
		</ul>
	</ListContext.Provider>
);

export default ListEdit;

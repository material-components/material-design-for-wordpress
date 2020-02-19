/**
 * Internal dependencies
 */
import InspectorControls from './inspector-controls';
import SinglePost from './single-post';

// @todo: Refactor Material design layout
export default ( { attributes, setAttributes, recentPosts } ) => {
	const { style, columns } = attributes;

	let columnSpan = 12;

	// @todo: review logic
	if ( style === 'stacked' ) {
		columnSpan = Math.floor( 12 / columns );
	}

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div className="mdc-layout-grid">
				<div className="mdc-layout-grid__inner">
					{ recentPosts.map( ( post, postIndex ) => {
						const props = { post, postIndex, attributes };
						return (
							<div
								key={ postIndex }
								className={ `mdc-layout-grid__cell--span-${ columnSpan }` }
							>
								<SinglePost { ...props } />
							</div>
						);
					} ) }
				</div>
			</div>
		</>
	);
};

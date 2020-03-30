/*
{
	bodyFontFamily,
	headFontFamily,
	iconCollection,
	largeComponentRadius,
	mediumComponentRadius,
	primaryColor,
	primaryTextColor,
	secondaryColor,
	secondaryTextColor,
	smallComponentRadius,
	style,
}
*/

const KitchenSink = props => (
	<div>
		<h1>Kitchenn Sink Boi</h1>
		<ul>
			{ Object.keys( props ).map( prop => (
				<li key={ prop }>
					{ prop }: { props[ prop ] }
				</li>
			) ) }
		</ul>
	</div>
);

export default KitchenSink;

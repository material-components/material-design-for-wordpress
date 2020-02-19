/**
 * Internal dependencies
 */
import Button from './button';

export default function ButtonSave( { attributes: { label, url } } ) {
	return (
		<div>
			<Button to={ url }>{ label }</Button>
		</div>
	);
}

/**
 * Internal dependencies
 */
import Button from './button';

export default function ButtonSave( {
	attributes: { label },
	...otherAttributes
} ) {
	return (
		<div>
			<Button { ...otherAttributes }>{ label }</Button>
		</div>
	);
}

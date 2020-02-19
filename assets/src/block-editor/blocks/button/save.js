/**
 * Internal dependencies
 */
import Button from './button';

export default function ButtonSave( { attributes } ) {
	return (
		<div>
			<Button { ...attributes }>Button Text</Button>
		</div>
	);
}

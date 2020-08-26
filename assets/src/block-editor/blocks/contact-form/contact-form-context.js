import { createContext } from '@wordpress/element';

const ContactFormContext = createContext( {
	parentOutlined: true,
	parentFullWidth: true,
	parentSetter: () => {},
} );

export default ContactFormContext;

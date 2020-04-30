import { createContext } from '@wordpress/element';

const ContactFormContext = createContext( {
	parentOutlined: true,
	parentFullWidth: true,
} );

export default ContactFormContext;

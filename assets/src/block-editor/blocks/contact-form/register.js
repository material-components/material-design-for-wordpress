import { registerBlockType } from '@wordpress/blocks';

import { name, settings } from '.';
import {
	name as emailInputFieldName,
	settings as emailInputFieldSettings,
} from './inner-blocks/email-input-field';
import {
	name as messageInputFieldName,
	settings as messageInputFieldSettings,
} from './inner-blocks/message-input-field';
import {
	name as nameInputFieldName,
	settings as nameInputFieldSettings,
} from './inner-blocks/name-input-field';
import {
	name as shortTextInputFieldName,
	settings as shortTextInputFieldSettings,
} from './inner-blocks/short-text-input-field';
import {
	name as websiteInputFieldName,
	settings as websiteInputFieldSettings,
} from './inner-blocks/website-input-field';

registerBlockType( name, settings );
registerBlockType( emailInputFieldName, emailInputFieldSettings );
registerBlockType( messageInputFieldName, messageInputFieldSettings );
registerBlockType( nameInputFieldName, nameInputFieldSettings );
registerBlockType( shortTextInputFieldName, shortTextInputFieldSettings );
registerBlockType( websiteInputFieldName, websiteInputFieldSettings );

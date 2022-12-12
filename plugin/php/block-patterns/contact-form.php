<?php
/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @package MaterialDesign
 */

/**
 * Contact Form pattern.
 *
 * @package MaterialDesign
 */

return [
	'title'         => __( 'Contact Form', 'material-design' ),
	'content'       => '<!-- wp:heading {"textAlign":"center","level":3} -->
<h3 class="has-text-align-center">Contact us</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"8px"} -->
<div style="height:8px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:material/contact-form {"emailTo":"test@example.com"} -->
<div class="wp-block-material-contact-form"><!-- wp:material/name-input-field {"id":"material-design-name-1"} -->
<div class="mdc-text-field-container"><div class="mdc-text-field mdc-text-field--custom-full"><span class="mdc-text-field__ripple"></span><input id="material-design-name-1" name="material-design-name-1" type="text" required class="mdc-text-field__input" aria-labelledby="label-material-design-name-1" data-form="contact" data-meta="name" data-label="Name"/><div class="mdc-line-ripple"></div><label for="material-design-name-1" class="mdc-floating-label" id="label-material-design-name-1">Name</label></div></div>
<!-- /wp:material/name-input-field -->

<!-- wp:material/email-input-field {"id":"material-design-email-3"} -->
<div class="mdc-text-field-container"><div class="mdc-text-field mdc-text-field--custom-full"><span class="mdc-text-field__ripple"></span><input id="material-design-email-3" name="material-design-email-3" type="email" required class="mdc-text-field__input" aria-labelledby="label-material-design-email-3" data-form="contact" data-meta="email" data-label="Email"/><div class="mdc-line-ripple"></div><label for="material-design-email-3" class="mdc-floating-label" id="label-material-design-email-3">Email</label></div></div>
<!-- /wp:material/email-input-field -->

<!-- wp:material/message-input-field {"id":"material-design-message-1","outlined":false} -->
<div class="mdc-text-field-container"><div class="mdc-text-field mdc-text-field--textarea mdc-text-field--custom-full"><span class="mdc-text-field__ripple"></span><textarea id="material-design-message-1" name="material-design-message-1" class="mdc-text-field__input" rows="8" aria-labelledby="label-material-design-message-1" data-form="contact" data-meta="message" data-label="Message" required></textarea><div class="mdc-line-ripple"></div><label for="material-design-message-1" class="mdc-floating-label" id="label-material-design-message-1">Message</label></div></div>
<!-- /wp:material/message-input-field -->

<!-- wp:material/button {"iconPosition":"none","isSubmit":true,"size":"large","elevationStyle":"filled"} -->
<div class="wp-block-material-button" id="block-material-button-15"><button class="mdc-button label-large mdc-button--filled is-large" type="submit"><div class="mdc-button__ripple"></div><span class="mdc-button__label">Send Message</span></button></div>
<!-- /wp:material/button --></div>
<!-- /wp:material/contact-form -->',
	'viewportWidth' => 800,
	'categories'    => [ 'material', 'buttons', 'header' ],
	'description'   => __( 'Contact Form pattern.', 'material-design' ),
];

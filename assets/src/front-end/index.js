/* global addEventListener, jQuery, mtb, grecaptcha */
/* istanbul ignore file */

/**
 * External dependencies
 */
import { MDCRipple } from '@material/ripple';
import { MDCList } from '@material/list';
import { MDCTabBar } from '@material/tab-bar';
import { MDCTextField } from '@material/textfield';

const $ = jQuery.noConflict( true );
/**
 * Internal dependencies
 */
import '../block-editor/blocks/hello-world/save.css';

const initButtons = () => {
	const buttons = document.querySelectorAll( '.mdc-button' );
	const iconButtons = document.querySelectorAll( '.mdc-icon-button' );

	buttons.forEach( button => new MDCRipple( button ) );
	iconButtons.forEach( button => ( new MDCRipple( button ).unbounded = true ) );
};

const initLists = () => {
	const lists = document.querySelectorAll( '.mdc-list' );

	lists.forEach( list => {
		const mdcList = new MDCList( list );
		mdcList.listElements.forEach( listItemEl => new MDCRipple( listItemEl ) );
	} );
};

const initTabBar = () => {
	const tabBars = document.querySelectorAll( '.mdc-tab-bar-container' );

	tabBars.forEach( tabBarContainer => {
		const tabBar = new MDCTabBar(
			tabBarContainer.querySelector( '.mdc-tab-bar' )
		);

		const contentElements = tabBarContainer.querySelectorAll(
			'.mdc-tab-content'
		);

		tabBar.listen( 'MDCTabBar:activated', event => {
			tabBarContainer
				.querySelector( '.mdc-tab-content--active' )
				.classList.remove( 'mdc-tab-content--active' );

			contentElements[ event.detail.index ].classList.add(
				'mdc-tab-content--active'
			);
		} );
	} );
};

const initTextFields = () => {
	const textFields = document.querySelectorAll( '.mdc-text-field' );
	textFields.forEach( textField => new MDCTextField( textField ) );
};

addEventListener( 'DOMContentLoaded', () => {
	initButtons();
	initLists();
	initTabBar();
	initTextFields();
	initReCaptchaToken();
	initContactFormHandler();
} );

const initContactFormHandler = () => {
	const form = $( '#contactForm' );

	form.on( 'click', '.is-submit', function( event ) {
		event.preventDefault();

		if ( ! form.get( 0 ).checkValidity() ) {
			$( 'input:invalid' )
				.closest( '.mdc-text-field' )
				.addClass( 'mdc-text-field--invalid' );
			$( 'textarea:invalid' )
				.closest( '.mdc-text-field' )
				.addClass( 'mdc-text-field--invalid' );
		} else {
			const data = {
				token: $( '[name=mtb_token]' ).val(),
				contactFields: {},
			};

			form.find( ':input' ).each( function() {
				const $this = $( this );
				const name = $this.attr( 'name' );
				const value = $this.attr( 'value' );
				const type = $this.attr( 'type' );

				if ( type !== 'hidden' ) {
					data.contactFields[ $this.attr( 'id' ) ] = {
						name: $this.attr( 'name' ),
						label: $this.data( 'label' ),
						value,
					};
				} else {
					data[ name ] = value;
				}
			} );

			$.ajax( {
				type: 'POST',
				url: mtb.ajax_url,
				data,
				dataType: 'json',
				success( response ) {
					// console.log( response );
					if ( response.success === true ) {
						form[ 0 ].reset();
						form.hide();
						$( '#contactFormMsg' ).show();
						initReCaptchaToken();
					} else {
						// TODO: Refactor to show message in page.
						// eslint-disable-next-line no-alert,no-undef
						alert( 'An error occurred' );
					}
				},
			} );
		}
	} );

	$( '#contactFormMsg' ).on( 'click', function() {
		$( '#contactFormMsg' ).hide();
		form.show();
	} );
};

/**
 * Initialize reCAPTCHA token.
 */
const initReCaptchaToken = () => {
	const contactForm = document.getElementById( 'contactForm' );

	if ( ! contactForm ) {
		return;
	}

	const tokenField = document
		.getElementById( 'contactForm' )
		.querySelectorAll( '[name=mtb_token]' );

	if ( tokenField.length > 0 ) {
		grecaptcha.ready( function() {
			grecaptcha
				.execute( mtb.recaptcha_site_key, { action: 'contact' } )
				.then( function( token ) {
					tokenField[ 0 ].setAttribute( 'value', token );
				} );
		} );
	}
};

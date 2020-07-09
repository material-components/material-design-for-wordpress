import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Wizard from '../../../assets/src/wizard/components';

describe( 'Onboarding Wizard', () => {
	beforeAll( () => {
		global.mtbWizard = {
			pagesUrl: 'http://example.com/wp-admin/edit.php?post_type=page',
			settingsUrl: 'http://example.com/wp-admin/plugins.php',
			assetsPath: 'http://example.com/',
			placeholderSmall: 'http://example.com/image-small.png',
			placeholderImage: 'http://example.com/image.png',
			themeStatus: 'ok',
			nonce: 'test-nonce',
			restUrl:
				'http://example.com/index.php?rest_route=/material-theme-builder/v1/importer/',
		};
	} );

	it( 'matches snapshot', () => {
		const { container } = render( <Wizard /> );

		expect( container ).toMatchSnapshot();
	} );
} );

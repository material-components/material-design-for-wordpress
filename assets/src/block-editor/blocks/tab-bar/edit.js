/**
 * Internal dependencies
 */
import './style.css';
import Tab from './components/tab';
import IconPicker from '../../components/icon-picker';
import ButtonGroup from '../../components/button-group';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

export const ICON_POSITIONS = [
	{
		label: __( 'None', 'material-theme-builder' ),
		value: 'none',
	},
	{
		label: __( 'Leading', 'material-theme-builder' ),
		value: 'leading',
	},
	{
		label: __( 'Above', 'material-theme-builder' ),
		value: 'above',
	},
];

/**
 * Material button edit component.
 */
export default function TabBarEdit( {
	attributes: { tabs, iconPosition },
	setAttributes,
} ) {
	const createTab = () => {
		const newId = tabs.length + 1;

		tabs.push( {
			id: newId,
			label: __( 'Tab', 'material-theme-builder' ) + ` ${ newId }`,
			active: false,
			icon: null,
		} );

		setAttributes( { tabs } );
		changeTab( newId );
	};

	const changeTab = id => {
		tabs = tabs.map( tab => {
			tab.active = tab.id === id;
			return tab;
		} );

		setAttributes( { tabs, activeTab: id } );
	};

	return (
		<>
			<div className="mdc-tab-bar" role="tablist">
				<div className="mdc-tab-scroller">
					<div className="mdc-tab-scroller__scroll-area">
						<div
							className="mdc-tab-scroller__scroll-content"
							style={ { display: 'flex', position: 'relative' } }
						>
							{ tabs.map( props => (
								<Tab key={ props.id } { ...props } onChange={ changeTab } />
							) ) }
							<button
								style={ {
									alignSelf: 'flex-end',
									marginBottom: '10px',
									marginLeft: '30px',
									padding: '4px 6px',
									backgroundColor: '#F4F5F6',
									fontSize: '13px',
									border: '1px solid #639EC7',
									borderRadius: '2px',
									color: '#639EC7',
									cursor: 'pointer',
								} }
								onClick={ createTab }
							>
								<i
									className="material-icons"
									style={ { verticalAlign: 'middle' } }
								>
									add
								</i>
								<span>{ __( 'New Tab', 'material-theme-builder' ) }</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<InspectorControls>
				<PanelBody
					title={ __( 'Icon', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ButtonGroup
						buttons={ ICON_POSITIONS }
						current={ iconPosition }
						onClick={ val => setAttributes( { iconPosition: val } ) }
					/>

					{ iconPosition !== 'none' && (
						<IconPicker
							currentIcon=""
							onChange={ val => setAttributes( { icon: val } ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>
		</>
	);
}

import React from 'react';
import classNames from 'classnames';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import MuiSlider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import { Info as InfoIcon, Undo as UndoIcon } from '@material-ui/icons';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const ExpansionPanel = withStyles( {
	root: {
		border: 0,
		backgroundColor: 'transparent',
		boxShadow: 'none',
		margin: 0,
		'&:before': {
			display: 'none',
		},
		'&$expanded': {
			margin: 'auto',
		},
	},
	expanded: {
		backgroundColor: 'transparent',
		'& svg': {
			color: '#0073aa',
		},
	},
} )( MuiExpansionPanel );

const ExpansionPanelSummary = withStyles( {
	root: {
		backgroundColor: 'transparent',
		border: 0,
		margin: 0,
		marginBottom: -1,
		padding: 0,
		minHeight: 36,
		'&$expanded': {
			minHeight: 36,
		},
		'& > div': {
			margin: 0,
		},
	},
	content: {
		'&$expanded': {
			margin: 0,
		},
	},
	expanded: {},
} )( MuiExpansionPanelSummary );

const ExpansionPanelDetails = withStyles( {
	root: {
		padding: 0,
		marginBottom: 10,
		backgroundColor: 'transparent',
	},
} )( MuiExpansionPanelDetails );

const useStyles = makeStyles( {
	root: style => style.root,
	title: style => style.title,
	infoIcon: style => style.infoIcon,
	description: style => style.description,
	input: style => style.input,
} );

const Slider = withStyles( {
	root: {
		color: 'rgb(144, 144, 144)',
		height: 8,
		marginTop: 8,
	},
	thumb: {
		height: 14,
		width: 14,
		backgroundColor: '#3598DA',
		'&:focus,&:hover,&$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {},
	track: {
		height: 4,
	},
	rail: {
		height: 4,
	},
} )( MuiSlider );

const RangeControl = props => {
	const defaultStyle = {
		root: {
			width: 275,
			marginBottom: 10,
		},
		title: {
			color: '#555d66',
		},
		description: {
			fontSize: 12,
			color: '#555d66',
		},
		infoIcon: {
			fontSize: 18,
			paddingTop: 2,
			color: '#555d66',
		},
		input: {
			fontSize: 12,
			width: 52,
		},
	};

	const {
		id,
		label,
		description,
		value,
		min = 0,
		max = 36,
		step = 1,
		style = defaultStyle,
		onChange,
	} = props;

	const classes = useStyles( style );
	const [ updatedValue, setValue ] = React.useState( value );
	const [ expanded, setExpanded ] = React.useState( false );
	const panelId = id + 'panel';
	const undoDisabled = updatedValue === value;

	const handleExpansionPanelChange = panel => ( event, newExpanded ) => {
		setExpanded( newExpanded ? panel : false );
	};

	const handleSliderChange = ( event, newValue ) => {
		setValue( newValue );
		onChange( newValue );
	};

	const handleInputChange = event => {
		const newValue =
			event.target.value === '' ? '' : Number( event.target.value );
		setValue( newValue );
		onChange( newValue );
	};

	const handleInputBlur = () => {
		let newValue;
		if ( value < min ) {
			setValue( min );
			newValue = min;
		} else if ( value > max ) {
			setValue( max );
			newValue = max;
		}

		onChange( newValue );
	};

	const handleUndoClick = () => {
		setValue( value );
		onChange( value );
	};

	return (
		<div className={ classes.root }>
			<ExpansionPanel
				square
				expanded={ expanded === panelId }
				onChange={ handleExpansionPanelChange( panelId ) }
			>
				<ExpansionPanelSummary
					aria-controls={ `${ panelId }-content` }
					id={ `${ panelId }-header` }
				>
					<Grid container spacing={ 1 }>
						<Grid item>
							<span
								className={ classNames(
									'customize-control-title',
									classes.title
								) }
							>
								{ label }
							</span>
						</Grid>
						<Grid item>
							<Tooltip title="Info">
								<InfoIcon className={ classes.infoIcon } />
							</Tooltip>
						</Grid>
					</Grid>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Typography className={ classes.description }>
						{ description }
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>

			<Grid container spacing={ 1 } alignItems="center">
				<Grid item xs>
					<Slider
						value={ typeof updatedValue === 'number' ? updatedValue : value }
						onChange={ handleSliderChange }
						aria-labelledby={ `${ id }-input-slider` }
						step={ step }
						min={ min }
						max={ max }
					/>
				</Grid>
				<Grid item>
					<Input
						className={ classes.input }
						value={ updatedValue }
						onChange={ handleInputChange }
						onBlur={ handleInputBlur }
						inputProps={ {
							step,
							min,
							max,
							type: 'number',
							'aria-labelledby': `${ id }-input-slider`,
						} }
					/>
				</Grid>
				<Grid item>
					<Tooltip title="Reset">
						<span>
							<IconButton
								aria-label="undo"
								disabled={ undoDisabled }
								onClick={ handleUndoClick }
							>
								<UndoIcon />
							</IconButton>
						</span>
					</Tooltip>
				</Grid>
			</Grid>
		</div>
	);
};

export default RangeControl;

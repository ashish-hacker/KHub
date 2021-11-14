import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
	Routes,
	Route
} from "react-router-dom";


const AntTabs = withStyles({
	root: {
		borderBottom: '1px solid #e8e8e8',
	},
	indicator: {
		backgroundColor: '#a46bcf',
	}
})(Tabs);

const AntTab = withStyles((theme) => ({
	root: {
		textTransform: 'none',
		minWidth: 72,
		color: '#000000',
		display: 'flex',
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(4),
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			color: '#a46bcf',
			opacity: 1,
		},
		'&$selected': {
			color: '#a46bcf',
			fontWeight: theme.typography.fontWeightMedium,
		},
		'&:focus': {
			color: '#a46bcf',
		},
	},
	selected: {},
}))((props) => <Tab disableRipple {...props} />);





const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	padding: {
		padding: theme.spacing(3),
	},
	demo1: {
		backgroundColor: theme.palette.background.paper,
	},
	blank: {
		marginRight: '70%'
	}
}));

export default function CustomizedTabs(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(parseInt(props.id));
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const Nav = () => {
		return (
			<AntTabs value={value} onChange={handleChange} aria-label="ant example">
				<AntTab href= '/' label="Home" />
				<AntTab href='/hub' label="Hub" />
				<AntTab href='/forum' label="Forum" className={classes.blank} />
				<AntTab href='/welcome' label="Sign In" />
			</AntTabs>
				)
	}
	return (
		<div className={classes.root}>
			<div className={classes.demo1}>
					<Routes>
						<Route exact path='/' element={<Nav />} />
						{/* <Route path='/hub' element={<AntTab label="Hub" /> } />
						<Route path='/forum' element={<AntTab label="Forum" className={classes.blank} /> } />
						<Route path='/signin' element={<AntTab label="Sign In" Icon={<AcUnitIcon />} /> } /> */}

					</Routes>
					{/* <AntTab label="Home" />
					<AntTab label="Hub" />
					<AntTab label="Forum" className={classes.blank} />
					<AntTab label="Sign In" Icon={<AcUnitIcon />} /> */}
				<Typography className={classes.padding} />
			</div>
			</div>
	);
}

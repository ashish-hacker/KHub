import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const AntTabs = styled(Tabs)({
	borderBottom: '1px solid #e8e8e8',
	'& .MuiTabs-indicator': {
		backgroundColor: '#1890ff',
	},
	display: 'flex',
	justifyContent: 'center',
	
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
	textTransform: 'none',
	minWidth: 0,
	[theme.breakpoints.up('sm')]: {
		minWidth: 72,
	},
	fontWeight: theme.typography.fontWeightRegular,
	marginRight: theme.spacing(1),
	color: 'rgba(0, 0, 0, 0.85)',
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
		color: '#40a9ff',
		opacity: 1,
	},
	'&.Mui-selected': {
		color: '#1890ff',
		fontWeight: theme.typography.fontWeightMedium,
	},
	'&.Mui-focusVisible': {
		backgroundColor: '#d1eaff',
	},
	forum: {
		flexGrow: 1
	}
}));


export default function CustomizedTabs() {
	const [value, setValue] = React.useState(1);

	const navigate = useNavigate();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleClick = (e) => {
		e.preventDefault();
		if (e.target.id === 'hub') {
			navigate('/hub');
		}
		else if (e.target.id === 'home') {
			navigate('/');
		}
		else if (e.target.id === 'forum') {
			navigate('/forum');
		}
		else if (e.target.id === 'signin') {
			navigate('/signin');
		}
	}
	
	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ bgcolor: '#fff' }}>
				<AntTabs value={value} onChange={handleChange} className="root" aria-label="ant example">
					<h4 style={{marginLeft: 7,marginTop: 7, marginRight: 17, color: 'Grey'}}>KHub</h4>
					<AntTab id='home' onClick={handleClick} label="Home" />
					<AntTab id='hub' onClick={handleClick} label="Hub" />
					<AntTab id='forum' onClick={handleClick} className="forum"  label="Forum" />
					{/* <AntTab id='signin' onClick={handleClick} label="Sign In" /> */}

				</AntTabs>
				<Box sx={{ p: 3 }} />
			</Box>
		</Box>
	);
}


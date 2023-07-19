import { useState, useEffect ,React} from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import WcIcon from '@mui/icons-material/Wc';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import List from '@mui/material/List';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewListIcon from '@mui/icons-material/ViewList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HikingIcon from '@mui/icons-material/Hiking';
import Drawer from "@mui/material/Drawer";
import {Link} from 'react-router-dom'
import Whyte from '../components/fonts/Whyte-Black.ttf'
import whytebold from '../components/fonts/Whyte-Bold.ttf'

import EditIcon from '@mui/icons-material/Edit';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'; 

import { Routes, Route } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../redux/actions/authAction';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

//import BusinessUnit from './BusinessUnit/BusinessUnit'
//import Candidat from './Candidat/Candidat'
import Client from '../pages/Zervant/Client'
import Product from '../pages/Zervant/Product'

//import Process from './Process/Process'
//import Setting from './Settings/Setting'
//import Task from './Tasks/Task'
import User from './User/User'
import MyProfile2 from './User/MyProfile2'
import MyProfile from './Zervant/MyProfile'
import EditProfile from './User/EditProfile'
import UploadForm from './Zervant/UploadForm'

//import Report from './Report/Report'
//import Jobs from './Jobs/Jobs'
//import  Mail1 from './Candidat/Mail1'


//import useResponsive from '../components/hooks/useResponsive.js'
//import AddCandidat from './Candidat/AddCandidat';
//import LogoutIcon from '@mui/icons-material/Logout';
//import WorkIcon from '@mui/icons-material/Work';
//import AppbarComponent from './AppbarComponent';
//import Mail2 from './Candidat/Mail2';
//import Mail3 from './Candidat/Mail3';
//import FormDialog from './Candidat/FormDialog';
//import NestedList from './Candidat/NestedList';
import EditUser from './User/EditUser';
import ResponsiveAppBar from './ResponsiveAppBar';
//import MonCompte from './Zervant/MonCompte'
import Facture from './Zervant/Facture';
import NouvelleFacture from './Zervant/NouvelleFacture';
import DevisPage from './Zervant/DevisPage';
import ListDevis from './Zervant/ListDevis'
import ListClient from './Zervant/ListClient';
import ListProduct from './Zervant/ListProduct';
import ListFacture from './Zervant/ListFacture';
import FactureToPrint from './Zervant/FactureToPrint';
import FactureToPrint2 from './Zervant/FactureToPrint2';
import FactureToPrint3 from './Zervant/FactureToPrint3';
import FactureToPrint4 from './Zervant/FactureToPrint4';
import FactureToPrint5 from './Zervant/FactureToPrint5';
import DevisToPrint from './Zervant/DevisToPrint';
import DevisToPrint2 from './Zervant/DevisToPrint2';
import DevisToPrint3 from './Zervant/DevisToPrint3';
import DevisToPrint4 from './Zervant/DevisToPrint4';
import DevisToPrint5 from './Zervant/DevisToPrint5';
import Dashboard from './Zervant/Dashboard';






const drawerWidth = 270;

const StyledList = styled(List)({
	// selected and (selected + hover) states
	'&& .Mui-selected, && .Mui-selected:hover': {
		backgroundColor: '#00acc1',
		'&, & .MuiListItemIcon-root': {
		color: 'white',
		},
	},
	// hover states
	'& .MuiListItemButton-root:hover': {
		backgroundColor: '#eeeeee',
		'&, & .MuiListItemIcon-root': {
		color: 'black',
		},
	},

});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));



const Home = (props) => {
    const location = useLocation()

    const [selectedIndex, setSelectedIndex] = useState('');

	const dispatch = useDispatch()

	const token = useSelector(state => state.token)

	const auth = useSelector(state => state.auth)

	const {user, isLogged} = auth

	const { window } = props;
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate()
    const pathName = location.pathname.split("/");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index)
	};
	
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(!open);
		setSubMenuOpen(false);
	};

	const [openSubMenu, setSubMenuOpen] = useState(false);

	const handleClick = () => {
		setSubMenuOpen(!openSubMenu);
	};

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

	const [dark, setDark] = useState(false);

    const darkTheme = createTheme({
        typography: {
            fontFamily: 'Whyte',
        },
        palette:{
			mode:'dark',
		}
    })

	const lightTheme = createTheme({
        typography: {
            fontFamily: 'Whyte',
        },
		palette:{
			background : {
				mode: 'light',
				default: "#f8f8f8"
			},
		}
	})

    const container = window !== undefined ? () => window().document.body : undefined;

    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_SERVER_URL,
    });

	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin')
		if(firstLogin){
		const getToken = async () => {
			const res = await axiosInstance.post('/user/refresh_token', null)
			dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
		}
		getToken()
		}
	},[auth.isLogged, dispatch])

	useEffect(() => {
		if(token){
		const getUser = () => {
			dispatch(dispatchLogin())

			return fetchUser(token).then(res => {
			dispatch(dispatchGetUser(res))
			})
		}
		getUser()
		}
	},[token, dispatch])
    
    return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <CssBaseline />
            <AppBar position="fixed" sx={{
      width: '100%',
      marginLeft: matches ? `${drawerWidth}px` : 0
    }}>
      <ResponsiveAppBar />
    </AppBar>
            <Box
                component="main"
                sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Routes>
                    <Route path='/inv/accueil' element={<Dashboard/>} />
{/*			         <Route path='/candidats' element={<Candidat/>} />
*/}                    {/*<Route path='/candidats/add' element={<AddCandidat/>} />*/}
                    <Route path='/inv/CLIENTS' element={<Client/>} />
                    <Route path='/inv/product' element={<Product/>} />
                    <Route path='/inv/facture' element={<Facture/>} />
                    <Route path='/inv/Nouvellefacture' element={<NouvelleFacture/>} />
                 {/* <Route path='/process' element={<Process data={user}/>} />*/}	
				{/*<Route path='/settings' element={<Setting/>} />
					<Route path='/tasks' element={<Task/>} />*/}
					<Route path='/inv/users' element={<User/>} />
					<Route path='/inv/editprofile' element={<EditProfile/>} />
                    <Route path='/inv/myprofile' element={<MyProfile/>} />
                    <Route path='/inv/myprofile2' element={<MyProfile2/>} />
			{	/*	<Route path='/report' element={<Report/>}/>
                    <Route path='/jobs' element={<Jobs/>} />
                    <Route path='/jobs' element={<Jobs/>} />
                    <Route path='/Mail1' element={<Mail1/>} />
                    <Route path='/Mail2' element={<Mail2/>} />
                    <Route path='/Mail3' element={<Mail3/>} />
                <Route path='/FormDialog' element={<FormDialog/>} />*/}
                    <Route path="/inv/edit_user/:id" element={<EditUser/>} exact/>
                     <Route path="/inv/devis" element={<DevisPage/>} exact/>
                    <Route path="/inv/listdevis/:id" element={<ListDevis/>} exact/>
					<Route path="/inv/listclients/:id" element={<ListClient/>} />
                    <Route path="/inv/listproducts/:id" element={<ListProduct/>} />
                    <Route path="/inv/listfacture/:id" element={<ListFacture/>} />
                    <Route path="/inv/print/:id" element={<FactureToPrint/>} />
                    <Route path="/inv/printAvecRemiseTotalPourcent/:id" element={<FactureToPrint2/>} />
                    <Route path="/inv/printAvecRemiseTotalDevise/:id" element={<FactureToPrint3/>} />
                    <Route path="/inv/printAvecRemiseTabPourcent/:id" element={<FactureToPrint4/>} />
                    <Route path="/inv/printAvecRemiseTabDevise/:id" element={<FactureToPrint5/>} />
                    <Route path="/inv/print2/:id" element={<DevisToPrint/>} />
                    <Route path="/inv/printAvecRemiseTotalPourcent2/:id" element={<DevisToPrint2/>} />
                    <Route path="/inv/printAvecRemiseTotalDevise2/:id" element={<DevisToPrint3/>} />
                    <Route path="/inv/printAvecRemiseTabPourcent2/:id" element={<DevisToPrint4/>} />
                    <Route path="/inv/printAvecRemiseTabDevise2/:id" element={<DevisToPrint5/>} />
                    <Route path="/inv/upload" element={<UploadForm/>} />










                    






				</Routes>
            </Box>
    </ThemeProvider>
    )
}

export default Home

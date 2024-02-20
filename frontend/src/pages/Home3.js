import { useState, useEffect ,React} from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from "@mui/material/AppBar";
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../redux/actions/authAction';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Client from '../pages/Zervant/Client'
import Product from '../pages/Zervant/Product'
import User from './User/User'
import MyProfile2 from './User/MyProfile2'
import MyProfile from './Zervant/MyProfile'
import EditProfile from './User/EditProfile'
import UploadForm from './Zervant/UploadForm'
import EditUser from './User/EditUser';
import ResponsiveAppBar from './ResponsiveAppBar';
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



const Home = (props) => {
        const dispatch = useDispatch()

        const token = useSelector(state => state.token)

        const auth = useSelector(state => state.auth)
    

 

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

        useEffect(() => {
                const firstLogin = localStorage.getItem('firstLogin')
                if(firstLogin){
                const getToken = async () => {
                        const res = await axios.post('/api/user/refresh_token', null)
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
                }}>
              <Routes>
                    <Route path='/*' element={<Dashboard/>} />
                    <Route path='/inv/accueil' element={<Dashboard/>} />
                    <Route path='/inv/CLIENTS' element={<Client/>} />
                    <Route path='/inv/product' element={<Product/>} />
                    <Route path='/inv/facture' element={<Facture/>} />
                    <Route path='/inv/Nouvellefacture' element={<NouvelleFacture/>} />
                    <Route path='/inv/users' element={<User/>} />
                    <Route path='/inv/editprofile' element={<EditProfile/>} />
                    <Route path='/inv/myprofile' element={<MyProfile/>} />
                    <Route path='/inv/myprofile2' element={<MyProfile2/>} />
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
                     </ThemeProvider>)}

export default Home
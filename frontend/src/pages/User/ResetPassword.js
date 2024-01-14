// eslint-disable-next-line
import React, {useState} from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams, useNavigate} from 'react-router-dom';
import {isLength, isMatch} from '../../components/utils/Validation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
            GreenLinks
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}
const theme = createTheme();

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()
    const navigate = useNavigate();
    const {password, cf_password} = data
    //console.log(token)
    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async (e) => {
        e.preventDefault()
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
       
        try {
            const res = await axios.post('/api/user/reset', {password}, {
                headers: {Authorization: token}
            })

            toast.success("Mot de passe est modifier avec succes !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return setData({...data, err: "", success: res.data.msg})
           

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
            console.log(err)
            toast.error("Erreur !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
       
    }
    return (
        <div>
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
        <ToastContainer />
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Modifier Votre mot de passe
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="mot de passe"
                name="password"
                autoComplete="password"
                autoFocus
                onChange={handleChangeInput}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="cf_password"
                label="confirmer mot de passe"
                name="cf_password"
                autoComplete="cf_password"
                autoFocus
                onChange={handleChangeInput}
                />
               
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleResetPass}
                >
                    Réinitialiser mon mot de passe
                </Button>
                <Button onClick={()=>navigate('/')}>S'identifier</Button>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    </ThemeProvider>
              
    </div>
    )
}

export default ResetPassword
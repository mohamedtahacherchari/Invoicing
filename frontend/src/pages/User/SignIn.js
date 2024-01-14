import React, {useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import {useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import {  useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {dispatchLogin} from '../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import { Routes, Route } from 'react-router-dom'
const theme = createTheme();





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

const InitialState = {
	email: '',
	password: '',

}

export default function SignIn() {
    const [user, setUser] = useState(InitialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
     const {email, password} = user

	const handleChangeInput = e => {
		const {name, value} = e.target
		setUser({...user, [name]: value})
	}

	const [showPassword, setShowPassword] = useState(false)
	const token = useSelector(state => state.token)

	const handleClick = () =>{
		setShowPassword(!showPassword)
	}

	const handleMouseDown = (e)=>{
		e.preventDefault()
	} 


	const handleSubmit = async(event) => {

		event.preventDefault();
		try {
		const res = await axios.post('/api/user/login', {email, password},
		{
			headers: {Authorization: token}
		  }
	   
	)
		
		setUser({...user, err: '', success: res.data.msg})
		
		localStorage.setItem('firstLogin', true)

		dispatch(dispatchLogin())

	

		toast.success('Bienvenue' , {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		localStorage.setItem("userInfo", JSON.stringify(res));
		navigate('/inv/accueil');
		} catch (err) {

	err.response.data.msg && setUser({...user, err: '', success: ''})
		
		
		toast.error("error logging in", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

		}

	};

	return (
		<div>
	{ /*   <EmailActivation/>*/}
		<ThemeProvider theme={theme}>
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
			item
			xs={false}
			sm={4}
			md={7}
			sx={{
				backgroundImage: 'url(https://source.unsplash.com/random)',
				backgroundRepeat: 'no-repeat',
				backgroundColor: (t) =>
				t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={7} square>
			<Box
				sx={{
				my: 8,
				mx: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				}}
			>

				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LoginIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
				Se connecter
				</Typography>

			

				<ToastContainer />

				
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 5 }}>
					
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Address Email"
						name="email"
						autoComplete="email"
						value={email}
						onChange={handleChangeInput}
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Mot de passe"
						type={showPassword?'text':'password'}
						id="password"
						value={password}
						onChange={handleChangeInput}
						InputProps={{
						endAdornment:(
							<InputAdornment position='end'>
								<IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						)
					}}
						//autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Se connecter
					</Button>
					<Grid container>
					<Grid item xs>
					<Link href="/inv/forgotpassword" variant="body2">
						Oublier mot de passe?
					</Link>
					</Grid>
					<Grid item>
					<Link href="/inv/register" variant="body2">
						{"Vous n'avez pas un compte ? S'inscrire"}
					</Link>
					</Grid>
					
				</Grid>
				<Grid item sx={{mt: 5, alignContent: 'center'}}>
						<GoogleOneTapLogin/>
					</Grid>
				<Copyright sx={{ mt: 5 }} />
				</Box>
			</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
		
	        	
		</div>
	);
}
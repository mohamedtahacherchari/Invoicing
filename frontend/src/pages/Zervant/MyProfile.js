import React, {useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {IconButton} from '@mui/material';
import { Alert, CircularProgress } from '@mui/material';
import { Button, Typography, TextField} from '@mui/material';
import { getUserDetails, updateUserProfile } from '../../redux/actions/servantActions/userAction'
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/userConstant'
//import { toast } from '@chakra-ui/react';
import {Avatar, Card, CardActions, CardContent, Divider} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@mui/material/Container';
import axios from 'axios';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import 'react-toastify/dist/ReactToastify.css';






const MyProfile = () => {

	const [data, setData] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber , setPhoneNumber] = useState('')
    const [email , setEmail] = useState('')
    const [message, setMessage] = useState(null)
	const [uploading, setUploading] = useState(false)
	const [avatar, setAvatar] = useState('')
	const [loading2, setLoading2] = useState(false)
	const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_SERVER_URL,
      });




	
	const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const token = useSelector(state => state.token)
	const {user} = auth
   const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
   const userDetails = useSelector((state) => state.userDetails)
   const { loading, error} = userDetails
    const { success } = userUpdateProfile



       useEffect(() => {
     if (!user || !user.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setFirstName(user.firstName)
        setEmail(user.email)
		setLastName(user.lastName)
        setPhoneNumber(user.phoneNumber)
		setAvatar(user.avatar)
      }
    }
  , [dispatch, user, success])
console.log(user.avatar)

  const OnSubmitUpdateUser = () =>{

		try {
			axiosInstance.patch('/user/update', 
			{
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				avatar,
			
			},{
				headers: {Authorization: token}
			})
			console.log(avatar)
			toast.success("Profil a été mis a jour avec succes", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			
		} catch (err) {
			
			toast.error("un erreur a été survenue", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			
		}

		
	}

	const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading2(true)
            const res = await axiosInstance.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading2(false)
            setAvatar(res.data.url)
            toast.success("avatar a été changer", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        } catch (err) {
            toast.error("error", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
	const postDetails = (avatars) => {
		setLoading2(true);
		if (avatars === undefined) {
		  toast({
			title: "Please Select an Image!",
			status: "warning",
			duration: 5000,
			isClosable: true,
			position: "bottom",
		  });
		  return;
		}
		console.log(avatars);
		if (avatars.type === "image/jpeg" || avatars.type === "image/png") {
		  const data = new FormData();
		  data.append("file", avatars);
		  data.append("upload_preset", "chat-app");
		  data.append("cloud_name", "piyushproj");
		  fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
			method: "post",
			body: data,
		  })
			.then((res) => res.json())
			.then((data) => {
			  setAvatar(data.url.toString());
			  console.log(data.url.toString());
			  setLoading2(false);
			})
			.catch((err) => {
			  console.log(err);
			  setLoading2(false);
			});
		} else {
		  toast({
			title: "Please Select an Image!",
			status: "warning",
			duration: 5000,
			isClosable: true,
			position: "bottom",
		  });
		  setLoading2(false);
		  return;
		}
	  };

	  console.log(user)


	return (
		<Box component="form" onSubmit={OnSubmitUpdateUser} sx={{ mt: 2 }}>
		<Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
		  <Grid container spacing={3}>
			<Grid item lg={6} md={6} xs={12}>
			  <ToastContainer />
			  <Card>
				<CardContent>
				  <Box
					sx={{
					  alignItems: 'center',
					  display: 'flex',
					  flexDirection: 'column'
					}}
				  >
					<Avatar
					  src={avatar ? avatar : user.avatar}
					  sx={{
						height: 250,
						mb: 2,
						width: 250
					  }}
					/>
					<Typography
					  color="textPrimary"
					  gutterBottom
					  variant="h5"
					  name="name"
					  id="name"
					>
					  {user.firstName} {user.lastName}
					</Typography>
				  </Box>
				</CardContent>
				<Divider />
				<CardActions>
				  <IconButton color="primary" aria-label="upload picture" component="label">
					<input hidden accept="image/*" type="file" name="file" id="file_up" onChange={changeAvatar} />
					<PhotoCamera />
				  </IconButton>
				  <input type="file" name="file" id="file_up" onChange={(e) => postDetails(e.target.files[0])} />
				</CardActions>
			  </Card>
			</Grid>
			<Grid item lg={6} md={6} xs={12}>
			  <TextField
				fullWidth
				label="Prénom"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
			  <TextField
				fullWidth
				label="Nom"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
	  
			  <TextField
				fullWidth
				label="Numéro de téléphone"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
			  <TextField
				fullWidth
				label="Email Address"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
	  
			  <TextField
				fullWidth
				label="Password"
				name="password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
	  
			  <TextField
				fullWidth
				label="Confirm Password"
				name="confirmPassword"
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
	  
			  <Button type='submit' disabled={loading2} variant='contained' color='primary' sx={{ mt: 3 }}>
				Mise à jour
			  </Button>
			</Grid>
		  </Grid>
		</Container>
	  </Box>
	  
	  
	


	)
}

export default MyProfile

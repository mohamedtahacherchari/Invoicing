import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authAction';
import axios from 'axios';

import SignIn from './pages/User/SignIn'
import SignUp from './pages/User/SignUp'
import ForgotPassword from './pages/User/ForgotPassword'
import EmailActivation from './pages/User/EmailActivation'
import Home3 from './pages/Home3';
import Chatpage from './pages/Chat/Chatpage';
//import Hover from './pages/Hover';
import  ResponsiveAppBar  from './pages/ResponsiveAppBar';



function App() {

	const dispatch = useDispatch()  
	const token = useSelector(state => state.token)
	const auth = useSelector(state => state.auth)
	const {isLogged} = auth
	
	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin')
		if(firstLogin){
			const getToken = async () => {
			const res = await axios.post('/user/refresh_token', null)
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

		
			<Routes>
				<Route path='/*' element={ isLogged ?  <Home3/> : <SignIn />} />

				{/*Authentication Routes */}
				<Route path='/inv/register' element={ isLogged ? <Home3/> : <SignUp />} />
				<Route path="inv/forgotpassword" element={<ForgotPassword/>} />
				<Route path="inv/user/activate/:activation_token" element={<EmailActivation/>} />
	             <Route path='inv/chats' element={<Chatpage/>} />
		    	{/*<Route path='/hover' element={<Hover/>} />*/}
				<Route path="inv/fact" element={<ResponsiveAppBar/>}/>


    

			</Routes>
	

	);
}

export default App;

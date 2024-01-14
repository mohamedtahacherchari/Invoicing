import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {showErrMsg, showSuccessMsg} from '../../components/utils/notification/Notification'
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
const EmailActivation = () => {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const activationEmail = async () => {
        try {
            const res = await axios.post('/api/user/activation', {activation_token})
            toast.success("Email Activated.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });
            setSuccess(res.data.msg)
            console.log(res.data)
        } catch (err) {

            err.response.data.msg && setErr(err.response.data.msg)
            toast.error("Error. ",`${err}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(err)
        }
    }
    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/api/user/activation', {activation_token})
                    toast.success("Email Activated.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored'
                    });
                    setSuccess(res.data.msg)
                    console.log(res.data.msg)
                } catch (err) {

                    err.response.data.msg && setErr(err.response.data.msg)
                    toast.error("Error. ",`${err}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    console.log(err)
                }
            }
            activationEmail(err)
        }
    },[activation_token,err])

    return (
        <div>
            <ToastContainer />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
              <button onClick={activationEmail}></button>
              <h1>Hello Admin</h1>
            <h1>Le compte est activé</h1>
            <Button onClick={() => navigate("/")}>Retour au site </Button>
              <Routes>
              <Route path="/alia/inv/:activation_token" element={<EmailActivation/>} />

              </Routes>
        </div>
    )
}

export default EmailActivation
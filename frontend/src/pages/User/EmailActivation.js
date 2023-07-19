import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {showErrMsg, showSuccessMsg} from '../../components/utils/notification/Notification'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
const EmailActivation = () => {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const activationEmail = async () => {
        try {
            const res = await axiosInstance.post('/user/activation', {activation_token})
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
                    const res = await axiosInstance.post('/user/activation', {activation_token})
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
              <h1>✩✴  🎀  𝐵𝒾𝑒𝓃𝓋𝑒𝓃𝓊 𝒞𝒽𝑒𝓏 𝒢𝓇𝑒𝑒𝓃𝓁𝒾𝓃𝓀𝓈 𝐹𝒶𝒸𝓉𝓊𝓇𝒶𝓉𝒾💍𝓃  🎀  ✴✩</h1>
        </div>
    )
}

export default EmailActivation

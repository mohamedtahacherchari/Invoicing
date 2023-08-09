import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import './users.css'

import {Link} from 'react-router-dom'
import {fetchAllUsers, dispatchGetAllUsers} from '../../redux/actions/usersAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosInstance = axios.create({
	baseURL : process.env.REACT_APP_SERVER_URL,
  });
const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

const Users = () => {
	const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin} = auth

    const users = useSelector(state => state.users)

    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])
    
    const handleDelete = async (id) => {
        try {
            if(user._id !== id){
                if(window.confirm("Êtes-vous sûr de vouloir supprimer ce compte?")){
                    setLoading(true)
                    await axios.delete(`/api/user/delete/${id}`, {
                        headers: {Authorization: token}
                    })
                    setLoading(false)
                    setCallback(!callback)
                }
            }
            
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

  	return (
    	<>
        {isAdmin}
    <div style={{display: 'flex',marginTop :"50px"}}>
  
        <div style={{flex: 6}}>
  
          <br/> 
          <ToastContainer />
          <div className="profile_page">
            
        
            <div className="col-right">
                <h2></h2>

                <div style={{overflowX: "auto"}}>
                    <table className="customers rounded-table" >
                        <thead>
                            <tr>
                            
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                     
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/inv/edit_user/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDelete(user._id)} ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    </div>

    </>
  	)
}

export default Users

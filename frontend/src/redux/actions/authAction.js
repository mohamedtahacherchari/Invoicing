import ACTIONS from './index'
import axios from 'axios'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axiosInstance.get('/user/infor', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}
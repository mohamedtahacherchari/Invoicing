import axios from 'axios'
import ACTIONS from '../index'
const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_SERVER_URL,
  });
  
export const fetchAllDevisAdmin = async (token) => {
    const res = await axiosInstance.get('/api/devis/DevisAdmin', {
        headers: {Authorization: token}
    })

    console.log(res.data)
    return res
}

export const dispatchGetAllDevisAdmin = (res) => {
    return {
        type: ACTIONS.GET_ALL_DEVADMIN,
        payload: res.data


    }
     
}    



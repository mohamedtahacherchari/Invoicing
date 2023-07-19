import axios from 'axios'
import ACTIONS from '../index'
import { toast } from 'react-toastify';
import{
    DEVIS_CREATE_FAIL, 
    DEVIS_CREATE_REQUEST, 
    DEVIS_CREATE_SUCCESS, 
    FACTURE_DELETE_FAIL, 
    FACTURE_DELETE_REQUEST, 
    FACTURE_DELETE_SUCCESS, 
    DEVIS_DETAILS_FAIL, 
    DEVIS_DETAILS_REQUEST, 
    DEVIS_DETAILS_SUCCESS, 
    DEVIS_LIST_FAIL, 
    DEVIS_LIST_REQUEST,
    DEVIS_LIST_SUCCESS,
    DEVIS_UPDATE_FAIL,
    DEVIS_UPDATE_REQUEST,
    DEVIS_UPDATE_SUCCESS
} 
from '../../actions/servantActions/constant/constantZervant/devisConstant'

const axiosInstance = axios.create({
  baseURL : process.env.REACT_APP_SERVER_URL,
});


      export const fetchAllDevis = async (token) => {
        const res = await axiosInstance.get('/api/devis/', {
            headers: {Authorization: token}
        })

        console.log(res.data)
        return res
    }
    
    export const dispatchGetAllDevis = (res) => {
        return {
            type: ACTIONS.GET_ALL_DEVIS,
            payload: res.data
 

        }

    }
   

    export const updateDevis = (devis) => async (dispatch, getState) => {
        try {
          dispatch({
            type: DEVIS_UPDATE_REQUEST,
          })
          const { 
                token,
            } = getState()
            const { data } = await axiosInstance.put(
            `/api/devis/${devis._id}`,
            devis,{
                headers: {Authorization: token}
            }
          )
    
    
          console.log(data)
          dispatch({
            type: DEVIS_UPDATE_SUCCESS,
            payload: data,
          })
    
          toast.success('updated avec succé' , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch({ type: DEVIS_DETAILS_SUCCESS, payload: data })
          
       
    
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
         
          dispatch({
            type: DEVIS_UPDATE_FAIL,
            payload: message,
          })
        }
      }



      export const listDevisDetails = (id) => async (dispatch,getState) => {
        try {
          

          dispatch({type:DEVIS_DETAILS_REQUEST })
         
          const { 
            token,
        } = getState()

          const {data} = await axiosInstance.get(`/api/devis/${id}`,{
            headers: {Authorization: token}
        })

          dispatch({
            type: DEVIS_DETAILS_SUCCESS,
            payload: data ,
          })
        } catch (error) {
          dispatch({
            type: DEVIS_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        }
      }


      export const createDevis = (devis) => async (dispatch, getState,token) => {

        try {
            dispatch({
                type: DEVIS_CREATE_REQUEST,
            })
            const { 
                token,
            } = getState()
        
            const { data } = await axiosInstance.post('/api/devis/adddevis',devis, {
                headers: {Authorization: token}
            })
            
            console.log(data)
                    
            dispatch({
                type: DEVIS_CREATE_SUCCESS,
                payload: data,
            })
        
            toast.success('Devis ajoutée avec succé' , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        
        } catch (error) {
            console.log(error)
            const message =
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        
            dispatch({
                type: DEVIS_CREATE_FAIL,
                payload: message,
            })
            toast.error("Error ", {
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


        export const listdevis = (keyword = '') => async (
          dispatch
        ) => {
          try {
            dispatch({ type: DEVIS_LIST_REQUEST })
        
            const { data } = await axiosInstance.get(
              `/api/devis?keyword=${keyword}`
            )
        
            dispatch({
              type: DEVIS_LIST_SUCCESS,
              payload: data,
            })
          } catch (error) {
            dispatch({
              type: DEVIS_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }
        }
        
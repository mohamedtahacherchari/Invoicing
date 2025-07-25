import axios from 'axios'
import ACTIONS from '../index'
import { toast } from 'react-toastify';
import{
    PRODUCT_CREATE_FAIL, 
    PRODUCT_CREATE_REQUEST, 
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_DELETE_FAIL, 
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
} 
from '../../actions/servantActions/constant/constantZervant/productConstant'

const axiosInstance = axios.create({
  baseURL : process.env.REACT_APP_SERVER_URL,
});


      export const fetchAllProduct = async (token) => {
        const res = await axios.get('/api/product/', {
            headers: {Authorization: token}
        })
        return res
    }
    
    export const dispatchGetAllProduct = (res) => {
        return {
            type: ACTIONS.GET_ALL_PRODUCT,
            payload: res.data
        }
    }


    export const updateProduct = (product) => async (dispatch, getState) => {
        try {
          dispatch({
            type: PRODUCT_UPDATE_REQUEST,
          })
          const { 
                token,
            } = getState()
            const { data } = await axios.put(
            `/api/product/${product._id}`,
            product,{
                headers: {Authorization: token}
            }
          )
    
    
          console.log(data)
          dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
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
          dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
          
       
    
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
         
          dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
          })
        }
      }



      export const listProductDetails = (id) => async (dispatch,getState) => {
        try {
          

          dispatch({type:PRODUCT_DETAILS_REQUEST })
         
          const { 
            token,
        } = getState()

          const {data} = await axios.get(`/api/product/${id}`,{
            headers: {Authorization: token}
        })

          dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data ,
          })
        } catch (error) {
          dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
        }
      }


      export const createProduct = (product) => async (dispatch, getState,token) => {

        try {
            dispatch({
                type: PRODUCT_CREATE_REQUEST,
            })
            const { 
                token,
            } = getState()
        
            const { data } = await axios.post('/api/product/addproduct',product, {
                headers: {Authorization: token}
            })
            
            console.log(data)
                    
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: data,
            })
        
            toast.success('Produit ajoutée avec succé' , {
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
                type: PRODUCT_CREATE_FAIL,
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


        export const listproducts = (keyword = '') => async (
          dispatch
        ) => {
          try {
            dispatch({ type: PRODUCT_LIST_REQUEST })
        
            const { data } = await axios.get(
              `/api/product?keyword=${keyword}`
            )
        
            dispatch({
              type: PRODUCT_LIST_SUCCESS,
              payload: data,
            })
          } catch (error) {
            dispatch({
              type: PRODUCT_LIST_FAIL,
              payload:
                error.response && error.response.data.message
                  ? error.response.data.message
                  : error.message,
            })
          }
        }
        
import React, {useState, useEffect,useRef } from 'react'
import {useNavigate ,useParams} from "react-router-dom"
import styles from './Invoice.module.css'
import './facture.css';
import PrintIcon from '@mui/icons-material/Print';
import {Link} from 'react-router-dom'
import moment from 'moment'
import {makeStyles} from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import {initialState} from '../../pages/Zervant/initialState'
import {initialState2} from '../../pages/Zervant/initialState'
import {initialState3} from '../../pages/Zervant/initialState'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useReactToPrint } from 'react-to-print';
import {Divider,Typography,TextField} from '@mui/material';
import { listDevisDetails, updateDevis } from '../../redux/actions/servantActions/devisAction';
import { DEVIS_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/devisConstant';
import { dispatchGetAllClientf, fetchAllClientf } from '../../redux/actions/servantActions/clientfAction';
import { dispatchGetAllProduct, fetchAllProduct } from '../../redux/actions/servantActions/productAction';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const ListDevis = () => {


    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        large: {
          width: theme.spacing(12),
          height: theme.spacing(12),
        },
        table: {
            minWidth: 350,
          },
    
        headerContainer: {
            // display: 'flex'
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(1),
        }
      }));
 
      const {id} = useParams()
      const navigate =  useNavigate();
  const [open, setOpen] = useState(false);
  const [titre, setTitre]= useState(initialState2);
  const [soustotal, setSoustotal]= useState([{soustotal:''},]);

  const condition = [
    { value: 0 ,  label: ' 0 jours' },
    { value: 7,   label: '7jours ' },
    { value: 14 , label: '14 jours ' },
    { value: 30 , label: '30 jours ' },
    { value: 45 , label: '45 jours ' },
    { value: 60 , label: '60 jours ' },
    { value: 90, label: '90 jours ' },
  ];

  const Unite = [
    { value: 'cm', label: 'cm' },
    { value: 'm', label: 'm' },
    { value: 'km', label: 'km' },
    { value: 'h', label: 'h' },
    { value: 'pcs', label: 'pcs' },
  ];

  const arrayTVA = [
    { value: '0', label: '0%' },
    { value: '2.1', label: '2.1%' },
    { value: '5.5', label: '5.5%' },
    { value: '10', label: '10%' },
    { value: '20', label: '20%' },
  ];

  const classes = useStyles()

  /* Les useStates */
const[num, setNum]=useState('');
const[invoiceData,setInvoiceData]=useState(initialState);
const[enga,setEnga]=useState('');
const[service,setService]=useState('');
const[ref,setRef]=useState('');
const[ordre,setOrdre]=useState('');
const[communication, setCommunication]=useState('');
const[champText,setChamptext]=useState(initialState3);
const[message,setMessage]=useState('');
const[note,setNote]=useState('');
const[date1,setDate1]=useState('');
const [cond, setCond] = useState('');
const [clientf, setClientf] = useState('');
const today = new Date(date1);
const [subTotal, setSubTotal] = useState(0)
const [totalHT, setTotalHT] = useState(0)




let echa = moment(today.getTime() +cond *24*60*60*1000).format("DD/MM/YYYY")
/*********************/
const dispatch = useDispatch()
  const clientfs = useSelector(state=> state.clientfs)
  const products = useSelector(state=> state.products)
  const token = useSelector(state => state.token)
  const devisUpdate = useSelector((state) => state.devisUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = devisUpdate
 const devisDetails = useSelector((state) => state.devisDetails)
  const { loading, error, devis } = devisDetails

   useEffect(() => {
  //console.log(client)

  fetchAllClientf(token).then(res =>{
    dispatch(dispatchGetAllClientf(res))
})
fetchAllProduct(token).then(res =>{
  dispatch(dispatchGetAllProduct(res))
})
  if (successUpdate) {
      dispatch({ type: DEVIS_UPDATE_RESET})
      navigate(`/inv/printAvecRemiseTabPourcent2/${devis._id}`)

  } 
                  
else{ 
if (!devis.num || devis._id !== id){
  dispatch(listDevisDetails(id))
}          
  else {
  setClientf(devis.clientf)
  setNum(devis.num)
  setCond(devis.cond)
  setInvoiceData(devis)
  setEnga(devis.enga)
  setService(devis.service) 
  setRef(devis.ref)
  setOrdre(devis.ordre) 
  setCommunication(devis.communication)  
  setTitre(devis) 
  setChamptext(devis)
  setMessage(devis.message) 
  setNote(devis.note) 
  setDate1(devis.date1)
  setSubTotal(devis.subTotal)}
}   }

, [dispatch, id, devis, successUpdate])


useEffect(() => {
  //Get the subtotal
  const subTotal =()=> {
  var arr = document.getElementsByName("montant");
  var subtotal = 0;
  for(var i = 0; i < arr.length; i++) {
      if(arr[i].value) {
          subtotal += +arr[i].value;
      }
     // document.getElementById("subtotal").value = subtotal;

     
      setSubTotal(subtotal)
  }}

subTotal()

}, [invoiceData])




  

useEffect(() => {
  //Get the sumqte
  const totalHT =()=> {
  var arr = document.getElementsByName("montantHT");
  var sum = 0 ;
   for(var i = 0; i < arr.length; i++) {
     sum += +arr[i].value;}
      setTotalHT(sum) }
totalHT()
}, [invoiceData])

const submitHandler= (e) => {
  e.preventDefault()
  dispatch(
    updateDevis({
      _id :id,
      champText,
      ...invoiceData,
      subTotal,
      clientf,
      num ,
      cond,
      echa ,
      enga,
      service,
      ref, 
      ordre,
      communication,
      message ,
      note ,
      date1,}))}

      const componentRef = useRef();
      const handlePrint = useReactToPrint({
       content: () => componentRef.current,
       documentTitle : 'emp-data',
     onAfterPrint : ()=> alert('Print success')
 
      })
return (
<div style={{ fontFamily: 'Whyte'}} ref={componentRef}>

     <form onSubmit={submitHandler} style={{marginLeft:"40px"}}>
      <table>
        <tbody>

          <td>
          <table>
          <tbody>             <td>
                <img
     src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661343478/logo/logo_xc49qh.png"
     height="25px"
     width="250px"
     marginTop="100px"
     //alt="logo"
     sx={{display: 'flex',ml: -5 }}/>
     <p style={{fontSize: "10px",}}>111 rue Anselme Rondenay 94400 Vitry-sur-Seine France</p>
    <p style={{fontSize: "10px",}}>+33 (0) 1 88 32 77 68</p>
    <p style={{fontSize: "10px",}}>contact@greenlinks.fr </p>
    <p style={{fontSize: "10px",}}>www.greenlinks.fr</p>
                </td>
	        <td>
           <h1 style={{width:"250px",height:"50px", marginLeft:"50px", marginTop:"200px"}}> 
            Bonjour monsieur  : {devis.clientf}
           </h1>
          </td>
          {/*clientfs.map((client,index) =>{
              return(
                <div key={index} className={styles.summaryItem}>
                <h4>{client.Surname}</h4>
               
                </div>
                 )})}

    
               {/*clientfs.filter(client=> client.Firstname==clientf).map(filteredName => (
    <h1>
      {filteredName.Firstname}
    </h1>
               ))*/}
           
	         <td>
                <div style={{marginTop:"0px"}}>     
            <Typography 
            variant="h6" gutterBottom 
            style={{marginLeft: "10px",
             textShadow: "2px 2px 5px grey" ,
              fontSize: "20px",
             marginTop :"10px",}}> 
        DEVIS-{num}</Typography>
              <Typography 
            variant="h6" gutterBottom 
            style={{marginLeft: "10px",
             textShadow: "2px 2px 5px grey" ,
              fontSize: "15px",
             marginTop :"10px",}}> 
              Date d'estimation:{date1}</Typography>
              <Typography 
            variant="h6" gutterBottom 
            style={{marginLeft: "10px",
             textShadow: "2px 2px 5px grey" ,
              fontSize: "15px",
             marginTop :"10px",}}> 
              Valable jusqu'au : {devis.date3}</Typography>
              </div>
              </td>
	           </tbody>
             </table>
             </td>
       </tbody>
       </table> 
       <div>

        Devise :
       <TextField 
       variant="standard"
       label=""
       value={devis.saveDevise}/>
<TableContainer component={Paper} className="tb-container"
style={{marginTop:"50px" , marginRight:"400px", width:"1000px"}}
>
<Table className={classes.table} aria-label="simple table">
    <TableHead>
    <TableRow>
         <TableCell>Produit</TableCell>
         <TableCell >date</TableCell>
         <TableCell>Qté</TableCell>
         <TableCell >Unité</TableCell>
         <TableCell >Prix</TableCell>
         <TableCell>Remise(%)</TableCell>
         <TableCell >TVA%</TableCell>
         <TableCell >Montant HT</TableCell>
         <TableCell >Montant</TableCell>

    </TableRow>
    </TableHead>
    <TableBody>
    {invoiceData.items.map((itemField, index) => (
        <TableRow key={index} style={{width:"600px"}}>
        <TableCell scope="row" style={{width: '20%'}}><h1 name="product">{itemField.product}</h1> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1,}}   style={{ width:"100px" }} name="date2" value={itemField.date2}/> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="number" name="qte"   value={itemField.qte} placeholder="0" /> </TableCell>
        <TableCell style={{marginRight:"200px"}}>{itemField.unite}</TableCell>
        <TableCell align="right">
             <InputBase sx={{ ml: 1, flex: 1 }} 
             type="prix" name="prix" 
              value={itemField.prix} /> 
              </TableCell>

              <TableCell align="right">
             <InputBase sx={{ ml: 1, flex: 1 }} 
             type="" name="remise" 
              value={itemField.remisePourcent} /> 
              </TableCell>
              <TableCell style={{marginRight:"200px"}}>{itemField.tva}</TableCell>
              <TableCell align="right"> 
              <InputBase sx={{ ml: 1, flex: 1 }} type="" name="montantHT" 
              value = {(itemField.qte * itemField.prix * (1 - itemField.remisePourcent/ 100)).toFixed(2)} /> 
              </TableCell>
              <TableCell align="right"> 
              <InputBase sx={{ ml: 1, flex: 1 }} type="" name="montant"
   value={((itemField.qte * itemField.prix) * (1 - itemField.remisePourcent / 100) + (itemField.qte * itemField.prix) * itemField.tva / 100).toFixed(2)}
  /> 
      </TableCell>
      </TableRow>))}
    </TableBody>
</Table>
</TableContainer>
<div style={{marginLeft:"520px"}}> 
              <table>
               <tbody>
 <td>
<Typography variant="p" >
             Remise
               </Typography></td>
<td> 
          <TextField
           id="devise"
           label=""
         value={devis.remiseParLignePourcent}
           variant="standard"
           placeholder="remise"
           style={{marginLeft:"75px", width:"50px"}}
          />
         </td>
         </tbody>
   </table>
              </div>
<div className={styles.invoiceSummary} style={{marginLeft:"0px" ,marginTop:"50px"}}>
          <div className={styles.summary}>Résumé de la facture</div>
          <div className={styles.summaryItem}>
          <p>Total HT:</p>
          <h4>{(totalHT-devis.remisetotal2).toFixed(2)}</h4>
          </div>
            {invoiceData.items && invoiceData.items.map((itemField,index) =>{
              return(
                <div key={index} className={styles.summaryItem}>
                <p>TVA(%):</p>
                <h4>{itemField.tva}</h4>
                </div>
                 )})}
            <div className={styles.summaryItem}>
                <p>Total dû</p>
                <h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{subTotal}</h4>
            </div>

                
            </div>
 
</div>
      <h1 style={{marginTop:"80px"}} >Signature du client</h1>
      <p style={{marginBottom:"120px"}}>(Signé et accepté)</p>

       <button onClick={handlePrint} variant='success'className="print-button" style={{color:"green"}}>
       <PrintIcon/>   Imprimer et/ou PDF </button>
       </form>
               

       </div>)}
    export default ListDevis
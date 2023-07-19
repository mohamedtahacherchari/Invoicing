import React, {useState, useEffect,useRef } from 'react'
import {useNavigate ,useParams} from "react-router-dom"
import styles from './Invoice.module.css'
import axios from 'axios'
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
import {Divider,Typography,TextField, Button} from '@mui/material';
import { listFactureDetails, updateFacture,envoyerMailSansRemise } from '../../redux/actions/servantActions/factureAction';
import { FACTURE_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/factureConstant';
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
import NestedList2 from '../FalsePages/Candidat/NestedList2';
import EmailIcon from '@mui/icons-material/Email';
import { ToastContainer } from 'react-toastify';

const ListFacture = () => {


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
  const [facturesend, setFactureSend] =useState()

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
  const factureUpdate = useSelector((state) => state.factureUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = factureUpdate
 const factureDetails = useSelector((state) => state.factureDetails)
  const { loading, error, facture } = factureDetails

   useEffect(() => {
  //console.log(client)

  fetchAllClientf(token).then(res =>{
    dispatch(dispatchGetAllClientf(res))
})
fetchAllProduct(token).then(res =>{
  dispatch(dispatchGetAllProduct(res))
})
  if (successUpdate) {
      dispatch({ type: FACTURE_UPDATE_RESET})
  navigate(`/inv/print/${facture._id}`)
  } 
                  
else{ 
if (!facture.num || facture._id !== id){
  dispatch(listFactureDetails(id))
}          
  else {
  setClientf(facture.clientf)
  setNum(facture.num)
  setCond(facture.cond)
  setInvoiceData(facture)
  setEnga(facture.enga)
  setService(facture.service) 
  setRef(facture.ref)
  setOrdre(facture.ordre) 
  setCommunication(facture.communication)  
  setTitre(facture) 
  setChamptext(facture)
  setMessage(facture.message) 
  setNote(facture.note) 
  setDate1(facture.date1)
  setSubTotal(facture.subTotal)}
}   }

, [dispatch, id, facture, successUpdate])


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
    updateFacture({
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
      
      /*const envoyermail = async()=>{
         try {
            const res = await axios.get(`/api/facture/sendMailwithoutDelivery/${id}`,
            {headers: {Authorization: token}})
            console.log(res.data);
             } catch (error) {
            console.log(error)
        }

    }*/

 

    const envoyermailSansRemise = async()=>{
   dispatch(envoyerMailSansRemise(id,token))

 }

return (
<div style={{ fontFamily: 'Whyte'}} ref={componentRef}>
<ToastContainer/>
     <form onSubmit={submitHandler} style={{marginLeft:"40px"}}>
      <table>
        <tbody>

          <td>
          <table>
          <tbody>      
           <td>
            <div style={{marginTop:"50px"}}>
                <img
     src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661343478/logo/logo_xc49qh.png"
     height="25px"
     width="250px"
     marginTop="px"
     //alt="logo"
     sx={{display: 'flex',ml: -5 }}/>
     <p style={{fontSize: "10px",}}>111 rue Anselme Rondenay 94400 Vitry-sur-Seine France</p>
    <p style={{fontSize: "10px",}}>+33 (0) 1 88 32 77 68</p>
    <p style={{fontSize: "10px",}}>contact@greenlinks.fr </p>
    <p style={{fontSize: "10px",}}>www.greenlinks.fr</p>
    </div>
                </td>           
	              <td>
                <div style={{marginLeft:"300px"}}>     
            <Typography 
            variant="h6" gutterBottom 
            style={{marginLeft: "10px",
             textShadow: "2px 2px 5px grey" ,
              fontSize: "20px",
             marginTop :"10px",}}> 
              FACTURE-{num}</Typography>
              <Typography 
            variant="h6" gutterBottom 
            style={{marginLeft: "10px",
             textShadow: "2px 2px 5px grey" ,
              fontSize: "15px",
             marginTop :"10px",}}> 
              Date de facturation:{date1}</Typography>
              <Typography 
            variant="h6" gutterBottom 
            style={{marginLeft: "10px",
             textShadow: "2px 2px 5px grey" ,
              fontSize: "15px",
             marginTop :"10px",}}> 
              Date d'échéance: {echa}</Typography>
              </div>
              </td>
	           </tbody>
             </table>
             </td>
       </tbody>
       </table> 
       <div>
       <div style={{width:"250px",height:"50px", marginLeft:"px", marginTop:"50px"}}> 
          <div style={{fontSize: "12px"}}>{facture.nomFacture}</div>
           <div style={{fontSize: "12px"}}>{facture.clientf}</div>
           <div style={{fontSize: "12px"}}>{facture.email}</div> 
           <div style={{fontSize: "12px"}}>{facture.adresse}</div> 
          </div>
  <table>
    <tbody>
      <td><div style={{marginTop:"50px",fontSize: "12px"}}>Devise:</div></td>
      <td><div style={{marginTop:"50px",fontSize: "12px"}}>{facture.saveDevise}</div></td>
    </tbody>
    </table> 
 
  

<TableContainer component={Paper} className="tb-container"
style={{marginTop:"50px" , marginRight:"400px", width:"930px"}}
>
<Table className={classes.table} aria-label="simple table">
    <TableHead>
    <TableRow>
        <TableCell>Produit </TableCell>
        <TableCell >date</TableCell>
        <TableCell>Qté</TableCell>
        <TableCell >Unité</TableCell>
        <TableCell >Prix</TableCell>
        <TableCell >TVA%</TableCell>
        <TableCell >Montant HT</TableCell>
        <TableCell >Montant</TableCell>

    </TableRow>
    </TableHead>
    <TableBody>
    {invoiceData.items.map((itemField, index) => (
        <TableRow key={index} style={{width:"600px"}}>
        <TableCell  scope="row" style={{width: '20%' }}>    
          <h1 name="product"
                   >
                   {itemField.product}
                  </h1> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1,}}   style={{ width:"100px" }} name="date2" value={itemField.date2}  /> </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }}  type="number" name="qte"   value={itemField.qte} placeholder="0" /> </TableCell>
        <TableCell style={{marginRight:"200px"}}>{itemField.unite}
        </TableCell>
        <TableCell align="right"> <InputBase sx={{ ml: 1, flex: 1 }} type="prix" name="prix"  value={itemField.prix} /> </TableCell>
        <TableCell style={{marginRight:"200px"}}> 
          {itemField.tva}
        </TableCell>
        <TableCell align="right"> 
 
        <InputBase sx={{ ml: 1, flex: 1 }} type="prix" name="montantHT" 
        value={itemField.montantHT=itemField.qte*itemField.prix} /> 
        </TableCell>
        <TableCell align="right"> 
        <InputBase sx={{ ml: 1, flex: 1 }} type="prix" name="montant"
    value={itemField.montant= (itemField.qte*itemField.prix)+(itemField.qte*itemField.prix)*itemField.tva/100}/> 
      </TableCell>
      </TableRow>))}
    </TableBody>
</Table>
</TableContainer>
<div className={styles.invoiceSummary} style={{marginLeft:"50px" ,marginTop:"50px"}}>
          <div className={styles.summary}>Résumé de la facture</div>
          <div className={styles.summaryItem}>
          <p>Total HT:</p>
          <h4>{facture.totalHorsTva}</h4>
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
                <h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{subTotal.toFixed(2)}</h4>
            </div>


            <div className={styles.summaryItem}>
             <p>Acompte </p>
           <h1>{facture.Acompte}</h1>
         <h4 
         name="subTotal"
         style={{color: "grey",
          fontSize: "18px",
           lineHeight: "8px",
           marginLeft:"60px"
           }}>
    {facture.acompteEnDevise}</h4>
     
       </div>



       <div className={styles.summaryItem}>
                     
                     <p >Dû le</p>
                     <h4>
             {date1}</h4>
                    </div>
                    <div className={styles.summaryItem}>
                <p>Total dû après acompte</p>
                <h4 
                  name="subTotal"
                  style={{color: "grey",
                   fontSize: "18px",
                    lineHeight: "8px",
                    marginLeft:"60px"
                    }}>
              
             {facture.Acompte && facture.Acompte.slice ? (subTotal - (subTotal * (facture.Acompte.slice(0, -1) / 100))).toFixed(2) : ""}</h4>
         
              <p> Payé le {echa}</p>
         
             </div>
            </div>
 
</div>
<table>
    <today>
        <td>Détails de paiement:</td>
        <td>	
            <div style={{marginBottom:"30px" ,marginTop:"50px"}}>
<h1 style={{marginLeft:"100px"}}>Bank: Example Bank</h1>
<h1 style={{marginLeft:"100px"}}>SWIFT/BIC: EXAMPL33XXX</h1>
<h1 style={{marginLeft:"100px"}}>IBAN: GB26 MIDL 4005 1512 3456 74</h1>
</div>
</td>
    </today>
    </table>
    <table>
    <today>
        <td>Modalités de paiement:</td>
        <td>	
<h1 style={{marginLeft:"80px",marginBottom:"30px"}}>{facture.cond} jours</h1>
</td>
    </today>
    </table>
    <table>
    <today>
        <td>Note:</td>
        <td>	
<h1 style={{marginLeft:"220px",marginBottom:"50px"}}>{facture.note}</h1>
</td>
    </today>
    </table>
       <button onClick={handlePrint} variant='success'className="print-button" style={{color:"green"}}>
       <PrintIcon/>   Imprimez et/ou enregistrez sous forme PDF </button>
       </form>
      <button onClick={envoyermailSansRemise} variant='success'className="print-button" style={{color:"green",marginLeft:"40px"}}>
      <EmailIcon/> Envoyez par mail</button>
       </div>)}
    export default ListFacture
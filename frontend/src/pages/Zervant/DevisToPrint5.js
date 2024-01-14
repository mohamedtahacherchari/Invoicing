import React, {useState, useEffect,useRef } from 'react'
import {useNavigate ,useParams} from "react-router-dom"
import styles from './Invoice.module.css'
import './facture.css';
//import btoa from 'btoa';
import green from './green.png'
import styled from 'styled-components';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment'
import {makeStyles} from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import {initialState} from '../../pages/Zervant/initialState'
import {initialState2} from '../../pages/Zervant/initialState'
import {initialState3} from '../../pages/Zervant/initialState'
import {useReactToPrint } from 'react-to-print';
import {Typography} from '@mui/material';
import {envoyerMailAvecRemiseParLigneEnDevise, listDevisDetails, updateDevis } from '../../redux/actions/servantActions/devisAction';
import {DEVIS_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/devisConstant';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EmailIcon from '@mui/icons-material/Email';
import { ToastContainer } from 'react-toastify';
import html2pdf from 'html2pdf.js';

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
  const [titre, setTitre]= useState(initialState2);
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
const [pdfData, setPdfData] = useState('');

let echa = moment(today.getTime() +cond *24*60*60*1000).format("DD/MM/YYYY")
/*********************/
const dispatch = useDispatch()

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
  if (successUpdate) {
      dispatch({ type: DEVIS_UPDATE_RESET})
      navigate(`/inv/printAvecRemiseTabDevise2/${devis._id}`)} 
                  
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
       documentTitle : `Devis de ${clientf}`,
     onAfterPrint : ()=> alert('Print success')
 
      })
      const envoyerMailAvecRemiseParLigne = async () => {
        let pdfData; // Déclarer pdfData ici pour qu'il soit accessible en dehors du bloc try
      
        try {
          pdfData = await generatePDF(); // Utilisez la variable déjà déclarée
          console.log(pdfData);
          await envoyerMailAvecRemiseParLigneEnDevise(id, token, pdfData)(dispatch);
          //console.log(pdfData);
        } catch (error) {
          console.error("Erreur lors de l'envoi du mail :", error);
          // Gérer l'erreur de manière appropriée (affichage d'un message, journalisation, etc.)
        }
      }
    const generatePDF = async () => {
      const content = componentRef.current;
        // Define the options for the PDF generation
    
        const options = {
          margin: 10,
          filename: 'mon_fichier.pdf',
          image: { type: 'jpeg' },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm',  format: [310, 290], orientation: 'portrait' },
        };
      // Use html2pdf to generate the PDF from HTML content
        const pdf = await html2pdf().from(content).set(options).outputPdf();
      // Convert the PDF to a data URI and set it in the state
        //const pdfDataUri = 'data:application/pdf;base64,' + btoa(pdf);  btoa fonctionne 
        //correctement comme customBtoa
          const pdfDataUri = 'data:application/pdf;base64,' + customBtoa(pdf);

        setPdfData(pdfDataUri);
      // Return the pdfDataUri
        return pdfDataUri;
      };

            
      function customBtoa(input) {
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
      
        for (let i = 0; i < input.length; i += 3) {
          const a = input.charCodeAt(i);
          const b = input.charCodeAt(i + 1);
          const c = input.charCodeAt(i + 2);
      
          const combined = (a << 16) | (b << 8) | c;
      
          for (let j = 0; j < 4; j++) {
            if (i + j * 3 <= input.length * 8) {
              const index = (combined >> (6 * (3 - j))) & 0x3F;
              output += charSet.charAt(index);
            } else {
              output += '=';
            }
          }
        }
      
        return output;
      }
      
      // Exemple d'utilisation :
      const inputString = 'Hello, World!';
      const base64String = customBtoa(inputString);
      console.log(base64String);
      
   

return (

<div style={{ fontFamily: 'Whyte'}} >
   <ToastContainer/>
     <form onSubmit={submitHandler} style={{marginLeft:"40px"}}>
     <div ref={componentRef}>

     <div style={{ display: "flex" }}>
  {/* Première colonne */}
  <div style={{ flex: 1, marginLeft: "30px", marginTop: "60px" }}>
    
           <img src={green} alt="Node Image" />

    <p>111 rue Anselme Rondenay 94400 Vitry-sur-Seine France</p>
    <p>+33 (0) 1 88 32 77 68</p>
    <p>contact@greenlinks.fr</p>
    <p>www.greenlinks.fr</p>
  </div>

  {/* Deuxième colonne */}
 
  <div class="responsive-container">
  <p class="item">
    DEVIS-{num}
  </p>
  <p class="item">
    Date d'estimation: {date1}
  </p>
  <p class="item">
    Valable jusqu'au: {devis.date3}
  </p>
           </div>
    </div>

              
	          
    
       <div>

       <div style={{width:"",height:"50px", marginLeft:"30px", marginTop:"50px"}}> 
          <div>{devis.nomDevis}</div>
           <div>{devis.clientf}</div>
           <div>{devis.email}</div> 
           <div>{devis.adresse}</div> 
           <div>Devise :{devis.saveDevise}</div>
          </div>

<TableContainer component={Paper} className="tb-container"
style={{marginTop:"80px" , marginRight:"400px", width:"100%"}}
>
<Table className={classes.table} aria-label="simple table">
    <TableHead>
    <TableRow>
        <TableCell>Produit</TableCell>
        <TableCell >date</TableCell>
        <TableCell>Qté</TableCell>
        <TableCell >Unité</TableCell>
        <TableCell >Prix</TableCell>
        <TableCell>Remise</TableCell>
        <TableCell >TVA%</TableCell>
        <TableCell >Montant HT</TableCell>
        <TableCell >Montant</TableCell>

    </TableRow>
    </TableHead>
    <TableBody>
  {invoiceData.items.map((itemField, index) => (
    <TableRow key={index}>
      <TableCell><h1 name="product">{itemField.product}</h1></TableCell>
      <TableCell  sx={{ ml: 1, flex: 1 }}>
       {itemField.date2}
        </TableCell>
      <TableCell >
       {itemField.qte}
         
      </TableCell>
      <TableCell>{itemField.unite}</TableCell>
      <TableCell>
      {itemField.prix}
    
      </TableCell>
      <TableCell >
        {itemField.remise}
        
      </TableCell>
      <TableCell>{itemField.tva}</TableCell>
      <TableCell >
    
          {(itemField.qte * itemField.prix - itemField.remise).toFixed(2)}
        
      </TableCell>
      <TableCell>
 {(
            itemField.qte * itemField.prix -
            itemField.remise +
            (itemField.qte * itemField.prix * itemField.tva) / 100
          ).toFixed(2)}
      </TableCell>
    </TableRow>
  ))}
</TableBody>

</Table>
</TableContainer>
<div className="remise-container"> 

             Remise :{devis.totalRemise}
            </div>
 
             
<div className={styles.invoiceSummary} style={{marginLeft:"0px" ,marginTop:"50px"}}>
          <div className={styles.summary}>Résumé </div>
          <div className={styles.summaryItem}>
          <p>Total HT:</p>
          <h4>{devis.totalHorsTva}</h4>
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
                <h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{devis.total}</h4>
            </div>
    
        
            </div>
 
</div>
<h1 style={{marginTop:"80px"}} >Signature du client</h1>
<p style={{marginBottom:"120px"}}>(Signé et accepté)</p>
</div>
       <button onClick={handlePrint} variant='success'className="print-button" style={{color:"green"}}>
       <PrintIcon/>   Imprimer et/ou PDF </button>
       </form>
       <button onClick={envoyerMailAvecRemiseParLigne} variant='success'className="print-button" style={{color:"green",marginLeft:"40px"}}>
      <EmailIcon/> Envoyez par mail</button>      
       </div>
)}
    export default ListDevis
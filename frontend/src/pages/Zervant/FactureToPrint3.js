import React, {useState, useEffect,useRef } from 'react'
import {useNavigate ,useParams} from "react-router-dom"
import styles from './Invoice.module.css'
import './facture.css';
import PrintIcon from '@mui/icons-material/Print';
import {Link} from 'react-router-dom'
import moment from 'moment'
import green from './green.png'
import {makeStyles} from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import {initialState} from '../../pages/Zervant/initialState'
import {initialState2} from '../../pages/Zervant/initialState'
import {initialState3} from '../../pages/Zervant/initialState'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useReactToPrint } from 'react-to-print';
import {Divider,Typography,TextField} from '@mui/material';
import { envoyerMailAvecRemiseTotalEnDevise, listFactureDetails, updateFacture } from '../../redux/actions/servantActions/factureAction';
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
import EmailIcon from '@mui/icons-material/Email';
import { ToastContainer } from 'react-toastify';
import html2pdf from 'html2pdf.js';


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
const [pdfData, setPdfData] = useState('');

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
      navigate(`/inv/printAvecRemiseTotalDevise/${facture._id}`)

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

      const envoyerMailAvecRemiseTotal = async()=>{
        let pdfData;
        //dispatch(envoyerMailAvecRemiseTotalEnPourcentage(id,token))
        try {
          pdfData = await generatePDF();
          console.log(pdfData);
          await envoyerMailAvecRemiseTotalEnDevise(id,token,pdfData)(dispatch);
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
        







return (
  <div style={{ fontFamily: 'Whyte'}}>
<ToastContainer/>
     <form onSubmit={submitHandler} style={{marginLeft:"40px"}}>
      <div ref={componentRef}>
      <div style={{ display: "flex" }}>

      {/* Première colonne */}
  <div style={{ flex: 1, marginLeft: "30px", marginTop: "60px" }}>
     <img src={green} alt="Node Image" width="80%"/>
     <p>111 rue Anselme Rondenay 94400 Vitry-sur-Seine France</p>
     <p>+33 (0) 1 88 32 77 68</p>
     <p>contact@greenlinks.fr </p>
     <p>www.greenlinks.fr</p>
     </div>
           {/* Deuxième colonne */}
           <div class="responsive-container">
  <p class="item">
    FACTURE-{num}
  </p>
  <p class="item">
    Date d'estimation: {date1}
  </p>
  <p class="item">
    Valable jusqu'au: {echa}
  </p>
           </div>
  </div>
       

       <div style={{width:"",height:"50px", marginLeft:"px", marginTop:"50px"}}> 
          <div>{facture.nomFacture}</div>
           <div>{facture.clientf}</div>
           <div>{facture.email}</div> 
           <div>{facture.adresse}</div> 
           <div>Devise : {facture.saveDevise}</div>
          </div>

          <TableContainer component={Paper} className="tb-container" style={{ marginTop: "80px", marginRight: "400px", width: "100%" }}>
  <Table className={classes.table} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Produit</TableCell>
        <TableCell>date</TableCell>
        <TableCell>Qté</TableCell>
        <TableCell>Unité</TableCell>
        <TableCell>Prix</TableCell>
        <TableCell>TVA%</TableCell>
        <TableCell>Montant HT</TableCell>
        <TableCell>Montant</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {invoiceData.items.map((itemField, index) => (
        <TableRow key={index}>
          <TableCell>
            <h1 name="product">{itemField.product}</h1>
          </TableCell>
          <TableCell>{itemField.date2}</TableCell>
          <TableCell>{itemField.qte}</TableCell>
          <TableCell>{itemField.unite}</TableCell>
          <TableCell>{itemField.prix}</TableCell>
          <TableCell>{itemField.tva}</TableCell>
          <TableCell>
            {(itemField.qte * itemField.prix * (1 - itemField.remisePourcent / 100)).toFixed(2)}
          </TableCell>
          <TableCell>
            {(
              (itemField.qte * itemField.prix) * (1 - itemField.remisePourcent / 100) +
              (itemField.qte * itemField.prix) * (itemField.tva / 100)
            ).toFixed(2)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<div class="remise-container">
        Remise : {facture.remisetotal2} 
    </div>

  
<div className={styles.invoiceSummary} style={{marginLeft:"0px" ,marginTop:"50px"}}>
          <div className={styles.summary}>Résumé </div>
          <div className={styles.summaryItem}>
          <p>Total HT:</p>
          <h4>{(facture.totalHorsTva-facture.remisetotal2).toFixed(2)}</h4>
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
                <h4 name="subTotal" style={{color: "grey", fontSize: "18px", lineHeight: "8px"}}>{facture.total}</h4>
            </div>

                 <div className={styles.summaryItem}>
               <p>Acompte</p>
           <h4>
         
           {facture.Acompte4}
           </h4>
       
        <h4 
         name="subTotal"
         style={{color: "grey",
          fontSize: "18px",
           lineHeight: "8px",
           marginLeft:"60px"
           }}>
                      {facture.acompteEnDevise}
 
</h4>
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
             {facture.Acompte4 && facture.Acompte4.slice ? ((subTotal -(facture.remisetotal / subTotal) * 100)- ((subTotal -(facture.remisetotal / subTotal) * 100)* (facture.Acompte4.slice(0, -1) / 100))).toFixed(2) : ""}

             
             </h4>
           <p> Payé le {echa}</p>

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
    </div>
       <button onClick={handlePrint} variant='success'className="print-button" style={{color:"green"}}>
       <PrintIcon/>   Imprimer et/ou PDF </button>
       </form>
       <button onClick={envoyerMailAvecRemiseTotal} variant='success'className="print-button" style={{color:"green",marginLeft:"40px"}}>
      <EmailIcon/> Envoyez par mail</button>        

       </div>
       
       
       )}
    export default ListFacture
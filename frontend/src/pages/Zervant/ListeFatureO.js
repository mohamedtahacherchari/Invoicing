import React, {useState, useEffect } from 'react'
import {  useNavigate ,useParams} from "react-router-dom"
import NestedList from './ListeDroite2';
import CustomizedSelects from './CrediatorRef'
import {Link} from 'react-router-dom'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import {useSelector,useDispatch} from 'react-redux'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button,Divider,Typography,TextField} from '@mui/material';
import { listFactureDetails, updateFacture } 
from '../../redux/actions/servantActions/factureAction';
import { FACTURE_UPDATE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/factureConstant';
import { dispatchGetAllClientf, fetchAllClientf } from '../../redux/actions/servantActions/clientfAction';
import { dispatchGetAllProduct, fetchAllProduct } from '../../redux/actions/servantActions/productAction';
    const ListFacture = () => {
 
      const {id} = useParams()
      const navigate =  useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [titre, setTitre]= useState([{titre :''},]);
  const [champtext, setChamptext]= useState([{champtext:''},]);
  const [soustotal, setSoustotal]= useState([{soustotal:''},]);

  const condition = [
    { value: 0 ,  label: ' 0 jours' },
    { value: 7,   label: '7jours ' },
    { value: 14 , label: '14 jours ' },
    { value: 30 , label: '30 jours ' },
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

//console.log(echa)
  
  /* Les useStates */


const[num, setNum]=useState('');
//const[echa,setEcha]=useState('');
const[enga,setEnga]=useState('');
const[service,setService]=useState('');
const[ref,setRef]=useState('');
const[ordre,setOrdre]=useState('');
const[communication, setCommunication]=useState('');
const[qte,setQte]=useState('');
const[unite,setUnite]=useState('');
const[prix,setPrix]=useState('');
const[tva,setTva]=useState('');
//const[montant,setMontant]=useState('');
const[title,setTitle]=useState('');
const[champText,setChampText]=useState('');
const[message,setMessage]=useState('');
const[note,setNote]=useState('');
const[date1,setDate1]=useState('');
const[date2,setDate2]=useState('');
const [cond, setCond] = useState('');
const [clientf, setClientf] = useState('');
const [product, setProduct] = useState('');
const today = new Date(date1);
//const [echa, setEcha] = useState('');



 let echa = moment(today.getTime() +cond *24*60*60*1000).format("DD/MM/YYYY")

 let montant = (qte*prix) -(qte*prix)*tva/100
//const changeHandler = (e) => {setSelectedOption(e.target.value)
   //console.log(selectedOption)}

const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
const handleClient = (e) => {
    setClientf(e.target.value);
    console.log(clientf)
  };
 
  const [formFields, setFormFields] = useState([
    { description :'',
       Date :'' ,
       qte :'',
       unite :'',
       prix :'',
       tva: '',
       montant: '' ,
  },
  ]);


  const handleFormChange=(event,index)=>{
    let data =[...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data)
  }

 
  const addFields=()=>{
    let object={
      description :'',
       Date :'' ,
       qte :'',
       unite :'',
       prix :'',
       tva: '',
       montant: '',
      

    }
    setFormFields([...formFields,object])
  }

  const addTitre=()=>{
    let object={
      titre :'',
    }
    setTitre([...titre,object])
  }


  const addChamptext=()=>{
    let object={
    champtext :'',
    }
    setChamptext([...champtext,object])
  }

  const addSoustotal=()=>{
    let object={
    soustotal :'',
    }
    setSoustotal([...soustotal,object])
  }
  const removeFields=(index)=>{
    let data=[...formFields];
    data.splice(index,1)
    setFormFields(data)
  }
  const removeTitre=(index)=>{
   let data= [...titre];
data.splice(index,1)
   setTitre(data)
  }
  const removeChamptext=(index)=>{
    let data= [...champtext];
 data.splice(index,1)
    setChamptext(data)
   }
   const removeSoustotal=(index)=>{
    let data= [...soustotal];
 data.splice(index,1)
    setSoustotal(data)
   }


   
/******************** */


   
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
  navigate('/facture')
  } 
                  
else{ 
if (!facture.num || facture._id !== id){
  dispatch(listFactureDetails(id))
}          
      
  else {
  setClientf(facture.clientf)
  setProduct(facture.product)
  setNum(facture.num)
  setCond(facture.cond)
 // setEcha(facture.echa)
  setEnga(facture.enga)
  setService(facture.service) 
  setRef(facture.ref)
  setOrdre(facture.ordre) 
  setCommunication(facture.communication)  
  setQte(facture.qte)
  setUnite(facture.unite)  
  setPrix(facture.prix) 
  setTva(facture.tva)
  //setMontant(facture.montant)
  setTitle(facture.title) 
  setChampText(facture.champText)
  setMessage(facture.message) 
  setNote(facture.note) 
  setDate1(facture.date1)
  setDate2(facture.date2) 
 
}
}   }

, [dispatch, id, facture, successUpdate])


const submitHandler = (e) => {
  e.preventDefault()
  dispatch(
    updateFacture({
      _id :id,
      clientf,
      product,
      num ,
      cond,
      echa ,
      enga,
      service,
      ref, 
      ordre,
      communication,
      qte  ,
      unite ,
      prix ,
      tva ,
      montant ,
      title ,
      champText ,
      message ,
      note ,
      date1,
      date2,

    })
  )

}





  return (

    


    <div style={{ fontFamily: 'Whyte'}}>
          <Link to="/facture" style={{ textDecoration: "none" }}>
    <button className="go_back" style={{marginTop:"60Px"}}>
        <i className="fas fa-long-arrow-alt-left"></i> Go Back
    </button>
    </Link>
      <form onSubmit={submitHandler}>
      <table>
        <tbody>
          <td >

          <Typography variant="h6" gutterBottom style={{marginTop:"70px"}}>
          Client   
          </Typography>
          <table>
          <tbody>
	        <td>
          <select style={{width:"200px",height:"50px"}} 
          onChange={(e)=>setClientf(e.target.value)}
           value={clientf}>
          {clientfs.map((clientf)=>
          (<option key={clientf._id} > {clientf.Firstname}</option>))}
          </select>
          </td>
	<td>        <Typography variant="h6" gutterBottom 
  style={{marginLeft: "540px",
   textShadow: "2px 2px 5px green" ,
   fontSize: "42px",
   marginTop :"10px",

   }}>
FACTURE</Typography></td>
	
	</tbody></table>
    <Divider style ={{marginTop:"50px"}}/>
    <table>
      <tbody>
        <td>	
      	<table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>
             Numéro de facture
             </Typography></td>
        <td>
          <TextField
         id="outlined-basic"
         label=""
          value={num}
          onChange={(e) => setNum(e.target.value)}
          variant="outlined" 
         placeholder="Ex : BC12345"
         style={{marginLeft:"75px", width:"250px"}}/>
         </td>
      </tbody>
    </table>
       <table>
        <tbody>
        <td> 
        <Typography variant="body2" 
        style={{marginRight:"70px"}}>
          Date de facturation
          <p style={{color:"red" ,fontSize:"10px"}}>Choix obligatoire</p>
         </Typography>
          </td>
          <td>		  
      <TextField
        id="date"
        label=""
        type="date"
        value={date1}
        onChange={(e) => setDate1(e.target.value)}
        style={{marginTop:"30px", marginRight:"60px"}}/>
      </td>
        
        </tbody>
       </table>
		
		
			<table>
				<tbody>
					<td><Typography variant="body2" gutterBottom Conditions de paiement
     
>Conditions de paiement p
<p style={{color:"red" ,fontSize:"10px"}}>Choix obligatoire</p>
</Typography>
           </td>
					<td>
        <select 
          style={{width:"50px",height:"50px", marginLeft:"40px"}}
          onChange={(e)=> setCond(e.target.value)} 
          //onChange={changeHandler}
          value={cond}>
          {condition.map((option)=>
          (<option key={option.value}>{option.value}</option>))}
        </select>
        jours
          </td>
				</tbody>
			</table>
      <table>
        <tbody>
          <td><Typography variant="body2" gutterBottom Conditions de paiement
     
     >Echéance</Typography></td>
          <td>
          
       <TextField
       margin="normal"
       id="date-picker-dialog"
       label="" variant="outlined"
      // placeholder="Ex : BC12345"
       style={{marginLeft:"130px", width:"250px"}}
       value={echa}
       format="MM/dd/yyyy"
       KeyboardButtonProps={{
        'aria-label': 'change date',
    }}
   />
   

          </td>
        </tbody>
      </table>
		<table>
      <tbody>
        <td>
          <Typography 
          variant="body2"
         gutterBottom Conditions de paiement>
          Numéro d'engagement
          </Typography>
          </td>
        <td>
        <TextField
       id="outlined-basic"
       label="" variant="outlined"
       placeholder="Ex : BC12345"
       style={{marginLeft:"40px", width:"250px"}}
       value={enga}
       onChange={(e) => setEnga(e.target.value)} />
      </td>
      </tbody>
    </table>
    <table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>Code service</Typography></td>
        <td><TextField
         id="outlined-basic"
         label="" 
         variant="outlined"
         placeholder="Ex : PRFPLTF974"
         value={service}
         onChange={(e) => setService(e.target.value)}
         style={{marginLeft:"105px", width:"250px"}}
          /></td>
      </tbody>
    </table>
    <table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>
          Référence contrat acheteur
        </Typography></td>
        <td>
          <TextField 
          id="outlined-basic" 
          label=""
          variant="outlined"
          placeholder="Ex : C12345"
          style={{marginLeft:"8px", width:"250px"}}
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          /></td>
      </tbody>
    </table>
    <table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>
          Ordre d'achat vendeur
        </Typography></td>
        <td>
          <TextField 
          id="outlined-basic"
          label="" variant="outlined"
          placeholder="Ex : BC4567"
          value={ordre}
          onChange={(e) => setOrdre(e.target.value)}
          style={{marginLeft:"44px", width:"250px"}}
          /></td>
      </tbody>
    </table>
    <table style={{marginTop:"0px"}}>
      <tbody>
        <td>
        <CustomizedSelects/>
        </td>
        <td>
          <TextField
           id="outlined-basic" 
           label="" 
           variant="outlined" 
           placeholder="Ex : BC4567"
           style={{marginLeft:"10px", width:"250px" ,position:"fixe"}}
           value={communication}
           onChange={(e) => setCommunication(e.target.value)}
          /></td>
      </tbody>
    </table>
		  
	</td>
        <td> <div style={{marginBottom:"220Px" , position:"relative"}}>

        <h1>Message(0/3000)</h1>
        <TextareaAutosize
      maxRows={4}
      aria-label="Text"
      placeholder="Entrer votre message ici..."
      //defaultValue="Entrer votre message ici..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: "445px" ,height:"200px", marginTop:"0px"}}
      />
        </div>
  
          
           </td>
      </tbody>
    </table>

          
		
		      <Divider style={{marginBottom:"px" ,marginTop:"px"}}/>
          <table  style={{marginBottom:"px"}}>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Date</th>
                <th>Qté</th>
                <th>Unité</th>
                <th>Prix</th>
                <th>TVA %</th>
                <th>Montant</th>
            </tr>
            </thead> 
            <tbody>   
             {formFields.map((index) =>{
              return(
               <tr key={index}>
                
                <td>
                  <select style={{width:"200px",height:"50px"}} 
                   onChange={(e,index)=>setProduct(e.target.value)}
                   value={product}>
                    {products.map((product)=>
                    (<option key={product._id} > {product.name}</option>))}
                  </select>
               </td>
              <td>				  
              <TextField
                  id=""
                  label=""
                  name="date"
                  placeholder=''
                  type="date"
                //defaultValue="2023-05-24"
                 onChange={(e,index)=>setDate2(e.target.value)}
                 value={date2}
                 sx={{ width: 150 }}/>
              </td>
              <td>
             <TextField
            autoFocus
            margin="dense"
            id=""
            name="qte"
            label=""
            //onChange={event=> handleFormChange(event,index)}
            value={qte}
            placeholder='1,00'
            fullWidth
            variant="outlined"
            onChange={(e,index) => setQte(e.target.value)}
			      style={{width:"100px", marginRight:"0px"}}/>
              </td>
              <td>
        <select 
          style={{width:"100px",height:"50px"}}
          onChange={(e, index)=> setUnite(e.target.value)} 
          //onChange={changeHandler}
          value={unite}>
          {Unite.map((option)=>
          (<option key={option.label}>{option.label}</option>))}
        </select>
              </td>
              <td>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
			      style={{width:"100px"}}
            value={prix}
           onChange={(e,index) => setPrix(e.target.value)}/>
              </td>
              <td>
              <select 
          style={{width:"100px",height:"50px", marginLeft:""}}
          onChange={(e,index)=> setTva(e.target.value)} 
          //onChange={changeHandler}
          value={tva}>
          {arrayTVA.map((option)=>
          (<option key={option.label}>{option.value}</option>))}
        </select>
              </td>
              <td>
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            placeholder='0,00DT'
            fullWidth
            variant="outlined"
		       	style={{width:"100px"}}
            value={montant}
          // onChange={(e) => setMontant(e.target.value)}
          />
              </td>
              <td>
              <Button onClick={() => removeFields(index) } aria-label="delete" size="small">
              <IconButton aria-label="delete" size="small">
  <DeleteIcon fontSize="small" />
</IconButton>
</Button></td>

            </tr>
       

       )
       })} 


 
           </tbody>
            </table> 

            <table>
        <tbody>
        {titre.map((g,index) =>{
          return(
          <tr key={index}>
          <td>
          <TextField
       autoFocus
       margin=""
       id=""
       label=""
       //value={g.titre}
       placeholder='Titre'
       type="text"
       value={title}
       onChange={(e)=>setTitle(e.target.value)}
       fullWidth
       variant="outlined"
 style={{width:"820px"}}
     />
          </td>

          <Button  aria-label="delete" size="small" onClick={() => removeTitre(index)} 
             style={{marginLeft:"90px"}}
          >
              <IconButton aria-label="delete" size="small">
  <DeleteIcon fontSize="small" />
</IconButton>
</Button>
          <td>

          </td>
          </tr>
       

       )
       })} 
        </tbody>
       </table>
       <table>
        <tbody>
        {champtext.map((g,index) =>{
          return(
          <tr key={index}>
          <td>
          <TextareaAutosize
      maxRows={4}
      aria-label="Text"
      placeholder="Champ text"
      //defaultValue="Text"
      variant="outlined"
      value={champText}
      onChange={(e)=>setChampText(e.target.value)}
      
      style={{ width: "910px" ,height:"200px" }}
    />
          </td>

          <Button  aria-label="delete" size="small" onClick={() => removeChamptext(index)} 
          >
              <IconButton aria-label="delete" size="small" style={{marginLeft:"5px"}}>
  <DeleteIcon fontSize="small" />
</IconButton>
</Button>
          <td>

          </td>
          </tr>
       

       )
       })} 
        </tbody>
       </table>
       <table>
        <tbody>
        {soustotal.map((g,index) =>{
             return( 
          <tr key={index}>
          <td>
          <h6 style={{width:"90px"}}>Sous-total</h6>
          </td>
          <td>
          <h6  style={{marginLeft:"690px", width:"90Px"}} >Sous-total</h6>
          </td>
 <td>
         <Button  aria-label="delete" size="small" onClick={() => removeSoustotal(index)} 
         >
              <IconButton aria-label="delete" size="small" style={{marginLeft:"52px"}}>
  <DeleteIcon fontSize="small" />
</IconButton>
</Button>
          </td>
          </tr>
       

       )
       })} 
        </tbody>
       </table>
         
           <List
      sx={{ width: '100%', maxWidth: 260, bgcolor: 'background.paper' }}
      component=""
      aria-labelledby=""
      subheader={
        <ListSubheader component="div" id="">
        </ListSubheader>
      }
    >
   
      <ListItemButton onClick={handleClick} style={{backgroundColor:"#008B8B"}}>
        <ListItemIcon>
        
        </ListItemIcon>
        <ListItemText primary="Ajouter une ligne" style={{color:"white"}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 ,backgroundColor:"#008B8B"}}
           onClick={addFields} variant="contained" color="success" 
          >
            <ListItemText primary="Ajouter une ligne" style={{color:"white"}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 ,backgroundColor:"#008B8B"}}
           onClick={addTitre} variant="contained" color="success" 
          >
            <ListItemText primary="Ajouter un titre" style={{color:"white"}} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 ,backgroundColor:"#008B8B"}}
           onClick={addChamptext} variant="contained" color="success" 
          >
            <ListItemText primary="Ajouter un champ de texte" style={{color:"white"}}/>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4,backgroundColor:"#008B8B" }}
           onClick={addSoustotal} variant="contained" color="success" 
          >
            <ListItemText primary="Ajouter un sous-total" style={{color:"white"}}/>
          </ListItemButton>
        </List>
      </Collapse>
    </List>

    <Divider/>
    <table>
    <thead>
    <tr>
    <th>Note de bas de page </th>
    <th>Moyen de paiement</th>
    </tr>
    </thead> 
      <tdoby>
      <td>  <TextareaAutosize
      maxRows={4}
      aria-label="Text"
      placeholder="Entrez vos notes ici ..."
     // defaultValue="Text"

     value={note}
     onChange={(e)=>setNote(e.target.value)}
     
      style={{ width: "600px" ,height:"100px" }}
    /></td>
      <td>
       
      </td> 
      </tdoby>
    </table>
          </td>

          <td>
      

  <NestedList/>
        </td>
        </tbody>
        </table> 
        <Button type="submit">Submit</Button>
        
         </form>
        </div>
      
  )
}

export default ListFacture



import React, { useState } from "react";

function Invoice(props) {
  const [total, setTotal] = useState(0);

  // Fonction qui calcule le total en fonction des conditions
  const calculateTotal = () => {
    let newTotal = 0;

    // Condition 1
    if (showSansRemise) {
      newTotal += subtotal;
    }

    // Condition 2
    if (showResumeFacture) {
      newTotal +=  subtotal- remisetotal2;
    }

    // Condition 3
    if (showResumeFacture2) {
      newTotal +=  subtotal-((remisetotal/subtotal)*100)
;    }

    // Condition 4
    if (showResumeFactureDevise) {
      newTotal += subTotal4;
    }

    // Condition 5
    if (showResumeFacturePourcent) {
      newTotal +=   subtotal2;
    }

    setTotal(newTotal);
  };

  // Appel de la fonction de calcul du total à chaque mise à jour des conditions
  useEffect(() => {
    calculateTotal();
  }, [subtotal, subtotal2,  subTotal4, remisetotal2, props.condition5]);

  return (
    <div>
      <p>Montant : {props.montant} euros</p>
      <p>Condition 1 : {props.condition1 ? "Oui" : "Non"}</p>
      <p>Condition 2 : {props.condition2 ? "Oui" : "Non"}</p>
      <p>Condition 3 : {props.condition3 ? "Oui" : "Non"}</p>
      <p>Condition 4 : {props.condition4 ? "Oui" : "Non"}</p>
      <p>Condition 5 : {props.condition5 ? "Oui" : "Non"}</p>
      <p>Total : {total} euros</p>
    </div>
  );
}

export default Invoice;
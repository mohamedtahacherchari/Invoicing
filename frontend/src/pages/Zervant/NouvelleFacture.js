import {React,useState} from 'react'
import Search from './SearchClient';
import SelectTextFields from './Selected'
import Autocomplete from './Autocomplete'
import { Link } from "react-router-dom";
import MobileDatePicker from './Datepicker'
import NestedList from './ListeDroite2';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import CustomizedSelects from './CrediatorRef'
//import ListUnité from './ListUnité'
import SettingsIcon from '@material-ui/icons/Settings';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Select from './ListDescription'
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
import CheckboxesTags from './Autocheck'


import {
	Container,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Typography,
	TextField
} from '@mui/material';
import UnstyledSelectIntroduction2 from './ListButton2';
import FactureChoise from './FactureChoise';
//import Employees from '../Employees/Employees';
//import { index } from 'cheerio/lib/api/traversing';
const NouvelleFacture = () => {
 
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [titre, setTitre]= useState([
    {titre :''},
  ]);
  const [champtext, setChamptext]= useState([
    {champtext:''},
  ]);
  const [soustotal, setSoustotal]= useState([
    {soustotal:''},
  ]);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
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
  return (
    <div style={{ fontFamily: 'Whyte'}}>
      <table>
        <tbody>
          <td >

          <Typography variant="h6" gutterBottom style={{marginTop:"70px"}}>
Client    </Typography>
<table><tbody>
	<td><Autocomplete/></td>
	<td>        <Typography variant="h6" gutterBottom style={{marginLeft: "450px"}}>
Facture   </Typography></td>
	
	</tbody></table>
    <Divider style ={{marginTop:"50px"}}/>
    <table>
      <tbody>
        <td>	
          	<table>
			<tbody>
				<td ><Typography variant="body2" 
        style={{marginRight:"70px"}}>
          Numéro de facture</Typography></td>
				<td ><p style={{marginRight:"120px"}}>Test-1 </p></td>
        <td ><FactureChoise/></td>

      </tbody>
		</table>
       <table>
        <tbody>
        <td> 
        <Typography variant="body2" 
        style={{marginRight:"70px"}}>
          Date de facturation</Typography>
          </td>
          <td>		  
            <TextField
        id="date"
        label=""
        type="date"
        defaultValue="2023-03-01"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      style={{marginTop:"30px", marginRight:"60px"}}
      /></td>
        
        </tbody>
       </table>
		
		
			<table>
				<tbody>
					<td><Typography variant="body2" gutterBottom Conditions de paiement
     
>Conditions de paiement</Typography>
           </td>
					<td ><UnstyledSelectIntroduction2 /></td>
				</tbody>
			</table>
      <table>
        <tbody>
          <td><Typography variant="body2" gutterBottom Conditions de paiement
     
     >Echéance</Typography></td>
          <td></td>
        </tbody>
      </table>
		<table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>Numéro d'engagement</Typography></td>
        <td><TextField id="outlined-basic" label="" variant="outlined" placeholder="Ex : BC12345"
           style={{marginLeft:"40px", width:"250px"}}
          /></td>
      </tbody>
    </table>
    <table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>Code service</Typography></td>
        <td><TextField id="outlined-basic" label="" variant="outlined" placeholder="Ex : PRFPLTF974"
           style={{marginLeft:"105px", width:"250px"}}
          /></td>
      </tbody>
    </table>
    <table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>
          Référence contrat acheteur
        </Typography></td>
        <td><TextField id="outlined-basic" label="" variant="outlined" placeholder="Ex : C12345"
           style={{marginLeft:"8px", width:"250px"}}
          /></td>
      </tbody>
    </table>
    <table>
      <tbody>
        <td><Typography variant="body2" gutterBottom Conditions de paiement>
          Ordre d'achat vendeur
        </Typography></td>
        <td><TextField id="outlined-basic" label="" variant="outlined" placeholder="Ex : BC4567"
           style={{marginLeft:"44px", width:"250px"}}
          /></td>
      </tbody>
    </table>
    <table style={{marginTop:"0px"}}>
      <tbody>
        <td>
        <CustomizedSelects/>
        </td>
        <td><TextField id="outlined-basic" label="" variant="outlined" placeholder="Ex : BC4567"
           style={{marginLeft:"10px", width:"250px" ,position:"fixe"
          }}
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
    <th>Description</th>
    <th>Date</th>
    <th>Qté</th>
    <th>Unité</th>
    <th>Prix</th>
    <th>TVA</th>
    <th>Montant</th>



    </tr>
    </thead> 
    <tbody >   
       {formFields.map((g,index) =>{
        return(
<tr key={index}>
              <td ><Select/></td>
              <td>				  <TextField
        id=""
        label=""
        name="date"
        placeholder=''
        type="date"
        defaultValue="2023-05-24"
        onChange={event=> handleFormChange(event,index)}
        sx={{ width: 150 }}
        InputLabelProps={{
          shrink: true,
        }}
		style={{marginTop:""}}
     value={g.date}
    
      /></td>
              <td>

              <TextField
            autoFocus
            margin="dense"
            id=""
            name="qte"
            label=""
            onChange={event=> handleFormChange(event,index)}
            value={g.qte}
            placeholder='1,00'
            type="email"
            fullWidth
            variant="outlined"
			style={{width:"100px", marginRight:"0px"}}
          />
              </td>
              <td>
               //List unité
              </td>
              <td>
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            placeholder='0,00DT'
            type="email"
            fullWidth
            variant="outlined"
			style={{width:"100px"}}
          />
              </td>
              <td>
//TVA              </td>
              <td>
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            placeholder='0,00DT'
            type="email"
            fullWidth
            variant="outlined"
			style={{width:"100px"}}
          />
              </td>
              <td><Button onClick={() => removeFields(index) } aria-label="delete" size="small">
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
       type="email"

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
        </div>
  )
}

export default NouvelleFacture
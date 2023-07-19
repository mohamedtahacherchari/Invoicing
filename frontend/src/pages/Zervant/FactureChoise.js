import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
//import ListUnité from './ListUnité'
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

import axios from "axios";
import {useSelector} from 'react-redux'

import { Country, State }  from 'country-state-city';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material'
import UnstyledSelectIntroduction from './ListButton'
import UnstyledSelectIntroduction2 from './ListButton2'
import UnstyledSelectIntroduction3 from './ListButton3';


const countries = Country.getAllCountries();

const FactureChoise = () => {

	const token = useSelector(state => state.token)
    const [open, setOpen] = React.useState(false);

	const [selectedcountry, setSelectedCountry] = useState()
	const [selectedstate, setSelectedState] = useState()
	const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)
	const [show4, setShow4] = useState(false)
	const [show5, setShow5] = useState(false)
	const [show6, setShow6] = useState(false)
	
	const FirstNameRef = useRef();
	const LastNameRef = useRef();
	const phoneNumberRef = useRef();
	const phoneNumber2Ref = useRef();
	const companyNameRef = useRef();
	const EmailRef = useRef();
	const CountryRef = useRef();
	const StateRef = useRef();

	const StepName1Ref = useRef();
	const Description1Ref = useRef();
	const StepName2Ref = useRef();
	const Description2Ref = useRef();
	const StepName3Ref = useRef();
	const Description3Ref = useRef();
	const StepName4Ref = useRef();
	const Description4Ref = useRef();
	const StepName5Ref = useRef();
	const Description5Ref = useRef();
	const StepName6Ref = useRef();
	const Description6Ref = useRef();
	const StepName7Ref = useRef();
	const Description7Ref = useRef();
	const StepName8Ref = useRef();
	const Description8Ref = useRef();
	const StepName9Ref = useRef();
	const Description9Ref = useRef();
	const StepName10Ref = useRef();
	const Description10Ref = useRef();

	const onchangeCountry = (e) => {
		setSelectedCountry(e.target.value)
	}

	const onchangeState = (e) => {
		setSelectedState(e.target.value)
	}



    const handleClick = () => {
        setOpen(!open);
      };
      
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


	return (
		<>
		
			<Container>
			<ToastContainer />
				<Card>
				<Box style={{color:"green"}}>
					 <Typography onClick={handleClickOpen}
                    
					 variant="p"   >Changer</Typography>
            
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>CREEZ LE PREMIER NUMERO DE FACTURATION</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        
           <table style={{marginTop:"60px"}}>
            <tbody>
                <td>
                <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Numéro de facture"
            type="email"
            fullWidth
            variant="standard"
            style={{marginRight:"30px"}}
			placeholder='1'
          />
                </td>
                 <td ><h1>-</h1></td>
                <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Préfixe"
            type="email"
            fullWidth
            variant="standard"
            style={{marginLeft:"10px"}}
			placeholder='Ex : 2022'
          />
             
            </tbody>
           </table>
         <Divider style={{marginTop: "60px"}}/>

        
         <Typography onClick={handleClickOpen}
                     variant="subtitle1" gutterBottom style={{color:"green", marginTop:"40px"}}
                     >

Veuillez ajouter un numéro pour votre première facture. 
La numérotation continuera ensuite automatiquement.
 Une fois enregistré, ce numéro ne peut pas être changé. 
 Vous pouvez cependant utiliser les préfixes numériques
  pour vos factures pour créer de nouvelles séquences 
  plus tard .
              </Typography>  
        


                       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClose}>Enregister</Button>
        </DialogActions>
      </Dialog>
					</Box>
					</Card>
				
				
			
			</Container>
			
		


            
		</>
	)
}

export default FactureChoise

import { Button } from '@mui/material'
import React from 'react'


const envoyermail = async()=>{
 
    try {
        const res = await axios.post('/api/facture/sendMailSansRemise/', {
            candidatsend,
            FirstName,
            date,
            nomClient,
             heur, 
             personne,
             lieu,
             poste
        },{
            headers: {Authorization: token}
        })
    } catch (error) {
        console.log(error)
    }

}
  

const mailSansRemise = () => {
  return (
    <Button onClick={envoyermail}>Envoyer email</Button>
    )
}

export default mailSansRemise
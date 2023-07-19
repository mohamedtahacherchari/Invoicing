import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonsGroup from './RadioList'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



export default function CheckboxesTags4({setSaveDevise, saveDevise}) {
   


  const devises = [
    { id: 1, nom: 'Dollar américain', symbole: 'USD' },
    { id: 2, nom: 'Euro', symbole: 'EUR' },
    { id: 3, nom: 'Yen japonais', symbole: 'JPY' },
    { id: 4, nom: 'Livre sterling', symbole: 'GBP' },
    { id: 5, nom: 'Dollar canadien', symbole: 'CAD' },
    { id: 6, nom: 'Franc suisse', symbole: 'CHF' },
    { id: 7, nom: 'Dollar australien', symbole: 'AUD' },
    { id: 8, nom: 'Dollar néo-zélandais', symbole: 'NZD' },
    { id: 9, nom: 'Roupie indienne', symbole: 'INR' },
    { id: 10, nom: 'Yuan chinois', symbole: 'CNY' },
    { id: 11, nom: 'Rouble russe', symbole: 'RUB' },
    { id: 12, nom: 'Rand sud-africain', symbole: 'ZAR' },
    { id: 13, nom: 'Couronne norvégienne', symbole: 'NOK' },
    { id: 14, nom: 'Peso mexicain', symbole: 'MXN' },
    { id: 15, nom: 'Real brésilien', symbole: 'BRL' },
    { id: 16, nom: 'Dollar de Hong Kong', symbole: 'HKD' },
    { id: 17, nom: 'Couronne suédoise', symbole: 'SEK' },
    { id: 18, nom: 'Livre turque', symbole: 'TRY' },
    { id: 19, nom: 'Peso argentin', symbole: 'ARS' },
    { id: 20, nom: 'Shekel israélien', symbole: 'ILS' },
    { id: 21, nom: 'Baht thaïlandais', symbole: 'THB' },
    { id: 22, nom: 'Dirham des Émirats arabes unis', symbole: 'AED' },
    { id: 23, nom: 'Krona danoise', symbole: 'DKK' },
    { id: 24, nom: 'Peso philippin', symbole: 'PHP' },
    { id: 25, nom: 'Dollar de Singapour', symbole: 'SGD' },
    { id: 26, nom: 'Forint hongrois', symbole: 'HUF' },
    { id: 27, nom: 'Kuna croate', symbole: 'HRK' },
    { id: 28, nom: 'Zloty polonais', symbole: 'PLN' },
    { id: 29, nom: 'Leu roumain', symbole: 'RON' },
    { id: 30, nom: 'Lev bulgare', symbole: 'BGN' },
    { id: 31, nom: 'Won sud-coréen', symbole: 'KRW' },
    { id: 32, nom: 'Won sud-coréen', symbole: 'KRW' },
    { id: 33, nom: 'Dollar taïwanais', symbole: 'TWD' },
    { id: 34, nom: 'Peso colombien', symbole: 'COP' },
    { id: 35, nom: 'Dollar de Trinité-et-Tobago', symbole: 'TTD' },
    { id: 36, nom: 'Dollar de Barbade', symbole: 'BBD' },
    { id: 37, nom: 'Ringgit malaisien', symbole: 'MYR' },
    { id: 38, nom: 'Dollar de Brunei', symbole: 'BND' },
    { id: 39, nom: 'Dollar de Fidji', symbole: 'FJD' },
    { id: 40, nom: 'Colon costaricien', symbole: 'CRC' },
    { id: 41, nom: 'Koweït dinar', symbole: 'KWD' },
    { id: 42, nom: 'Riyal saoudien', symbole: 'SAR' },
    { id: 43, nom: 'Peso dominicain', symbole: 'DOP' },
    { id: 44, nom: 'Peso cubain', symbole: 'CUP' },
    { id: 45, nom: 'Dinar algérien', symbole: 'DZD' },
    { id: 46, nom: 'Dinar tunisien', symbole: 'TND' },
    { id: 47, nom: 'Bolivar vénézuélien', symbole: 'VEF' },
    { id: 48, nom: 'Dollar de Belize', symbole: 'BZD' },
    { id: 49, nom: 'Rial iranien', symbole: 'IRR' },
    { id: 50, nom: 'Pound égyptien', symbole: 'EGP' },
    { id: 51, nom: 'Naira nigérian', symbole: 'NGN' },
  { id: 52, nom: 'Dirham marocain', symbole: 'MAD' },
  { id: 53, nom: 'Peso philippin', symbole: 'PHP' },
  { id: 54, nom: 'Taka bangladeshi', symbole: 'BDT' },
  { id: 55, nom: 'Colon salvadorien', symbole: 'SVC' },
  { id: 56, nom: 'Shilling kényan', symbole: 'KES' },
  { id: 57, nom: 'Roupie pakistanaise', symbole: 'PKR' },
  { id: 58, nom: 'Quetzal guatémaltèque', symbole: 'GTQ' },
  { id: 59, nom: 'Lempira hondurien', symbole: 'HNL' },
  { id: 60, nom: 'Cordoba nicaraguayen', symbole: 'NIO' },
  { id: 61, nom: 'Leone sierra-léonais', symbole: 'SLL' },
  { id: 62, nom: 'Birr éthiopien', symbole: 'ETB' },
  { id: 63, nom: 'Gourde haïtienne', symbole: 'HTG' },
  { id: 64, nom: 'Balboa panaméen', symbole: 'PAB' },
  { id: 65, nom: 'Dollar bélizien', symbole: 'BZD' },
  { id: 66, nom: 'Boliviano bolivien', symbole: 'BOB' },
  { id: 67, nom: 'Boliviano bolivien', symbole: 'BOB' },
  { id: 68, nom: 'Kuna croate', symbole: 'HRK' },
  { id: 69, nom: 'Colon costaricien', symbole: 'CRC' },
  { id: 70, nom: 'Kuna croate', symbole: 'HRK' },
  ];

 

  return (
    <>
      <p style={{color:"white" , marginLeft:"30px"}}>Devise</p>
     <select style={{width:"220px",height:"50px", marginLeft:"30px"}} 
          onChange={(e)=>setSaveDevise(e.target.value)}
           value={saveDevise}>
          {devises.map((devise)=>
          (<option key={devise._id} > {devise.nom}</option>))}
          </select>
 </> );

  
}





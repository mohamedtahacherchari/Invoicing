import React from 'react';
import { FormControl, InputLabel, NativeSelect, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));
  export default function CustomizedSelects() {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const renderInputField = () => {
      switch(selectedOption) {
        case 'Creditor Reference (UE)':
          return (
            <TextField
            style={{marginTop:"400px"}}
              label="Creditor Reference (UE)"
              variant="outlined"
              placeholder="Ex : BC4567"
              value={inputValue}
              onChange={handleInputChange}
            />
          );
        case 'Viitenumero (Finlande)':
          return (
            <TextField
            style={{marginTop:"400px"}}
              label="Viitenumero (Finlande)"
              variant="outlined"
              placeholder="Ex : 123456789"
              value={inputValue}
              onChange={handleInputChange}
            />
          );
        case 'Communication structurée (Belgique)':
          return (
            <TextField
            style={{marginTop:"400px"}}
              label="Communication structurée (Belgique)"
              variant="outlined"
              placeholder="Ex : +++123/4567/890++"
              value={inputValue}
              onChange={handleInputChange}
            />
          );
        default:
          return null;
      }
    };
  
    return (
      <div>
        <FormControl style={{marginTop:"400px"}}>
          <InputLabel htmlFor="demo-customized-select-native">
            Select a payment option
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option aria-label="None" value="" />
            <option value="Creditor Reference (UE)">Creditor Reference (UE)</option>
            <option value="Viitenumero (Finlande)">Viitenumero (Finlande)</option>
            <option value="Communication structurée (Belgique)">Communication structurée (Belgique)</option>
          </NativeSelect>
        </FormControl>
        {renderInputField()}
      </div>
    );
  }

  /*
  export default function CustomizedSelects({paiement, setPaiement,paiement2, setPaiement2,
  creditorReference, setCreditorReference,viitenumero,setViitenumero,communicationStructuree,
  setCommunicationStructuree}) {
  //const [paiement, setPaiement] = React.useState('');

 console.log(paiement)
  const handleChange = (event) => {
    setPaiement(event.target.value);
  };

  const handleCreditorReferenceChange = (event) => {
    setCreditorReference(event.target.value);
  };

  const handleViitenumeroChange = (event) => {
    setViitenumero(event.target.value);
  };

  const handleCommunicationStructureeChange = (event) => {
    setCommunicationStructuree(event.target.value);
  };

  let textField;

  switch (paiement) {
    case 10:
      textField = (
        <TextField
          id="creditor-reference"
          label=""
          variant="outlined"
          placeholder="Ex : BC4567"
          style={{marginLeft:"44px", width:"250px"}}
          value={creditorReference}
          onChange={handleCreditorReferenceChange}
        />
      );
      
      break;
    case 20:
      textField = (
        <TextField
          id="viitenumero"
          label=""
          variant="outlined"
          placeholder="Ex : 1234567890123456"
          style={{marginLeft:"44px", width:"250px"}}
          value={viitenumero}
          onChange={handleViitenumeroChange}
        />
      );
      break;
    case 30:
      textField = (
        <TextField
          id="communication-structuree"
          label=""
          variant="outlined"
          placeholder="Ex : +++123/4567/89012+++"
          style={{marginLeft:"44px", width:"250px"}}
          value={communicationStructuree}
          onChange={handleCommunicationStructureeChange}
        />
      );
      break;
    default:
      textField = null;
  }

  return (
    <div>
    <FormControl  
    style={{marginBottom:"37px", width:"180px", marginLeft:"0px", height:"60px"}}>
      <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
      <table>
        <tbody>
          <td> <NativeSelect
        id="demo-customized-select-native"
        value={paiement}
        onChange={handleChange}
        input={<BootstrapInput />}
        style={{width:"200px"}}
      >
   
        <option value={10}>Creditor Reference (UE)</option>
        <option value={20}>Viitenumero (Finlande)</option>
        <option value={30}>Communication structurée (Belgique)</option>
      </NativeSelect></td>
          <td>{textField}</td>
        </tbody>
      </table>
     
     
    </FormControl>
  </div>

  );
}
  
  
  
  */



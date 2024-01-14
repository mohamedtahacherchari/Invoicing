import {combineReducers} from 'redux'
import auth from './authReducer'
import users from './usersReducer'
import token from './tokenReducer'
import softSkills from './softskillReducer'
import hardSkills from './hardskillReducer'
import candidats from './candidatReducer'
import process from './processReducer'
import processidReducer from './processidReducer'
import client from './clientReducer'
import clientfs from './zervantReducers/ClientfReducer'
import products from './zervantReducers/ProductReducer'
import factures from './zervantReducers/FactureReducer'
import facturesAdmin from './zervantReducers/FactureReducerAdmin'
import devisAdmin from './zervantReducers/DevisReducerAdmin'
import productAdmin from './zervantReducers/ProductReducerAdmin'
import clientAdmin from './zervantReducers/ClientReducerAdmin'


import devis from './zervantReducers/DevisReducer'



import {

    clientfUpdateReducer,
    clientfDetailsReducer,
    clientfCreateReducer,
    clientfListReducer
}
from './zervantReducers/ClientfReducer'
import {

    productUpdateReducer,
    productDetailsReducer,
    productCreateReducer,
    productListReducer
}
from './zervantReducers/ProductReducer'
import {

    factureUpdateReducer,
    factureDetailsReducer,
    factureCreateReducer,
    factureListReducer,
    factureLastTotalReducer,
    envoyerMailSansRemiseReducer,
    envoyerMailAvecRemiseTotalEnPourcentageReducer,
    envoyerMailAvecRemiseTotalEnDeviseReducer,
    envoyerMailAvecRemiseParLigneEnPourcentageReducer,
    envoyerMailAvecRemiseParLigneEnDeviseReducer
}
from './zervantReducers/FactureReducer'
import {

    devisUpdateReducer,
    devisDetailsReducer,
    devisCreateReducer,
    devisListReducer,
    envoyerMailSansRemiseReducer2,
    envoyerMailAvecRemiseTotalEnPourcentageReducer2,
    envoyerMailAvecRemiseTotalEnDeviseReducer2,
    envoyerMailAvecRemiseParLigneEnPourcentageReducer2,
    envoyerMailAvecRemiseParLigneEnDeviseReducer2
    
}
from './zervantReducers/DevisReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
  } from './zervantReducers/UserReducer'

export default combineReducers({
    auth,
    users,
    token,
    softSkills,
    hardSkills,
    candidats,
    process,
    client,
    processidReducer,
    clientfs,
    clientAdmin,
    clientfUpdate: clientfUpdateReducer,
    clientfDetails : clientfDetailsReducer,
    clientfCreate: clientfCreateReducer,
    clientfList :  clientfListReducer,
    products,
    productAdmin,
    productUpdate: productUpdateReducer,
    productDetails : productDetailsReducer,
    productCreate: productCreateReducer,
    productList :  productListReducer,
    factures,
    facturesAdmin,
    factureUpdate: factureUpdateReducer,
    factureDetails : factureDetailsReducer,
    factureCreate: factureCreateReducer,
    factureList : factureListReducer,
    devis,
    devisAdmin,
    devisUpdate: devisUpdateReducer,
    devisDetails : devisDetailsReducer,
    devisCreate: devisCreateReducer,
    devisList : devisListReducer,
    userLogin : userLoginReducer,
    userRegister:  userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList : userListReducer,
    userDelete: userDeleteReducer,
    userUpdate:userUpdateReducer,
    factureLastTotal: factureLastTotalReducer,
    envoyerMailSansRemise :envoyerMailSansRemiseReducer,
    envoyerMailAvecRemiseTotalEnPourcentage :envoyerMailAvecRemiseTotalEnPourcentageReducer,
    envoyerMailAvecRemiseTotalEnPourcentage :envoyerMailAvecRemiseTotalEnDeviseReducer,
    envoyerMailAvecRemiseParLigneEnPourcentage: envoyerMailAvecRemiseParLigneEnPourcentageReducer,
    envoyerMailAvecRemiseParLigneEnDevise: envoyerMailAvecRemiseParLigneEnDeviseReducer,
    envoyerMailSansRemise : envoyerMailSansRemiseReducer2,
    envoyerMailAvecRemiseTotalEnPourcentage :envoyerMailAvecRemiseTotalEnPourcentageReducer2,
    envoyerMailAvecRemiseTotalEnDevise :envoyerMailAvecRemiseTotalEnDeviseReducer2,
    envoyerMailAvecRemiseParLigneEnPourcentage :envoyerMailAvecRemiseParLigneEnPourcentageReducer2,
    envoyerMailAvecRemiseParLigneEnDevise : envoyerMailAvecRemiseParLigneEnDeviseReducer2

})





















import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import axios from "axios";
import {useSelector} from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Routes, Route } from 'react-router-dom'
import Coordonnees from './Zervant/Coordonnees'
import { useNavigate } from 'react-router-dom';

const pages = ['ACCUEIL', 'CLIENTS', 'PRODUITS','FACTURES','DEVIS' ,'UTILISATEURS'];
const settings = ['PREMIUM', 'AIDE', 'MON COMPTE', 'DECONNECTION'];
const axiosInstance = axios.create({
  baseURL : process.env.REACT_APP_SERVER_URL,
});
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const auth = useSelector(state => state.auth)
  const {user} = auth
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  
const logoutHandler = async () => {
  try {
      await axios.get('/api/user/logout')
      localStorage.removeItem('firstLogin')
      window.location.reload(false);
      window.location.href = "/";
  } catch (err) {
      //window.location.href = "/";
      console.log(err)
  }
  //window.location.reload()
}

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
console.log(user.role)
  return (

    <AppBar position="static" style={{ backgroundColor: 'white' }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href= "/inv/accueil"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <img
            src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661343478/logo/logo_xc49qh.png"
            height="25px"
            width="250px"
            alt="logo"
            sx={{
              display: 'flex',
              ml: -5
            }}
          />
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="black"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">

              <div style={{ display: "flex", flexDirection: "column" }}>
  <Button onClick={() => navigate("/inv/accueil")} sx={{ my: 2, color: 'black' }}>ACCUEIL</Button>
  <Button onClick={() => navigate("/inv/CLIENTS")} sx={{ my: 2, color: 'black' }}>CLIENTS</Button>
  <Button onClick={() => navigate("/inv/product")} sx={{ my: 2, color: 'black' }}>PRODUITS</Button>
  <Button onClick={() => navigate("/inv/facture")} sx={{ my: 2, color: 'black' }}>FACTURES</Button>
  <Button onClick={() => navigate("/inv/devis")} sx={{ my: 2, color: 'black' }}>DEVIS</Button>
  <Button onClick={() => navigate("/inv/chats")} sx={{ my: 2, color: 'black' }}>Chats</Button>
{user.role==1 &&  <Button onClick={()=>navigate('/inv/users')} sx={{ my: 2, color: 'black' }}>UTILISATEURS</Button>
}  <Button onClick={()=>navigate('/inv/myprofile')} sx={{ my: 2, color: 'black' }}>MON COMPTE</Button>
  <Button onClick={logoutHandler} sx={{ my: 2, color: 'black' }}>DECONNEXION</Button>
</div>
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'black',
            textDecoration: 'none',
          }}
        >

<img
            src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661343478/logo/logo_xc49qh.png"
            height="25px"
            width="250px"
            alt="logo"
            sx={{
              display: 'flex',
              ml: -5
            }}
          />
        </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
    <Button
      onClick={() => navigate("/inv/accueil")}
      sx={{ my: 2, color: 'black' }}
    >
      ACCUEIL
    </Button>
    <Button
      onClick={() => navigate("/inv/CLIENTS")}
      sx={{ my: 2, color: 'black' }}
    >
      CLIENTS
    </Button>
    <Button
      onClick={() => navigate("/inv/product")}
      sx={{ my: 2, color: 'black' }}
    >
      PRODUITS
    </Button>
    <Button
      onClick={() => navigate("/inv/facture")}
      sx={{ my: 2, color: 'black' }}
    >
      FACTURES
    </Button>
    <Button
      onClick={() => navigate("/inv/devis")}
            sx={{ my: 2, color: 'black' }}
          >
            DEVIS
    </Button>

    <Button
      onClick={() => navigate("/inv/chats")}
            sx={{ my: 2, color: 'black' }}
          >
Chats          </Button>
        {user.role===1 &&  <Button
            
            onClick={()=>navigate('/inv/users')}
            sx={{ my: 2, color: 'black' }}
          >
           UTILISATEURS
          </Button>}
                    
            <Button 
          onClick={()=>navigate('/inv/myprofile')}
            sx={{ my: 2, color: 'black' ,marginLeft:"100px"}}>MON COMPTE</Button>
         
<Button onClick={logoutHandler}
sx={{ my: 2, color: 'black' }}>
         DECONNEXION</Button>

      </Box>
      </Toolbar>
    <Box
       
        >
            <Routes>
      <Route path='/inv/coordonnees' element={<Coordonnees/>} />
          </Routes>
        </Box>
  </Container>
</AppBar>

  );
}
export default ResponsiveAppBar;
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FixItNow
        </Typography>
        <Button component={Link} to="/login" color="inherit">Services</Button>
        <Button component={Link} to="/about" color="inherit">About</Button>
        <Button component={Link} to="/contact" color="inherit">
  Contact
</Button>
        <Button variant="contained" component={Link} to="/login">Book a Service</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

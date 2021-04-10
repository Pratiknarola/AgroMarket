import {useState,useEffect} from 'react'
import clsx from 'clsx';
import axios from 'axios'
import {CssBaseline,Drawer,AppBar,Toolbar,List,Typography,IconButton,Container,ListItem,Grid,ListItemText} from '@material-ui/core'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import useStyles from './styles'
import {useHistory,Link} from 'react-router-dom'

const Dashboard = ({setUser}) => {
   // const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzBiMWY3ODllYmFmMTBhOGM0NTA3NyIsImlhdCI6MTYxNzk5OTA1OSwiZXhwIjoxNjE4MDg1NDU5fQ.OBjtP3SotKqM73h7msDmGVEm0dYZ5YYb9NXSakdQ10Y'
    const classes = useStyles();
    let history = useHistory();

    

    

    const logout=()=>{
       localStorage.clear()
       setUser(null)
        history.push('/')
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <List style={{display:'flex'}}>


<ListItem button color='inherit' component={Link} to='/profile'>
  <ListItemText style={{color:'inherit'}}>
    Profile
  </ListItemText>
</ListItem>

<ListItem button color='inherit' component={Link} to='/admin'>
  <ListItemText>
    AddCrop
  </ListItemText>
</ListItem>

<ListItem button color='inherit' component={Link} to='/auction'>
  <ListItemText>
    Auction
  </ListItemText>
</ListItem>
<ListItem button color='inherit' component={Link} to='/addcrop'>
  <ListItemText>
    createAuc
  </ListItemText>
</ListItem>
</List>
            <IconButton color="inherit" onClick={logout}>
                <ExitToAppRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
       
      </div>
    );
}

export default Dashboard

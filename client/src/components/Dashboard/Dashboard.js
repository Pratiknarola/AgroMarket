import {useState,useEffect} from 'react'
import clsx from 'clsx';
import {CssBaseline,Drawer,AppBar,Toolbar,List,Typography,Divider,IconButton,Badge,Container,Paper,Link,Grid} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import { mainListItems } from './ListItems';
import useStyles from './styles'
import {useHistory} from 'react-router-dom'
import Tile from './Tile'

const Dashboard = ({setUser}) => {

    const classes = useStyles();
    let history = useHistory();
    const [open, setOpen] = useState(true);

    const [crops,setCrops] = useState([
      {
      name:'wheat',
      quantity:100,
      bidPrice:1000,
      startingTime:{
        hh:13,
        mm:40
      }
    },
    {
      name:'rice',
      quantity:200,
      bidPrice:5000,
      startingTime:{
        hh:13,
        mm:50
      }
    },
    {
      name:'mustard',
      quantity:50,
      bidPrice:2000,
      startingTime:{
        hh:14,
        mm:0
      }
    }
  
  
  ])

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const logout=()=>{
       localStorage.clear()
       setUser(null)
        history.push('/')
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={logout}>
                <ExitToAppRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>

          <Grid Container>
     
             {crops.map((crop)=><Tile   crop={crop} />)}
          </Grid>

          </Container>
        </main>
      </div>
    );
}

export default Dashboard

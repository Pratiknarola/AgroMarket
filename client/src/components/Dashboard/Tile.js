import {useState,useEffect} from 'react'
import {Grid,Card,CardContent,Typography,Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core'
import Countdown from 'react-countdown';

const Completionist = () => <span>You are good to go!</span>;
var d = new Date();
let timer=0;


const Tile = ({crop}) => {
      

         const [canBid,setCanBid] = useState(true)
         const [open, setOpen] = useState(false);

         const handleClickOpen = () => {
           setOpen(true);
         };
       
         const handleClose = () => {
           setOpen(false);
         };

    const Completionist = () => <span>You are good to go!</span>;

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setCanBid(false)
          return <Completionist />;
        } else {
          return <span>{hours}:{minutes}:{seconds}</span>;
        }
      };

    const getTime=()=>{

        timer=(crop.startingTime.hh+1)*60+crop.startingTime.mm;
        let val=d.getHours()*60+d.getMinutes();
        timer-=val;
        timer*=60000
        console.log(timer)
    }



    return (
        <>
        <Grid item xs={12}>
              {getTime()}
            <Card style={{margin:'20px'}}>
                <CardContent >
                    <div style={{float:'left',paddingBottom:'20px'}}>
                    <Typography style={{fontSize:'18px',}}>
                        <strong>{crop.name}</strong>
                    </Typography>
                    <Typography>
                        quantity:{crop.quantity}
                    </Typography>
                    <Typography>
                        bid price:{crop.bidPrice}
                    </Typography>
                    </div>

                    {canBid?<Button variant='contained' color='secondary' onClick={handleClickOpen} style={{margin:'20px'}}>BID</Button>:null}
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField fullWidth variant='outlined'/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Bid
          </Button>
        </DialogActions>
      </Dialog>
                    <div style={{float:'right',margin:'30px 0px',fontSize:'25px'}}>
                        <Countdown date={Date.now() + parseInt(timer)}  autostart={true}  renderer={renderer}/>
                    </div>
                    
                </CardContent>
            </Card>
            </Grid>
        </>
    )
}

export default Tile

import {useState} from 'react'
import {Paper,Grid,Button,TextField,Container,Typography} from '@material-ui/core'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Leaderboard from './Leaderboard.js'
const BidPage = () => {
    const accessToken = JSON.parse(localStorage.getItem('profile')).accessToken;
    const {id} = useParams()
     const [bid,setBid] = useState(null);

     const handleChange = (e)=>{
         setBid(e.target.value)
     }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(bid)
        const result = await axios.get(`http://localhost:8080/api/auction/${id}`)
        console.log(result.data._id)
        try{
        const posres = await axios.post('http://localhost:8080/api/buyer/bid',
          {
            auctionid:result.data._id,
            bidprice:bid,
            time:Math.floor(Date.now()/1000)
          },
    {
        headers: {
            'x-access-token': accessToken
          }
    }
    )
        console.log(posres)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <Container component='main' maxWidth='md' style={{textAlign:'center',marginTop:'100px'}}>
            <Paper elevation={6} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Typography component='h1' variant='h5' style={{margin:'50px 10px'}}>
                Just do the bidding freely
            </Typography>
            <Grid Container >
               <form style={{margin:'10px 20px'}} onSubmit={handleSubmit}>
                   <Grid item style={{margin:'10px 0px'}} >
                    <TextField fullWidth variant='outlined' onChange={handleChange}/>
                   </Grid>
                   <Grid item>
                   <Button variant='contained' color='secondary' type='submit' style={{margin:'5px auto'}} >Bid</Button>
                   </Grid>
               </form>
            </Grid>
            <Typography component='h1' variant='h5' style={{margin:'10px'}}>
                LeaderBoard
            </Typography>
          
            </Paper>
        </Container>
    )
}

export default BidPage

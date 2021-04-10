import {useState,useEffect} from 'react'
import {Container,Grid} from '@material-ui/core'
import axios from 'axios'
import Tile from './Tile'

const Auction = () => {

    const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;

    
    const [crops,setCrops] = useState([])

   useEffect( async ()=>{
      console.log(accessToken)
      const result = await axios.get('http://localhost:8080/api/getpresentauction',{
        headers: {
          'x-access-token': accessToken
        }
      })
      setCrops(result.data)
      console.log(crops)
    },[])


    return (
          <Container maxWidth="lg" style={{marginTop:'100px'}} >
          <Grid Container>
           {crops.map((crop)=><Tile   crop={crop} />)}
          </Grid>
          </Container>
    )
}

export default Auction

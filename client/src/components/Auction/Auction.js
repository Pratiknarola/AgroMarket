import {useState,useEffect} from 'react'
import {Container,Grid,Typography,IconButton} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import axios from 'axios'
import Tile from './Tile'

const Auction = () => {

    const accessToken = JSON.parse(localStorage.getItem('profile'))?.accessToken;
        const [drop1,setDrop1] = useState(true)
    
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

    const handleClick1 = ()=>{
        setDrop1((prev)=>!prev);
    }


    return (
          <Container maxWidth="lg" style={{marginTop:'100px'}} >
              <Typography>
                  present contests
                  <IconButton size="small" color="inherit">
                      {drop1? <ArrowDropUpIcon onClick={handleClick1} />:<ArrowDropDownIcon onClick={handleClick1}/>}
      </IconButton>
                  </Typography>
          <Grid Container>
           {drop1?crops.map((crop)=><Tile   crop={crop} />):null}
          </Grid>
          </Container>
    )
}

export default Auction

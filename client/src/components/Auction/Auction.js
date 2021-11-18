import { useState, useEffect } from "react";
import React from "react";
import { Snackbar } from "@material-ui/core";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent, Button, CardActions } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import axios from "axios";
import Tile from "./Tile";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"

const Auction = () => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState(
    "you can not bid because this ia future auction"
  );
  const [drop1, setDrop1] = useState(true);
  const [drop2, setDrop2] = useState(true);
  const [drop3, setDrop3] = useState(true);
  const [crops1, setCrops1] = useState([]);
  const [crops2, setCrops2] = useState([]);
  const [crops3, setCrops3] = useState([]);

  useEffect(async () => {
    console.log(accessToken);
    const result1 = await axios.get(
      "http://localhost:8080/api/getpresentauction",
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    setCrops1(result1.data);
    console.log(crops1);
    const result2 = await axios.get(
      "http://localhost:8080/api/getfutureauction",
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    setCrops2(result2.data);
    console.log(crops2);
    const result3 = await axios.get(
      "http://localhost:8080/api/getpastauction",
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    setCrops3(result3.data);
    console.log(crops3);
  }, []);

  const handleClick1 = () => {
    setDrop1((prev) => !prev);
  };

  const handleClick2 = () => {
    setDrop2((prev) => !prev);
  };

  const handleClick3 = () => {
    setDrop3((prev) => !prev);
  };

  // create a auction display page which would have 3 droppable sections. 
  // 1. present ongoing auctions. 
  // 2. future upcoming auctions. 
  // 3. past completed auctions. 
  // if auction is in present ongoing auctions, it should show the information about the auction, 
  // which includes, description, owner name, crop name, biding price and time left before it ends. 
  // on click on present auction, it should send on leaderboard page. 
  // if auction is upcoming in future, it should show the information about the auction, 
  // which includes, description, owner name, crop name, starting bidding price and time left before it starts.
  // if auction is past, it should show the information about the auction,
  // which includes, description, owner name, crop name, starting bidding price and a text that shows its completed.
  // use the same tile for all the auctions.
  // use bootstrap for the styling

  return (
    <Container style={{marginTop: "100px"}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ margin: "20px" }}>
            Present ongoing auctions
          </Typography>
          <IconButton
            style={{ float: "right" }}
            onClick={handleClick1}
            aria-expanded={drop1}
            aria-label="show more"
          >
            {drop1 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
          <Collapse in={drop1} timeout="auto" unmountOnExit>
            <Grid container spacing={3}>
              {crops1.map((crop) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Tile crop={crop} type={"present"} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ margin: "20px" }}>
            Future upcoming auctions
          </Typography>
          <IconButton
            style={{ float: "right" }}
            onClick={handleClick2}
            aria-expanded={drop2}
            aria-label="show more"
          >
            {drop2 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
          <Collapse in={drop2} timeout="auto" unmountOnExit>
            <Grid container spacing={3}>
              {crops2.map((crop) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Tile crop={crop} type={"future"}/>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ margin: "20px" }}>
            Past completed auctions
          </Typography>
          <IconButton
            style={{ float: "right" }}
            onClick={handleClick3}
            aria-expanded={drop3}
            aria-label="show more"
          >
            {drop3 ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </IconButton>
          <Collapse in={drop3} timeout="auto" unmountOnExit>
            <Grid container spacing={3}>
              {crops3.map((crop) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Tile crop={crop} type={"past"} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={alertmsg}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Container>
  );
}

const Tile1 = (props) => {
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertmsg] = useState("");
  const [type , setType] = useState(props.type);
  
  const handleClick = () => {
    setOpen(true);
    setAlertmsg("You are now in the leaderboard");
  };

  // the tile should have following information:
  // 1. crop name
  // 2. owner name
  // 3. description
  // 4. bidding price
  // 5. time left before it ends
  // 6. if type is present, it should have a button that will send you to the leaderboard page.
  // 7. it should have timer that will count down the time left before it ends.
  // 8. if type is future, it should have a timer that will count down the time left before it starts from current time. 
  // timer will update every 1 second. 
  // when timer reaches 0 in future, it should change the type to present.
  // when timer reaches 0 in present, it should change the type to past.
  // if type is past, it should have a text that shows its completed.

  const [timeLeft, setTimeLeft] = useState(props.crop.timeLeft);

  const timer = () => {
    setTimeLeft(props.crop.timeLeft);
    setTimeout(timer, 1000);
  };

  const checkTimeLeft = () => {
    if (props.type === "present") {
      if (timeLeft <= 0) {
        props.crop.type = "past";
        props.crop.timeLeft = 0;
        props.crop.biddingPrice = props.crop.startingBiddingPrice;
      }
    } else if (props.type === "future") {
      if (timeLeft <= 0) {
        props.crop.type = "present";
        setTimeLeft(props.crop.timeLeft);
      }
    }
  };

  useEffect(() => {
    timer();

  }, [props.crop.timeLeft]);

  const canBid = () => {
    if (props.crop.timeLeft > 0) {
      return true;
    } else {
      return false;
    }
  };

  const changeType = () => {
    if (props.type === "present") {
      props.crop.type = "past";
    } else if (props.type === "future") {
      props.crop.type = "present";
    }
  };

  return (
    <div></div>

  );






  
};



export default Auction;

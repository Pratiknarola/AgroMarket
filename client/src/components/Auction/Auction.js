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
// import Tile from "./Tile";
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
  const [pastauction, setPastAuction] = useState([]);
  const [presentauction, setPresentAuction] = useState([]);
  const [futureauction, setFutureAuction] = useState([]);

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
    setPresentAuction(result1.data);
    console.log(result1.data)
    const result2 = await axios.get(
      "http://localhost:8080/api/getfutureauction",
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    setFutureAuction(result2.data);
    console.log(result2.data)
    const result3 = await axios.get(
      "http://localhost:8080/api/getpastauction",
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    setPastAuction(result3.data);
    console.log(result3.data)
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
          <Typography variant="h4" style={{ marginTop: "20px" }}>
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
              {presentauction.map((auc) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Tile auc={auc} type={"present"} key={auc.tempId} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ marginTop: "20px" }}>
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
              {futureauction.map((auc) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Tile auc={auc} type={"future"} key={auc.tempId}/>
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ marginTop: "20px" }}>
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
              {pastauction.map((auc) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Tile auc={auc} type={"past"} key={auc.tempId} />
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

const Tile = (props) => {
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
  // crop: {
  //   name: "rice",
  //   rating: 5,
  // }
  // description: "is xyz "
  // duration: 90
  // harvestdate: "2010-10-10"
  // owner: {username: "nikhar", firstname: "nikhar" lastname: "nikhar"}
  // quantity: 1000
  // startdate: 1649520804
  // startprice: 105
  // tempId: "x7k9g5ytyos"

  const calculateTimeLeft = (startdate, duration) => {
    let now = new Date().getTime() / 1000;
    let end = new Date(startdate + duration * 60).getTime();
    let timeLeft = end - now;
    console.log("total timeleft is,", timeLeft)
    let days = Math.floor(timeLeft / (60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (60 * 60 * 24)) / ( 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (60 * 60)) / (60));
    let seconds = Math.floor((timeLeft % (60)));
    return { days, hours, minutes, seconds };
  };


  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(props.auc.startdate, props.auc.duration));

  useEffect(() => {
    let interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(props.auc.startdate, props.auc.duration));
    }, 1000);
    return () => clearInterval(interval);
  }, [props.auc.startdate, props.auc.duration]);

  const showTimer = () => {
    if (type === "present") {
      return (
        <React.Fragment>
          <Typography variant="h6">
            {timeLeft.days} days {timeLeft.hours} hours{" "}
            {timeLeft.minutes} minutes {timeLeft.seconds} seconds
          </Typography>
        </React.Fragment>
      );
    } else if (type === "future") {
      return (
        <React.Fragment>
          <Typography variant="h6">
            {timeLeft.days} days {timeLeft.hours} hours{" "}
            {timeLeft.minutes} minutes {timeLeft.seconds} seconds
          </Typography>
        </React.Fragment>
      );
    } else if (type === "past") {
      return (
        <React.Fragment>
          <Typography variant="h6">
            Completed
          </Typography>
        </React.Fragment>
      );
    }
  };

  const showButton = () => {
    if (type === "present") {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{ marginTop: "10px" }}
        >
          Go to leaderboard
        </Button>
      );
    } 
  };

  // when timer reaches 0, 
  // if type was future, change it to present. and set timeleft to duration. 
  // if type was present, change it to past.
  useEffect(() => {
    if (timeLeft.seconds === 0 && timeLeft.minutes === 0 && timeLeft.hours === 0 && timeLeft.days === 0) {
      if (type === "future") {
        setType("present");
        setTimeLeft(calculateTimeLeft(props.auc.startdate, props.auc.duration));
      } else if (type === "past") {
        setType("past");
      }
    }
  }, [timeLeft.seconds, timeLeft.minutes, timeLeft.hours, timeLeft.days]);





  return (
    <Card style={{ marginTop: "10px" }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6">Crop name: {props.auc.crop?.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6">Farmer name: {props.auc.owner?.firstname}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={6}>
            <Typography variant="h6">Description: {props.auc.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="h6">Start price: {props.auc.startprice}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {showTimer()}
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            {showButton()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>


  );






  
};



export default Auction;

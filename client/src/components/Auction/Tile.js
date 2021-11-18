import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,

} from "@material-ui/core";
import Countdown from "react-countdown";

var d = new Date();
let timer = 0;

const Tile = ({ crop, tense, setOpen }) => {
  const [canBid, setCanBid] = useState(true);
  let history = useHistory();

  const handleTile = () => {
    if (tense === "future") {
      console.log("you can not bid in future auctions");
      setOpen(true);
    } else {
      if (canBid) {
        history.push(`/bidpage/${crop.tempId}`);
      } else {
        console.log("auction ended");
      }
    }
  };

  const Completionist = () => <span>Auction Completed!</span>;

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setCanBid(false);
      return <Completionist />;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const getTime = () => {
    timer = crop.startdate + crop.duration * 60;
    let abhi = Math.floor(Date.now() / 1000);
    timer -= abhi;
    timer *= 1000;
  };

  return (
    <>
      <Grid item xs={12}>
        {getTime()}
        <Card style={{ margin: "20px" }} onClick={handleTile}>
          <CardContent>
            <div style={{ float: "left", paddingBottom: "20px" }}>
              <Typography style={{ fontSize: "18px" }}>
                <strong>{crop.description}</strong>
              </Typography>
              <Typography>quantity:{crop.quantity}</Typography>
              <Typography>bid price:{crop.startprice}</Typography>
            </div>

            <div
              style={{ float: "right", margin: "30px 0px", fontSize: "25px" }}
            >
              <Countdown
                date={Date.now() + parseInt(timer)}
                autostart={true}
                renderer={renderer}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Tile;

import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  IconButton,
  Collapse,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import axios from "axios";
import Tile from "./Tile";

const Auction = () => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const [open, setOpen] = useState(false);
  const [alertmsg, setAlertMsg] = useState(
    "you can not bid b'coz this ia future auction"
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

  return (
    <>
      <Container maxWidth="lg" style={{ marginTop: "100px" }}>
        <Typography>
          Present Auction
          <IconButton size="small" color="inherit">
            {drop1 ? (
              <ArrowDropUpIcon onClick={handleClick1} />
            ) : (
              <ArrowDropDownIcon onClick={handleClick1} />
            )}
          </IconButton>
        </Typography>
        <Grid Container>
          {drop1 ? crops1.map((crop) => <Tile crop={crop} />) : null}
        </Grid>
      </Container>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography>
          Future Auction
          <IconButton size="small" color="inherit">
            {drop2 ? (
              <ArrowDropUpIcon onClick={handleClick2} />
            ) : (
              <ArrowDropDownIcon onClick={handleClick2} />
            )}
          </IconButton>
        </Typography>
        <Grid Container>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {alertmsg}
            </Alert>
          </Collapse>
          {drop2
            ? crops2.map((crop) => (
                <Tile crop={crop} tense="future" setOpen={setOpen} />
              ))
            : null}
        </Grid>
      </Container>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography>
          Past Auction
          <IconButton size="small" color="inherit">
            {drop3 ? (
              <ArrowDropUpIcon onClick={handleClick3} />
            ) : (
              <ArrowDropDownIcon onClick={handleClick3} />
            )}
          </IconButton>
        </Typography>
        <Grid Container>
          {drop3 ? crops3.map((crop) => <Tile crop={crop} />) : null}
        </Grid>
      </Container>
    </>
  );
};

export default Auction;

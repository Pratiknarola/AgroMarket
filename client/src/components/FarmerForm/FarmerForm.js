import { React, useState } from "react";
import { RaisedButton, TextField } from "material-ui";
import { MuiThemeProvider } from "material-ui/styles";
import axios from "axios";
// import BasicDateTimePicker from './DateTimePicker';
import { styles } from "@material-ui/lab/internal/pickers/PickersArrowSwitcher";

const FarmerForm = () => {
  const [alertmsg, setAlertMsg] = useState("");
  const [open, setOpen] = useState(false);
  var state = {
    startdateday: 0,
    startdatemonth: 0,
    startdateyear: 0,
    startdatehour: 0,
    startdateminute: 0,
    startdatesecond: 0,
    startdate: 0,
    durationhour: 0,
    durationminute: 0,
    durationsecond: 0,
    duration: 0,
    harvestdateday: 0,
    harvestdatemonth: 0,
    harvestdateyear: 0,
    harvestdate: 0,
    quantity: 0,
    description: 0,
    startprice: 0,
  };
  var handleChange;
  // var handleDateValues;
  handleChange = (input) => (event) => {
    state[input] = event.target.value;
    console.log(input + event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const suc = await axios.post("", {
        //TODO: Add address here like : "localhost:3000/api/farmer/createauction"
        startdate: state.startdate,
        duration: state.duration,
        harvestdate: state.harvestdate,
        quantity: state.quantity,
        description: state.description,
        startprice: state.startprice,
      });
      console.log(suc);
      setAlertMsg("Auction Successfully Registered");
    } catch (error) {
      setAlertMsg(error.response?.data.message);
    }
    setOpen(true);
  };

  // handleDateValues = (name, date) =>{
  //     state[name] = date;
  //     console.log(name + date + state[name]);
  // }

  var submit = (e) => {
    console.debug(state);

    state["startdate"] = new Date(
      state["startdateyear"],
      state["startdatemonth"],
      state["startdateday"],
      state["startdatehour"],
      state["startdateminute"],
      state["startdatesecond"]
    );
    state["duration"] =
      parseInt(state["durationhour"] * 60) + parseInt(state["durationminute"]);
    state["harvestdate"] = new Date(
      state["harvestdatemonth"] +
        " " +
        state["harvestdateday"] +
        " " +
        state["harvestdateyear"]
    );

    console.log(state);
    handleSubmit(e);
  };
  return (
    <MuiThemeProvider>
      <center>
        <>
          <br />
          <h1 style={{ marginTop: 50 }}>Farmer Form</h1>
          <br />
          <div>Start Date </div>
          {/* {BasicDateTimePicker('Start Date', state['startdate'], handleDateValues, 'startdate')} */}
          <TextField
            style={{ width: 30, margin: 5 }}
            floatingLabelText="Day"
            onChange={handleChange("startdateday")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Month"
            onChange={handleChange("startdatemonth")}
          />
          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="year"
            onChange={handleChange("startdateyear")}
          />
          <br />
          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="Hour"
            onChange={handleChange("startdatehour")}
            type={Number}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Minute"
            onChange={handleChange("startdateminute")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Second"
            onChange={handleChange("startdatesecond")}
          />
          <br />
          <div style={{ marginTop: 20, marginBottom: -10 }}>Duration</div>

          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="Hour"
            onChange={handleChange("durationhour")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Minute"
            onChange={handleChange("durationminute")}
          />
          <br />
          {/* {BasicDateTimePicker('Duration', state['duration'], handleDateValues, 'duration')} */}

          <div style={{ marginTop: 20, marginBottom: -5 }}>Harvest Date</div>
          <TextField
            style={{ width: 30, margin: 5 }}
            floatingLabelText="Day"
            onChange={handleChange("harvestdateday")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Month"
            onChange={handleChange("harvestdatemonth")}
          />
          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="year"
            onChange={handleChange("harvestdateyear")}
          />
          <br />

          {/* {BasicDateTimePicker('Harvest Date', state['harvestdate'], handleDateValues, 'harvestdate')} */}
          <br />
          <TextField
            hintText="Enter Quantity"
            floatingLabelText="Quantity"
            onChange={handleChange("quantity")}
          />
          <br />
          <TextField
            hintText="Enter Description"
            floatingLabelText="Description"
            onChange={handleChange("description")}
          />
          <br />
          <TextField
            hintText="Enter Start bid Price"
            floatingLabelText="Starting Bid Price"
            onChange={handleChange("startprice")}
          />
          <br />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={styles.button}
            onClick={submit}
          />
        </>
      </center>
    </MuiThemeProvider>
  );
};

export default FarmerForm;

import { Component, React, useState } from "react";
import { RaisedButton, TextField } from "material-ui";
import { MuiThemeProvider } from "material-ui/styles";
import axios from "axios";
// import BasicDateTimePicker from './DateTimePicker';
import { styles } from "@material-ui/lab/internal/pickers/PickersArrowSwitcher";

class FarmerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertmsg: "",
      open:false,
      cropslist:[]
    };

    this.states = {
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

    this.user = this.props.user;

    this.accessToken = JSON.parse(localStorage.getItem("profile")).accessToken;

  }

  componentDidMount() {
    console.log(this.user);
    axios.get(
      `http://localhost:8080/api/farmer/getcrop/${this.user.username}`,
      {
        headers: {
          "x-access-token": this.accessToken,
        },
      }
    ).then((response) => {
      let cropslist = response.data.crops.map(function(crop){
        let x = {};
        x["name"]=crop.name;
        x["rating"]=crop.rating;
        return x;
      });
      this.setState({cropslist:cropslist});
      console.log(cropslist);
      console.log(this.state.cropslist);
  });}
  
  // var handleDateValues;
  handleChange = (input) => (event) => {
    this.states[input] = event.target.value;
    console.log(input + event.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const suc = await axios.post("", {
        //TODO: Add address here like : "localhost:3000/api/farmer/createauction"
        startdate: this.states.startdate,
        duration: this.states.duration,
        harvestdate: this.states.harvestdate,
        quantity: this.states.quantity,
        description: this.states.description,
        startprice: this.states.startprice,
      });
      console.log(suc);
      this.setAlertMsg("Auction Successfully Registered");
    } catch (error) {
      this.setAlertMsg(error.response?.data.message);
    }
    this.setOpen(true);
  };


  submit = (e) => {
    console.debug(this.states);

    this.states["startdate"] = new Date(
      this.states["startdateyear"],
      this.states["startdatemonth"],
      this.states["startdateday"],
      this.states["startdatehour"],
      this.states["startdateminute"],
      this.states["startdatesecond"]
    );
    this.states["duration"] =
      parseInt(this.states["durationhour"] * 60) + parseInt(this.states["durationminute"]);
    this.states["harvestdate"] = new Date(
      this.states["harvestdatemonth"] +
        " " +
        this.states["harvestdateday"] +
        " " +
        this.states["harvestdateyear"]
    );

    console.log(this.states);
    this.handleSubmit(e);
  };
  render() { 
    return(
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
            onChange={this.handleChange("startdateday")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Month"
            onChange={this.handleChange("startdatemonth")}
          />
          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="year"
            onChange={this.handleChange("startdateyear")}
          />
          <br />
          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="Hour"
            onChange={this.handleChange("startdatehour")}
            type={Number}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Minute"
            onChange={this.handleChange("startdateminute")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Second"
            onChange={this.handleChange("startdatesecond")}
          />
          <br />
          <div style={{ marginTop: 20, marginBottom: -10 }}>Duration</div>

          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="Hour"
            onChange={this.handleChange("durationhour")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Minute"
            onChange={this.handleChange("durationminute")}
          />
          <br />
          {/* {BasicDateTimePicker('Duration', state['duration'], handleDateValues, 'duration')} */}

          <div style={{ marginTop: 20, marginBottom: -5 }}>Harvest Date</div>
          <TextField
            style={{ width: 30, margin: 5 }}
            floatingLabelText="Day"
            onChange={this.handleChange("harvestdateday")}
          />
          <TextField
            style={{ width: 50, margin: 5 }}
            floatingLabelText="Month"
            onChange={this.handleChange("harvestdatemonth")}
          />
          <TextField
            style={{ width: 40, margin: 5 }}
            floatingLabelText="year"
            onChange={this.handleChange("harvestdateyear")}
          />
          <br />

          {/* {BasicDateTimePicker('Harvest Date', state['harvestdate'], handleDateValues, 'harvestdate')} */}
          <br />
          <TextField
            hintText="Enter Quantity"
            floatingLabelText="Quantity"
            onChange={this.handleChange("quantity")}
          />
          <br />
          <TextField
            hintText="Enter Description"
            floatingLabelText="Description"
            onChange={this.handleChange("description")}
          />
          <br />
          <TextField
            hintText="Enter Start bid Price"
            floatingLabelText="Starting Bid Price"
            onChange={this.handleChange("startprice")}
          />
          <br />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={styles.button}
            onClick={this.submit}
          />
        </>
      </center>
    </MuiThemeProvider>
  );
  }
};

export default FarmerForm;

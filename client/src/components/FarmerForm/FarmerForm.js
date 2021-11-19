import { Component, React, useState, useEffect } from "react";
import { RaisedButton, TextField } from "material-ui";
import { MuiThemeProvider } from "material-ui/styles";
import axios from "axios";
// import BasicDateTimePicker from './DateTimePicker';
import { styles } from "@material-ui/lab/internal/pickers/PickersArrowSwitcher";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// create a functional component for following class based component
// it should return a form with following fields: 
// crop name as a dropdown list using croplist array
// start date and time as a react datetime picker with past datetime disabled
// a numeric field for duration in hours and minutes using a slider
// a date picker for the harvest date and time with future datetime disabled
// a numeric field for quantity in kg
// a text field for description
// a numeric field for start price in Rs with non negative value restriction
// a button to submit the form and a button to reset the form
// the state would contain : 
// crop name, start date and time, duration, harvest date and time, quantity, description, start price
// the submit button would be disabled if any of the fields are empty or if the start date and time is in the past
// use bootstrap for styling
  

class FarmerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertmsg: "",
      open:false,
      cropslist:[],
    };

    this.states = {
      startdate: new Date(),
      // startdateday: 0,
      // startdatemonth: 0,
      // startdateyear: 0,
      // startdatehour: 0,
      // startdateminute: 0,
      // startdatesecond: 0,
      // startdate: 0,
      durationhour: 0,
      durationminute: 0,
      durationsecond: 0,
      duration: 0,
      harvestdate: 0,
      quantity: 0,
      description: 0,
      startprice: 0,
      selectedcrop: ""
    };

    this.user = this.props.user;
    this.username = this.props.username

    this.accessToken = JSON.parse(localStorage.getItem("profile")).accessToken;

  }

  componentDidMount() {
    console.log("in component did mount user is", this.username);
    axios.get(
      `http://localhost:8080/api/farmer/getcrop/${this.props.username}`,
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
        x['id']= crop._id;
        return x;
      })
      this.setState({cropslist:cropslist});
      console.log(cropslist);
      console.log(this.state.cropslist);
  }).catch((error) => {
    //reload page
    console.log(error);
  });
  ;}
  
  // var handleDateValues;
  handleChange = (input) => (event) => {
    this.states[input] = event.target.value;
    console.log(input + event.target.value);
  };

  // if this.state.alertmsg is updated, then the alert will be shown
  // if this.state.alertmsg is not updated, then the alert will be hidden
  componentDidUpdate() {
    if (this.state.alertmsg !== "") {
      alert(this.state.alertmsg);
      this.setState({ alertmsg: "" });
    }
  }


  

  handleSubmit = async (e) => {
    // check if any of the fields are empty
    // if any of the fields are empty, show an alert message
    // if all the fields are filled, submit the form

    if (this.state.cropname === "") {
      this.setState({ alertmsg: "Please select a crop" });
      this.setState({ open: true });
    } else if (this.states.startdate === "") {
      this.setState({ alertmsg: "Please select a start date" });
      this.setState({ open: true });
    } else if (this.states.duration === "") {
      this.setState({ alertmsg: "Please select a duration" });
      this.setState({ open: true });
    } else if (this.states.harvestdate === "") {
      this.setState({ alertmsg: "Please select a harvest date" });
      this.setState({ open: true });
    } else if (this.states.quantity === "") {
      this.setState({ alertmsg: "Please enter a quantity" });
      this.setState({ open: true });
    } else if (this.states.description === "") {
      this.setState({ alertmsg: "Please enter a description" });
      this.setState({ open: true });
    } else if (this.states.startprice === "") {
      this.setState({ alertmsg: "Please enter a start price" });
      this.setState({ open: true });
    }
    e.preventDefault();
    try {
      const suc = await axios.post("http://localhost:8080/api/farmer/createauction", {
        //TODO: Add address here like : "localhost:3000/api/farmer/createauction"
        startdate: this.states.startdate,
        duration: this.states.duration,
        harvestdate: this.states.harvestdate,
        quantity: this.states.quantity,
        description: this.states.description,
        startprice: this.states.startprice,
        crop: this.states.selectedcrop,
      }, 
      {
        headers: {
          "x-access-token": this.accessToken,
        },
      });
      console.log(suc);
      this.setState({ alertmsg: "Auction created successfully" });
      console.log("Auction Successfully Registered");
    } catch (error) {
      this.setState({ alertmsg: "Auction not created" });
      console.log(error.response?.data.message);
    }
    this.setState({ open: true });
  };


  submit = (e) => {
    console.debug(this.states);
    // check if start date is in past. or harvest date is in future
    // if so, return with error 
    // if not, submit the form



    if (new Date(this.states.startdate) < new Date()) {
      this.setState({ alertmsg: "Start date cannot be in the past" });
      this.setState({ open: true });
    } else if (new Date(this.states.harvestdate) > new Date()) {
      this.setState({ alertmsg: "Harvest date cannot be in the future" });
      this.setState({ open: true });
    } else {
      this.states["duration"] =
      parseInt(this.states["durationhour"] * 60) + parseInt(this.states["durationminute"]);
    
    console.log(this.states);
    this.handleSubmit(e);
    }
    
  };

  // use the bootstrap classes and styles to create the following ui form
  render() {  
    return(
    <MuiThemeProvider>
      <div className="container" style={containerStyle}>
          <br />
          <h1 style={{ marginTop: 70 }}>Farmer Form</h1>
          <br />
          <form onSubmit={this.submit}>
            <div className="form-group p-2 ">
              <label>Crop</label>
              <select
                className="form-control"
                onChange={this.handleChange("selectedcrop")}
              >
                <option value="">Select Crop</option>
                {this.state.cropslist.map((crop) => (
                  <option value={crop.id} key={crop.id}>{crop.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group p-2 ">
              <label>Start Date</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
              <TextField
                id="datetime-local"
                label="Start date"
                type="datetime-local"
                defaultValue= {new Date().toLocaleDateString()}
                onChange={(e) => {this.states.startdate = e.target.value}}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                  min: new Date().toISOString().slice(0, 16),
                }}
              />
              </Stack>
              </LocalizationProvider>
            </div>
            <div className="form-group p-2 ">
              <label>Duration</label>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="23"
                    placeholder="Hour"
                    onChange={this.handleChange("durationhour")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Minute"
                    min="0"
                    max="59"
                    onChange={this.handleChange("durationminute")}
                  />
                </div>
                
              </div>
            </div>
            <div className="form-group p-2 ">
              <label>Harvest Date</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
              <TextField
                id="date-local"
                label="Harvest date"
                type="date"
                defaultValue= {new Date().toLocaleDateString()}
                onChange={this.handleChange("harvestdate")}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                  max: new Date().toISOString().slice(0, 10),
                }}
              />
              </Stack>
              </LocalizationProvider>
            </div>
            <div className="form-group p-2 ">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                onChange={this.handleChange("quantity")}
              />
            </div>
            <div className="form-group p-2 ">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                onChange={this.handleChange("description")}
              />
            </div>
            <div className="form-group p-2 ">
              <label>Start Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="Start Price"
                onChange={this.handleChange("startprice")}
              />
            </div>
          {/* end form here */}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.submit}
          >
            Submit
          </button>
         
        </form>
    </div>
    </MuiThemeProvider>
  );
  }
};

export default FarmerForm;


// children should be in center
// round light gray borders 

const containerStyle = {
  marginBottom: "20px",
  padding: "20px",
  borderRadius: "5px",
  border: "1px solid lightgray",
  backgroundColor: "white",
};
import { Component, React, useState } from "react";
import { RaisedButton, TextField } from "material-ui";
import { MuiThemeProvider } from "material-ui/styles";
import axios from "axios";
// import BasicDateTimePicker from './DateTimePicker';
import { styles } from "@material-ui/lab/internal/pickers/PickersArrowSwitcher";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
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

  handleSubmit = async (e) => {
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

    this.states["startdate"] = 
      this.states["startdateyear"] + "-" +
      this.states["startdatemonth"] +"-" + 
      this.states["startdateday"] + "T" + 
      this.states["startdatehour"] + ":" + 
      this.states["startdateminute"] + ":" +
      this.states["startdatesecond"]
    this.states["duration"] =
      parseInt(this.states["durationhour"] * 60) + parseInt(this.states["durationminute"]);
    this.states["harvestdate"] = +
      this.states["harvestdateyear"] + "-" +  this.states["harvestdatemonth"] + "-" +this.states["harvestdateday"]

    console.log(this.states);
    this.handleSubmit(e);
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
                  <option value={crop.id}>{crop.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group p-2 ">
              <label>Start Date</label>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Day"
                    onChange={this.handleChange("startdateday")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Month"
                    onChange={this.handleChange("startdatemonth")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Year"
                    onChange={this.handleChange("startdateyear")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Hour"
                    onChange={this.handleChange("startdatehour")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Minute"
                    onChange={this.handleChange("startdateminute")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Second"
                    onChange={this.handleChange("startdatesecond")}
                  />
                </div>
              </div>
            </div>
            <div className="form-group p-2 ">
              <label>Duration</label>
              <div className="row">
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Hour"
                    onChange={this.handleChange("durationhour")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Minute"
                    onChange={this.handleChange("durationminute")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Second"
                    onChange={this.handleChange("durationsecond")}
                  />
                </div>
              </div>
            </div>
            <div className="form-group p-2 ">
              <label>Harvest Date</label>
              <div className="row">
              <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Day"
                    onChange={this.handleChange("harvestdateday")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Month"
                    onChange={this.handleChange("harvestdatemonth")}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Year"
                    onChange={this.handleChange("harvestdateyear")}
                  />
                </div>
              </div>
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
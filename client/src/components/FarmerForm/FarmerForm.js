import React from 'react'
import { RaisedButton, TextField } from 'material-ui';
import { MuiThemeProvider } from 'material-ui/styles';
import BasicDateTimePicker from './DateTimePicker';
import { styles } from '@material-ui/lab/internal/pickers/PickersArrowSwitcher';

const FarmerForm = () => {
    var state ={
        'startdate' : "",
        'duration' : "",
        'harvestdate': "",
        'quantity' : '',
        'description': '',
        'startprice' : ''
    }
    var handleChange;
    var handleDateValues;
    handleChange = input => (event) =>{
        state[input] = event.target.value;
        console.log(input + event.target.value);
    }

    handleDateValues = (name, date) =>{
        state[name] = date;
        console.log(name + date + state[name]);
    }

    var submit = e => {
        console.log(state['startdate'] + state['duration'] + state['harvestdate'] + state['quantity'] + state['description'] + state['startprice']  );
      };
    return (
        <MuiThemeProvider>
    <center><React.Fragment>
        <br/>
        <h1>Farmer Form</h1>
        <br />
        {BasicDateTimePicker('Start Date', state['startdate'], handleDateValues, 'startdate')}
        <br/>
        <br />
        {BasicDateTimePicker('Duration', state['duration'], handleDateValues, 'duration')}
        <br/>
        <br/>
        {BasicDateTimePicker('Harvest Date', state['harvestdate'], handleDateValues, 'harvestdate')}
        <br/>
        <br/>
        <TextField 
            hintText = 'Enter Quantity'
            floatingLabelText = 'Quantity'
            onChange = {handleChange('quantity')}
        />
        <br/>
        <TextField
            hintText = 'Enter Description'
            floatingLabelText = 'Description'
            onChange = {handleChange('description')}
        />
        <br/>
        <TextField
            hintText = 'Enter Start bid Price'
            floatingLabelText = 'Starting Bid Price'
            onChange = {handleChange('startprice')}
        />
        <br/>
        <br />
        <RaisedButton 
        
            label = 'Submit'
            primary = {true}
            style = {styles.button}
            onClick = {submit}
        
        />
    </React.Fragment>
    </center>
  </MuiThemeProvider>
        
    )
}

export default FarmerForm

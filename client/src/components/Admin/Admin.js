import { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  InputLabel,
} from "@material-ui/core";
import useStyles from "./styles";
import FileBase from "react-file-base64";
import NumericInput from "react-numeric-input";

const Admin = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Crop
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="crop name"
                  name="cropname"
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="username"
                  name="username"
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <NumericInput className="form-control" />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FileBase type="file" multiple={false} onDone />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" color="secondary">
                  Submit
                </Button>
              </Grid>
            </>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Admin;

import { useState } from "react";
import axios from "axios";
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
  const accessToken = JSON.parse(localStorage.getItem("profile")).accessToken;
  const [cropName, setCropName] = useState("");
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  const classes = useStyles();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cropName, username, rating, image);
    const res = await axios.post(
      "http://localhost:8080/api/admin/addcrop",
      {
        cropName,
        username,
        rating,
        image,
      },
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );

    console.log(res);
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          Crop
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="crop name"
                  name="cropname"
                  onChange={(e) => setCropName(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <NumericInput
                  onChange={(val) => setRating(val)}
                  className="form-control"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(file) => setImage(file)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="contained" color="secondary" type="submit">
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

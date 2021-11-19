import { useState, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  Container,
  ListItem,
  Grid,
  ListItemText,
} from "@material-ui/core";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import useStyles from "./styles";
import { useHistory, Link } from "react-router-dom";

const Dashboard = ({ setUser }) => {
  // const accessToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzBiMWY3ODllYmFmMTBhOGM0NTA3NyIsImlhdCI6MTYxNzk5OTA1OSwiZXhwIjoxNjE4MDg1NDU5fQ.OBjtP3SotKqM73h7msDmGVEm0dYZ5YYb9NXSakdQ10Y'
  const role = JSON.parse(localStorage.getItem("profile"))?.roles[0];
  const classes = useStyles();
  let history = useHistory();

  const logout = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <style>
        {/* hover leave transition ease 1s   */}
        {`
          .MuiListItem-root:hover {
            background-color: #e5e5e5;
            border-radius: 10px;
            transition: all 1s ease;
            -webkit-transition: border-radius 2s;
          }
        `}
        </style>
      {console.log(role)}
      <CssBaseline />
      <AppBar position="absolute" id="myappbar">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <strong>Dashboard</strong>
          </Typography>
          <List style={{ display: "flex" }}>
            <ListItem button color="inherit" component={Link} to="/profile" style={{borderRadius: "10px"}}>
              <ListItemText style={{ color: "inherit" }}> <strong>Profile</strong></ListItemText>
            </ListItem>

            {role === "admin" ? (
              <ListItem button color="inherit" component={Link} to="/admin" style={{borderRadius: "10px"}}>
                <ListItemText><strong>AddCrop</strong></ListItemText>
              </ListItem>
            ) : null}

            <ListItem button color="inherit" component={Link} to="/auction" style={{borderRadius: "10px"}}>
              <ListItemText><strong>Auction</strong></ListItemText>
            </ListItem>

            {role ==="farmer" ? (
              <ListItem button color="inherit" component={Link} to="/predict" style={{borderRadius: "10px"}}>
              <ListItemText style={{ color: "inherit" }}><strong>Predict production</strong></ListItemText>
            </ListItem>
            ) : null
            }
            {role ==="farmer" ? (
              <ListItem button color="inherit" component={Link} to="/suggest" style={{borderRadius: "10px"}}>
              <ListItemText style={{ color: "inherit" }}><strong>Crop suggestion</strong></ListItemText>
            </ListItem>
            ) : null
            }

            {role !== "buyer" ? (
              <ListItem
                button
                color="inherit"
                component={Link}
                to="/createauction"
                style={{borderRadius: "10px"}}
              >
                <ListItemText>
                <strong>
                  Create Auction
                </strong>
                </ListItemText>
              </ListItem>
            ) : null}
          </List>
          <IconButton color="inherit" onClick={logout}>
            <ExitToAppRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Dashboard;

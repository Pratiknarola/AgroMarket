import { useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
let formattedTime;
const User = ({ user }) => {
  useEffect(() => {
    let unix_timestamp = user.time;
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  });

  return (
    <>
      <Grid item xs={12}>
        <Card style={{ margin: "20px" }}>
          <CardContent>
            <div style={{ float: "left", paddingBottom: "20px" }}>
              <Typography style={{ fontSize: "18px" }}>
                name:{user.username}
              </Typography>
              <Typography>time:{formattedTime}</Typography>
              <Typography>bid price:{user.bidprice}</Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default User;

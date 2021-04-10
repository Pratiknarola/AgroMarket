import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Auction from "./components/Auction/Auction";
import Dashboard from "./components/Dashboard/Dashboard";
import BidPage from "./components/Auction/BidPage";
import Admin from "./components/Admin/Admin";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile"))?.accessToken);
  });

  if (!user)
    return (
      <Router>
        <Login setUser={setUser} />
      </Router>
    );

  return (
    <Router>
      <Dashboard setUser={setUser} />
      <Switch>
        <Route path="/auction">
          {" "}
          <Auction />
        </Route>
        <Route path="/bidpage/:id">
          <BidPage />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

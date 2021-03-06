import {useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Auction from './components/Auction/Auction'
import Dashboard from './components/Dashboard/Dashboard'
import BidPage from './components/Auction/BidPage'
import Admin from './components/Admin/Admin'
import Leaderboard from './components/Auction/Leaderboard'
import FarmerForm from './components/FarmerForm/FarmerForm'
import ProfilePage from './components/ProfilePage/ProfilePage'
import SuggestionPage from './components/tools/SuggestionPage'
import PredictPage from './components/tools/PredictPage'

function App() {
  const [user, setUser] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null);
  const [username, setUsername] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")).username : "");

  console.log("starting of the app username is", username)

  if (!user) {
    return (
      <Router>
        <Login setUser={setUser} />
      </Router>
    );
  }

  console.log("user value in app.js is ", user);

  return (
    <Router>
      <Dashboard setUser={setUser} />
      <Switch>
      <Route path='/auction'> <Auction /></Route>
      <Route path='/bidpage/:id' ><BidPage/></Route>
      <Route path='/admin'><Admin/></Route>
      <Route path='/leaderboard'><Leaderboard/></Route>
      <Route path='/createauction'><FarmerForm username={username} user={user}></FarmerForm></Route>
      <Route path='/profile'><ProfilePage user={user}></ProfilePage></Route>
      <Route path='/suggest'><SuggestionPage user={user}></SuggestionPage></Route>
      <Route path='/predict'><PredictPage></PredictPage></Route>
      </Switch>
    </Router>
  );
}

export default App;

import {useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import BidPage from './components/Dashboard/BidPage'
import Admin from './components/Admin/Admin'

function App() {

  const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));
   })

  if(!user)return(
    <Router>
      <Login setUser={setUser}/>
    </Router>
  ) 

  return (
    <Router>
      <Route path='/dashboard'> <Dashboard   setUser={setUser}  /></Route>
      <Route path='/bidpage/:id' ><BidPage/></Route>
      <Route path='/admin'><Admin/></Route>
    </Router>
  );
}

export default App;

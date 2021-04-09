import {useState} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  const [user,setUser]=useState(null)


  if(!user)return(
    <Router>
      <Login setUser={setUser}/>
    </Router>
  ) 

  return (
    <Router>
      <Route path='/dashboard'> <Dashboard   setUser={setUser}  /></Route> 
    </Router>
  );
}

export default App;

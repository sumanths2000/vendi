import {Switch,BrowserRouter as Router,Route} from 'react-router-dom'
import Login from './Components/Login';
import Splash from './Components/Splash'
import {useEffect} from 'react'
import {auth} from './firebase'
import {useDispatch,useSelector} from 'react-redux'
import { addUser } from './Components/Ducks/userReducer';
import Home from './Components/Home';
import ProtectedLoginRoute from './ProtectedLoginRoute';
import AddNewProduct from './Components/AddNewProduct'

function App() {
  const dispatch=useDispatch();
  const user=useSelector(state => state.user.user)
 useEffect(() => {
   auth.onAuthStateChanged((user)=>{
     dispatch(addUser(user))
   })
   
 }, [])
  return (
    <Router>
      <Switch>
        <ProtectedLoginRoute exact path="/login" component={Login} />
        <Route exact path="/addnewproduct" component={user?.email?AddNewProduct:Splash} />
        <Route  path="/" component={user?.email?Home:Splash} />
        
    </Switch>
    </Router>
  );
}

export default App;

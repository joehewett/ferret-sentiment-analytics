import logo from './logo.svg';
import './App.css';
import fgb from './img/ferretbg.jpg'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useState} from 'react'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Home from './components/pages';
import SignIn from './components/pages/signin';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'
import Host from './components/pages/host';

function App() {
  const [isOpen, setIsOpen] = useState(true)

    const onToggle = () => {
        setIsOpen(!isOpen)
    }
  return (

    <div className="App">
      
      <Router>
      <Sidebar isOpen= {isOpen} onToggle = {onToggle}/>
      <Navbar onToggle = {onToggle}/>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/signin" component={SignIn} exact/>
          <Route path="/host" component={Host} exact/>
        </Switch>
        </Router>
      <header className="App-header">
          <img src={fgb}></img>
          <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);

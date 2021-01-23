import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import fgb from './img/ferretbg.jpg';
import './App.css';
import { css } from '@emotion/css'

import Home from './components/pages';
import SignIn from './components/pages/signin';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'
import Host from './components/pages/host';
import Events from './components/events';
import Event from './components/event';

function Router() {
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

const contentStyle = css`
    min-height: calc(100vh - 45px);
    padding: 0px 40px;
`

export default withAuthenticator(Router);
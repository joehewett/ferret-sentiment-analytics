import React, { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.css';

import Home from './components/pages';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar'
import Events from './components/Events';
import Event from './components/Event';

function App() {
  const [isOpen, setIsOpen] = useState(true)

    const onToggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="App">
            <Router>
                <Sidebar isOpen={isOpen} onToggle={onToggle}/> 
                <Navbar onToggle={onToggle}/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/events" component={Events} exact/>
                        <Route path="/event/:id" component={Event} />
                    </Switch>
            </Router>
        </div>
    );
}

export default withAuthenticator(App);
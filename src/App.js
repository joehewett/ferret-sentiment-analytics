import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { css } from '@emotion/css'
import Events from './components/events';
import Event from './components/event';

import fgb from './img/ferretbg.jpg';
import './App.css';
import TopBar from './components/topbar'


function Router() {
    return ( 
        <>

            <TopBar />

            <BrowserRouter>
            <div className = {contentStyle}>
            <Switch>
                <Route exact path = "/" component={Events} />
                <Route path = "/event/:id" component={Event} />
            </Switch> 
            </div> 
            </BrowserRouter> 
            <AmplifySignOut />
        </>
    );
}

const contentStyle = css`
    min-height: calc(100vh - 45px);
    padding: 0px 40px;
`

export default withAuthenticator(Router);
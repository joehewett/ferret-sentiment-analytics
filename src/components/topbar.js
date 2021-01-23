import React, { useEffect, useState } from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { css } from '@emotion/css'
import fgb from '../img/ferretbg.jpg';
import { Auth } from 'aws-amplify';

export default function TopBar() {

    const [username, setUsername] = useState("Guest")
    useEffect(() => {
        displayUsername(); 

    }, []); 

    async function displayUsername() {
        const user = await Auth.currentAuthenticatedUser();
        setUsername(user.username)
        console.log("username is ", username)
    }

    return (
        <div className="App-header">
            <img className={headerImage} src={fgb}></img>
            <p className={usernameDisplay}>Welcome to Ferret, {username}</p>
            <AmplifySignOut />
        </div>
    );

}

const headerImage = css`
    height: 200px;
`

const usernameDisplay = css`
    color: blue;
`
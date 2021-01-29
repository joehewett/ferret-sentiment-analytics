import React, { useState, useEffect } from 'react'
import {FaBars} from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink } from './NavbarElement'
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { NavLink, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify'

const Navbar = ({onToggle}) => {
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
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to="/">Ferret</NavLogo>
                    <MobileIcon onClick ={onToggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="about">About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavBtnLink to="/events">Events</NavBtnLink>
                            {/* TODO Styling is broken here */}
                        </NavItem>
                    </NavMenu>

                    {/* TODO This would be better in white text */}
                    <NavBtn>
                        Welcome, {username}
                    </NavBtn>
                    <NavBtn>
                        <AmplifySignOut />
                    </NavBtn>
                    
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar

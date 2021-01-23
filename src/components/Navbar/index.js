import React from 'react'
import {FaBars} from 'react-icons/fa'
import fgb from '../../img/ferretbg.jpg'
import { ButtonR } from '../ButtonElement'
import {Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElement'

const Navbar = ({onToggle}) => {
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
                            <NavLinks to="host">Admin</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="services">Attendees</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="signup">Sign Up</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/signin">Sign In</NavBtnLink>
                        <ButtonR to="/host">Host</ButtonR>
                    </NavBtn>
                    
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar

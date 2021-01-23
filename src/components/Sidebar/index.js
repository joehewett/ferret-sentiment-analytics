import React, {component, useState} from 'react';
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SideBtnWrap, SidebarRoute} from './SidebarElement';

const Sidebar = ({isOpen, onToggle}) => {
    // const [isOpen, setIsOpen] = useState(true)

    // const onToggle = () => {
    //     setIsOpen(!isOpen)
    // }
    return (
        <SidebarContainer isOpen={isOpen} onClick={onToggle}>
            <Icon onClick={onToggle}>
                <CloseIcon />
            </Icon>
            
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to ="about"> 
                        About
                    </SidebarLink>
                    <SidebarRoute to ="/host" > 
                        Admin
                    </SidebarRoute>
                    <SidebarLink to ="attendees"> 
                        Attendees
                    </SidebarLink>
                    <SidebarLink to ="signup"> 
                        Sign Up
                    </SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                
                    <SidebarRoute to = "/signin" >Sign In</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar

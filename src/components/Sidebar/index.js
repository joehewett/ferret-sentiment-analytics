import React, { useState } from 'react';
import {SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SidebarRoute} from './SidebarElement';

const Sidebar = ({isOpen, onToggle}) => {
    const [open, setOpen] = useState(isOpen)

    const toggle = () => {
        setOpen(!open)
    }
    return (
        <SidebarContainer isOpen={isOpen} onClick={onToggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to ="about"> 
                        About
                    </SidebarLink>
                    <SidebarRoute to ="/events" > 
                        Admin
                    </SidebarRoute>
                    <SidebarLink to ="attendees"> 
                        Attendees
                    </SidebarLink>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar

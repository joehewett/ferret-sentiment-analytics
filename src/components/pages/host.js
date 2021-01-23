import React, {useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import EventCreate from '../CreateEvent'
import Event from '../Event'
import { eventObj1,eventObj2,eventObj3,eventObj4 } from '../Event/eventData'
import {EventHeader, EventListContainer} from '../Event/EventElement'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const Host = () => {

    return (

        <>
            <EventCreate></EventCreate>
            <EventHeader>Your Events</EventHeader>
            <EventListContainer>
                <Event {...eventObj1}></Event>
                <Event {...eventObj2}></Event>
                <Event {...eventObj3}></Event>
                <Event {...eventObj4}></Event>
            </EventListContainer>
        </>
            
    )
}

export default Host

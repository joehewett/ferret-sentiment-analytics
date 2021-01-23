import React, {Component, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeroSection from '../HeroSection'
import InfoSection from '../InfoSection'
import { homeObjOne, homeObjThree, homeObjTwo } from '../InfoSection/Data'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const Home = () => {
    const [isOpen, setIsOpen] = useState(true)

    const onToggle = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <>
        <Router>

            
            <HeroSection/>
            <InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
            <InfoSection {...homeObjThree}/>
            
        </Router>
        </>
    )
}

export default Home

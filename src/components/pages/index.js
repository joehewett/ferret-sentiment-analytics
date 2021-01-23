import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import HeroSection from '../HeroSection'
import InfoSection from '../InfoSection'
import { homeObjOne, homeObjThree, homeObjTwo } from '../InfoSection/Data'

const Home = () => {

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

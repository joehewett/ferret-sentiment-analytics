import React, {useState} from 'react'
import Video from '../../Video/video.mp4'
import {BrowserRouter as Router} from 'react-router-dom'
import {Button, ButtonR} from '../ButtonElement'
import {HeroBg, VideoBg, HeroContainer, HeroContent, HeroH1, HeroP, HeroBtnWrapper } from './HeroElement'


const HeroSection = () => {

    const [hover, setHover] = useState(true)

    const onHover = () => {
        setHover(!hover)
    }

    return (
        <>
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>Get Your Event's Live Feedback</HeroH1>
                <HeroP>
                    Are you hosting an event and want to know feedback from your attendees?
                </HeroP>
                <HeroBtnWrapper>
                    <Router>
                    <ButtonR to = "/events" onMouseEnter={onHover} onMouseLeave={onHover}>
                        Host Event
                    </ButtonR>
                    <Button to='/' onMouseEnter={onHover} onMouseLeave={onHover}>
                        Join Event
                    </Button>
                    </Router>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
        
        </>
    )
}

export default HeroSection

import React from 'react'

import {EventCreateContainer, EventCreateWrapper, EventHeadLine, EventNaming, EventDesc, ButtonWrapper, Eventh2, EventContentWrapper, Img, ImgWrap} from './createElement'
import { Column2, InfoContainer, InfoWrapper, InfoRow, Column1, TextWrapper, TopLine, Heading, Subtitle, BtnWrap } from '../InfoSection/InfoElement'
import {Button} from '../ButtonElement'
import teaching from '../../img/teaching.svg'

const EventCreate = () => {
    return (
        <>
            <EventCreateContainer>
                    <Column1>
                    <TextWrapper>
                    <EventCreateWrapper>
                    <EventHeadLine>Create Event</EventHeadLine>
                    <inputContainer>
                        <EventContentWrapper>
                            <Eventh2>EventName</Eventh2>
                            <EventNaming placeholder="Event Name"></EventNaming>
                        </EventContentWrapper>
                        <br></br>
                        <br></br>
                        <EventContentWrapper>
                            <Eventh2>Description</Eventh2>
                            <EventDesc placeholder="Event Description"></EventDesc>
                        </EventContentWrapper>
                    </inputContainer>
                    <ButtonWrapper>
                        <Button>Create Event</Button>
                    </ButtonWrapper>
                </EventCreateWrapper>
                    </TextWrapper>
                    </Column1>
                    <Column2>
                        <ImgWrap>
                        <Img src={teaching}></Img>
                        </ImgWrap>
                    </Column2>
                
            </EventCreateContainer>
        </>
    )
}

export default EventCreate

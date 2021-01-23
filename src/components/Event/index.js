import React from 'react'
import {EventContainer, EventName, DescWrapper, SubDesc, Label, EventValue} from './EventElement'

const Event = ({name, overall, reviews, score}) => {
    return (
        <>
        <EventContainer>
            <EventName>{name}</EventName>
            <DescWrapper>
                <SubDesc>
                    <Label>Overall</Label>
                    <EventValue score={score}>{overall}</EventValue>
                </SubDesc>
                <SubDesc>
                    <Label>Review Count</Label>
                    <EventValue>{reviews}</EventValue>
                </SubDesc>
                
            </DescWrapper>
        </EventContainer>
        </>
    )
}

export default Event

import React from 'react'
import {EventContainer, EventName, DescWrapper, SubDesc, Label, EventValue} from './EventElement'

const EventCard = ({id, name, score, reviews, overall}) => {
    return (
        // TODO: Need to update the schema to hold all of the details necessary here 
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

export default EventCard

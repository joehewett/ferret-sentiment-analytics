import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import { API, Auth } from 'aws-amplify'
// import { deleteEvent as deleteEventMutation } from '../graphql/mutations';
import { listEvents, eventsByUser } from '../../graphql/queries';

import EventCreate from '../CreateEvent'
import EventCard from './EventCard'
import { EventHeader, EventListContainer } from './EventElement'


export default function Events() {
    // We'll store our events in state in events and update with setEvents
    const [events, setEvents] = useState([]);
    const [eventCount, setEventCount] = useState(events.length)
    console.log("in evenets")


    // On load, fetch all the events. This only happens when the component mounts because of the [] passed
    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [eventCount]);

    async function fetchEvents(postType = 'my-events') {
        let eventData, newEvents;
        if (postType === 'my-events') {
            const user = await Auth.currentAuthenticatedUser();
            eventData = await API.graphql({
                query: eventsByUser,
                variables: {
                    owner: user.username,
                    limit: 100
                }
            });
            console.log("Successful API request for my-events", eventData)
            newEvents = eventData.data.eventsByUser.items;
        } else {
            eventData = await API.graphql({
                query: listEvents,
                variables: {
                    limit: 100
                }
            });
            newEvents = eventData.data.listEvents.items;
            console.log("Successful API request for all-events", eventData)
        }
        setEvents(newEvents);
        console.log(events)
    }

    // Get all events for this user using the GraphQL Api

    // This doesn't delete server-side because of a problem with our conflict resolver rejecting it 
    // async function deleteEvent({ id }) {
    //     const newEventsArray = events.filter(event => event.id !== id);
    //     setEvents(newEventsArray);
    //     const deleteResp = await API.graphql({
    //         query: deleteEventMutation,
    //         variables:
    //             { input: { id: id } }});
    // }

    return (
        <>
            <EventCreate events={events} setEvents={setEvents} eventCount={eventCount} setEventCount={setEventCount}/>
            <EventHeader>Your Events</EventHeader>

            <EventListContainer>
                {
                    events.map(event => (
                        <>
                            <Link to={`/event/${event.id}`} className={linkStyle} key={event.id}>
                                <EventCard key={event.id} id={event.id} name={event.name}  />
                                {/* <EventCard key={event.id} id={event.id} name={event.name} score={event.score} reviews={event.reviews} overall={event.overall} /> */}
                            </Link>
                        </>
                    ))
                }
            </EventListContainer>
        </>
    )
}

const linkStyle = css`
    text-decoration: none;
`
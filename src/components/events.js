import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
import Button from './button'
import { API, Auth } from 'aws-amplify'
import { createEvent as createEventMutation, deleteEvent as deleteEventMutation } from '../graphql/mutations';
import { listEvents, eventsByUser } from '../graphql/queries';
import { TopBar } from './topbar'

const initialFormState = { name: '', description: '' }

export default function Events() {
    // We'll store our events in state in events and update with setEvents
    const [events, setEvents] = useState([]);
    // Store the form data for a new event in state too - set it blank to begin with
    const [formData, setFormData] = useState(initialFormState)

    // On load, fetch all the events. This only happens when the component mounts because of the [] passed
    useEffect(() => {
        fetchEvents();
    }, []);

    // Get all events for this user using the GraphQL Api
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

    // Creates an event using the createEvent mutation, taking in the form data 
    async function createEvent() {
         if (!formData.name && !formData.description) return; 
         console.log("createEventMutation")
         try {
            await API.graphql({
                query: createEventMutation,
                variables: {
                    input: formData
                },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
            console.log("createEventMutation success")
         } catch(error) {
             console.log(error)
         }
         setEvents([formData, ...events]);
         setFormData(initialFormState);
    }

    // This doesn't delete server-side because of a problem with our conflict resolver rejecting it 
    async function deleteEvent({ id }) {
        const newEventsArray = events.filter(event => event.id !== id);
        setEvents(newEventsArray);
        const deleteResp = await API.graphql({
            query: deleteEventMutation,
            variables:
                { input: { id: id } }});
    }

    return (
        <>
            {/* Create Event form - updates formData state whenever the inputs are changed */}
            <h1>Create Event</h1>
            <input
                onChange={e => setFormData({...formData, 'name': e.target.value})}
                className={form_input}
                placeholder = "Event Name"
                value = {formData.name}
            />
            <input
                onChange={e => setFormData({...formData, 'description': e.target.value})}
                className={form_input}
                placeholder = "Event Description"
                value = {formData.description}
            />
            {/* Submit button for createEvent - submits formData */}
            <Button onClick={createEvent} title="Create Event" />
        {
            // Map every event to a div. Creates a clickable title, delete button for every event
            events.map(event => (
                <>
                {/* Use react router to link to event page */}
                <div key={event.id} className={eventContainer}>
                    <Link to={`/event/${event.id}`} className={linkStyle} key={event.id}>
                        <h1 className={eventTitleStyle}>{event.name}</h1>
                        <Button title="View Analytics" onClick ={() => deleteEvent(event)} />
                    </Link>
                    <Button title="Go to Form" />
                    <Button title="Delete Event" onClick ={() => deleteEvent(event)} />
                </div>
                </>
            ))
        }
    </>
  )
}

const form_input = css`
    font-family: 'Roboto', sans-serif;
    color: #333;
    font-size: 1.2rem;
        margin: 0 auto;
    padding: 1rem 2rem;
    border-radius: 0.2rem;
    padding: 2rem;
    background-color: rgb(255, 255, 255);
    width: 20%;
    display: inline-block;
    transition: all 0.3s;
    margin-bottom: 2rem;
    margin-left:2rem
`

const eventTitleStyle = css`
    margin: 15px 0px;
    color: #0070f3;
`
const linkStyle = css`
    text-decoration: none;
`
const eventContainer = css`
    border-radius: 10px;
    padding: 1px 20px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    width: 40%;
    :hover {
        border-color: #0070f3;
    }
`
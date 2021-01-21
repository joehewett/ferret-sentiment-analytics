import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

import { DataStore } from '@aws-amplify/datastore';
import { Feedback, Event } from './models';

import './App.css';
import fgb from './img/ferretbg.jpg';

import { listEvents } from './graphql/queries';
import { createEvent as createEventMutation, deleteEvent as deleteEventMutation } from './graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

const initialFormState = { name: '', description: '' }

function App() {       
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchEvents();
    }, []);
        
    async function fetchEvents() {
        try {
            const apiData = await API.graphql(graphqlOperation(listEvents));
            const events = apiData.data.listEvents.items
            console.log(events)
            setEvents(events); 
        } catch (err) {
            console.log("Error while fetching events", err)
        }
    }

    

    async function createEvent() {
         if (!formData.name && !formData.description) return; 
         console.log("createEventMutation")
         try {
            await API.graphql({ 
                query: createEventMutation, 
                variables: { input: formData} 
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
        const deleteResp = await API.graphql(graphqlOperation(deleteEventMutation, {input: { id } }));
    }

    return (
        <div className="App">
            <div className="App-header">
                <img src={fgb}></img>
                <AmplifySignOut />
            </div>
            <div>
                <h1>Events</h1>
                <input
                    onChange={e => setFormData({...formData, 'name': e.target.value})}
                    placeholder = "Event Name"
                    value = {formData.name}
                />
                <input
                    onChange={e => setFormData({...formData, 'description': e.target.value})}
                    placeholder = "Event Description"
                    value = {formData.description}
                />
                <button onClick={createEvent}>Create Event</button>
            </div> 
            <div>
                {
                    events.map(event => (
                        <div key={event.id || event.name}>
                            <h2>{event.name}</h2>
                            <h4>{event.description}</h4>
                            <button onClick ={() => deleteEvent(event)}>Delete event</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default withAuthenticator(App);

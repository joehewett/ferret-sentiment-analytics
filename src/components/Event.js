import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import { API } from 'aws-amplify';
import { getEvent } from '../graphql/queries';
import { Link } from 'react-router-dom';

export default function Event() {
    const [loading, setLoading] = useState(true);
    const [event, setEvent] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        console.log("loading event page for event", id)
        fetchEvent()
    }, [])

    async function fetchEvent() {
        try {
            const eventData = await API.graphql({
                query: getEvent, variables: { id }
             });
             const currentEvent = eventData.data.getEvent
             setEvent(currentEvent);
             setLoading(false);
             } 
        catch (err) {
            console.log('error: ', err)
        }
    }

    if (loading) return <h3>Loading...</h3>

    return ( <>
        <h1 className={titleStyle}>{event.name}</h1>
        <p>{event.description}</p>
        <p>here we will display the feedback for this event</p>

        <Link to={`/`}>
            <h2>Home</h2>
        </Link>

        </>
    )
}

const titleStyle = css`
    margin-bottom: 7px;
`
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { componentsByEvent } from '../../graphql/queries';
import { createComponent } from '../../graphql/mutations';
import { API } from 'aws-amplify'

const newComponentFormState = { type: "", text: "", event_id: "" }
const feedbackFormState = { score: "", feedback: "" }

export default function Feedback() {

    const [newComponentData, setNewComponentData] = useState(newComponentFormState);
    const [feedbackData, setFeedbackData] = useState(feedbackFormState);
    const [component, setComponents] = useState([])
    const { event_id } = useParams();
    
    useEffect(() => {
        setNewComponentData({...newComponentData, 'event_id': event_id})
        fetchComponents(); 

    }, []);

    function handleSubmit() {
        if (!feedbackData.feedback || !feedbackData.score) return; 
        console.log("Submitting form data: ", feedbackData)
    }

    async function addComponent() {
        // When user clicks Add Component, trigger createComponent mutation with data in state
        try {
            await API.graphql({
                query: createComponent,
                variables: {
                    input: newComponentData
                },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
            console.log("createCompontent success")
            // setEvents([...events, formData]);
            // setEventCount(eventCount + 1);
            setNewComponentData(newComponentFormState)
        } catch(error) {
            console.log(error)
        }
    }

    async function fetchComponents() {

        let componentData, feedbackComponents;
        console.log("Getting components by ID...")
        componentData = await API.graphql({
            query: componentsByEvent,
            variables: {
                event_id: event_id
            }
        });
        console.log(componentData)
        // feedbackComponents = componentData.data.componentsByEvent.items;
        // console.log("component data: ", feedbackComponents)

        // setComponents(feedbackComponents)

    }

    return (
        <div>
            <h1>Feedback Form</h1>
            <h2>Edit Form (Only renders for organisers)</h2>
                <label>Select component type: </label>
                <select onChange={e =>
                    setNewComponentData({
                        ...newComponentData,
                        'type': e.target.value
                    })}
                    name="component"
                    id="component"
                >
                    <option value="textbox">Textbox</option>
                    <option value="scale">Scale 1-10</option>
                    <option value="yesno">Yes or No</option>
                </select>
                <br></br>
                <label>Text for component </label>
                <input onChange={e => 
                    setNewComponentData({
                        ...newComponentData, 
                        'text': e.target.value
                    })}
                />
                <br></br>
                <br></br>
                <button onClick={addComponent}>Add Component</button>

            <div>
                <h2>Feedback Form (Renders for everyone)</h2>
                <label>Text</label>
                <input onChange={e => 
                    setFeedbackData({
                        ...feedbackData, 
                        'score': e.target.value
                    })}
                />
                <br></br>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
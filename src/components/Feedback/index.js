import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { componentsByEvent } from '../../graphql/queries';
import { createComponent } from '../../graphql/mutations';
import { API } from 'aws-amplify'

const newComponentFormState = { type: "", text: "", event_id: "" }

export default function Feedback() {

    const [components, setComponents] = useState([])
    // Store data from the New Component form
    const [newComponentData, setNewComponentData] = useState(newComponentFormState);
    // We don't know what components we're going to have yet, so just initialise our feedback to an empty array
    const [loadedComponents, setLoadedComponents] = useState(false)
    const { id } = useParams();
    
    useEffect(() => {
        newComponentFormState.event_id = id
        // We've now got the event_id from the router, so add that to our new component data.
        setNewComponentData({...newComponentData, 'event_id': id})
        // Get existing components from the database for this feedback form
        fetchComponents(); 
    }, []);

    // When user clicks Add Component, trigger createComponent mutation with data in state
    async function addComponent() {
        let new_id = 0; 

        if (!newComponentData.type || !newComponentData.text) return; 

        try {
            await API.graphql({
                query: createComponent,
                variables: {
                    input: newComponentData
                },
                authMode: "AMAZON_COGNITO_USER_POOLS"
            }).then((result) => {
                console.log("Added new component: ", result)
                new_id = result.data.createComponent.id
            });
            console.log("createCompontent success")
            setComponents([...components, newComponentData])
            setNewComponentData(newComponentFormState); 
        } catch(error) {
            console.log(error)
        }
    }

    // Load in the components that have already been created for this form
    async function fetchComponents() {
        let feedbackComponents;

        try {
            await API.graphql({
                query: componentsByEvent,
                variables: {
                    event_id: id
                }
            }).then((result) => {
                feedbackComponents = result.data.componentsByEvent.items;
            });
        } catch(error) {
            console.log(error)
        }

        setComponents(feedbackComponents)
        setLoadedComponents(true)
    }

    // Called when feedback form is submitted
    async function handleSubmit() {
        // Clear input boxes
        let deepCopy = [...components]

        // try {
        //     await API.graphql({
        //         query: createFeedback,
        //         variables: {
        //             input: newComponentData
        //         },
        //         authMode: "AMAZON_COGNITO_USER_POOLS"
        //     }).then((result) => {
        //         console.log("Added new component: ", result)
        //         new_id = result.data.createComponent.id
        //     });
        // } catch(error) {

        // }
        deepCopy.map((component) => {
            component.response = ""
        })
        // TODO - actually store this form data in the database
        setComponents(deepCopy)
    }

    if (!loadedComponents) {
        return <h1>Loading</h1>
    } else {
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
                        <option value="">Select Type</option>
                        <option value="textbox">Textbox</option>
                        <option value="scale">Scale 1-10</option>
                        <option value="yesno">Yes or No</option>
                    </select>
                    <br></br>
                    <label>Text for component </label>
                    <input onChange={e => 
                        setNewComponentData({...newComponentData, 'text': e.target.value})}
                    />
                    <br></br>
                    <br></br>
                    <button onClick={addComponent}>Add Component</button>

                <div>
                    <h2>Feedback Form (Renders for everyone)</h2>
                    {
                        components.map((component) => (
                            <div key={component.id}>
                                <label key={component}>{component.text}</label>
                                <br></br>
                                <input key={component.id} id={component.id} onChange={e => {
                                    console.log("Making a component with id: ", component.id)
                                    // Create an onChange handler that updates the feedback state with with this inputs information
                                    let deepCopy = [...components]
                                    let i = deepCopy.map((x) => { return x.id }).indexOf(component.id);
                                    console.log("i", i)
                                    deepCopy[i].response = e.target.value
                                    setComponents(deepCopy)
                                }} value = {component.response}></input>
                                <br></br>
                                <br></br>
                            </div>

                        ))
                    }
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        );
    }
}
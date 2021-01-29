import React, { useState } from 'react'
import {EventCreateContainer, EventCreateWrapper, EventHeadLine, EventNaming, EventDesc, ButtonWrapper, Eventh2, EventContentWrapper, Img, ImgWrap } from './createElement'
import { Column2, Column1, TextWrapper } from '../InfoSection/InfoElement'
import { Button } from '../ButtonElement'
import teaching from '../../img/teaching.svg'
import { API } from 'aws-amplify'
import { createEvent as createEventMutation } from '../../graphql/mutations';

const initialFormState = { name: '', description: '' }

const EventCreate = ({events, setEvents, eventCount, setEventCount}) => {
    // Store the form data for a new event in state too - set it blank to begin with
    const [formData, setFormData] = useState(initialFormState)

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
            setEvents([...events,formData]);
            setEventCount(eventCount + 1);
         } catch(error) {
             console.log(error)
         }

        // TODO
        // Update events state so that list automaticalyl updates
        //  setEvents([formData, ...events]);
         setFormData(initialFormState);
    }

    return (
        <>
            <EventCreateContainer>
                <Column1>
                    <TextWrapper>
                        <EventCreateWrapper>
                            <EventHeadLine>Create Event</EventHeadLine>
                                <EventContentWrapper>
                                    <Eventh2>Event Name</Eventh2>
                                    {/* <EventNaming
                                        onChange={e => setFormData({...formData, 'name': e.target.value})}
                                        placeholder="Event Name"
                                    >
                                        {formData.name}
                                    </EventNaming> */}
                                    <input
                                        onChange={e => setFormData({...formData, 'name': e.target.value})}
                                        placeholder = "Event Name"
                                        value = {formData.name}
                                    />
                                </EventContentWrapper>
                                <br></br>
                                <br></br>
                                <EventContentWrapper>
                                    <Eventh2>Description</Eventh2>
                                    {/* <EventDesc 
                                        onChange={e => setFormData({...formData, 'description': e.target.value})}
                                        placeholder="Event Description"
                                        value={formData.description}
                                    >
                                    </EventDesc> */}
                                    <input
                                        onChange={e => setFormData({...formData, 'description': e.target.value})}
                                        placeholder = "Event Description"
                                        value = {formData.description}
                                    />
                                </EventContentWrapper>
                            <ButtonWrapper>
                                <Button onClick={() => createEvent()}>Create Event</Button>
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

            // <input
            //     className={form_input}
            //     placeholder = "Event Name"
            //     value = {formData.name}
            // />
            // <input
            //     onChange={e => setFormData({...formData, 'description': e.target.value})}
            //     className={form_input}
            //     placeholder = "Event Description"
            //     value = {formData.description}
            // />
            // {/* Submit button for createEvent - submits formData */}
            // <Button onClick={createEvent} title="Create Event" />
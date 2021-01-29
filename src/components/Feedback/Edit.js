import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const initialFormState = { type: "", feedback: "" }

export default function Feedback() {

    const [formData, setFormData] = useState(initialFormState);
    const { id } = useParams();
    
    function handleSubmit() {
        if (!formData.feedback || !formData.score) return; 
        console.log("Submitting form data: ", formData)
    }

    return (
        <div>
            <h1>Edit Feedback Form</h1>
            <p>Event ID: {id}</p>
            <button onClick={handleSubmit}>Submit</button>
            <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
                </select>
            <input onChange={e => 
                setFormData({
                    ...formData, 
                    'score': e.target.value
                })}
            />
            <input onChange={e => 
                setFormData({
                    ...formData, 
                    'feedback': e.target.value
                })}
            />
        </div>
    );
}
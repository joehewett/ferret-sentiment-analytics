import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const initialFormState = { score: "", feedback: "" }

export default function Feedback() {

    const [formData, setFormData] = useState(initialFormState);

    // useEffect(() => {
    // // console.log("Form data is now...", formData)
    // }, [formData])

    
    const { id } = useParams();
    
    function handleSubmit() {
        if (!formData.feedback || !formData.score) return; 
        console.log("Submitting form data: ", formData)
    }

    return (
        <div>
            <h1>hello</h1>
            <p>{id}</p>
            <button onClick={handleSubmit}>Submit</button>
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
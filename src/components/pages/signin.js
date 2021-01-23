import React, {useState} from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

const SignIn = () => {
    const [isOpen, setIsOpen] = useState(true)

    const onToggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <h1>SignIn Page</h1>
        </div>
    )
}

export default SignIn

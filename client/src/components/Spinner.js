import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();  // This send us to the exact location we wanted to go after login 

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate('/login', {
            state: location.pathname,
        });
        return () => {
            clearInterval(interval);
        }
    }, [count, navigate, location]);

    return (
        <div className="spinner-container">

            <div className="spinner-text">Redirecting to Login Page in {count} sec ...</div>
            <div className="spinner-border spinner-border-custom" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>

        </div>
    )
}

export default Spinner
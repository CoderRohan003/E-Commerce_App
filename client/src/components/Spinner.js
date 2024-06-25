import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        if (count === 0) {
            navigate(`/${path}`, {
                state: { from: location.pathname },
            });
        }
        return () => {
            clearInterval(interval);
        };
    }, [count, navigate, location, path]);

    return (
        <div className="spinner-container">
            <div className="spinner-text">Redirecting to Login Page in {count} sec ...</div>
            <div className="spinner-border spinner-border-custom" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;

import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetch("http://localhost:3000/api/rights", {
            method: "GET",
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data.data);
                setIsDataLoaded(true);
            })
    }, []);

    useEffect(() => {
        if (isDataLoaded && (!userData?.rights || !userData?.decoded?.id)) {
            navigate("/error");
        }
    }, [isDataLoaded, userData]);

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Welcome to your profile!</p>
        </div>
    );
}
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../components/UI/Background/Background';
import "./Profile.scss"

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
            navigate("/");
        }
    }, [isDataLoaded, userData]);

    document.title = "Profile";

    return (
        <>
            <Background />

            <div className='profile'>
                <nav className='profile__nav-bar'>

                </nav>
                <aside className='profile__aside'>

                </aside>
                <div className='profile__elements'>

                </div>
            </div>
        </>
    );
}
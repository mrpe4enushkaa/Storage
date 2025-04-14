import React, { useLayoutEffect, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
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

    const handleExit = async () => {
        const response = await fetch("http://localhost:3000/api/logout", {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();

        result ? navigate("/") : console.error("Something wrone");
    }

    return (
        <>
            <Background />

            <div className='profile'>
                <nav className='profile__nav-bar'>
                    <div style={{ backgroundColor: "#fff", borderRadius: "50%", width: "70px", height: "70px" }}></div>
                    <span className='font-regular' style={{ fontSize: "1.8rem" }}>Nickname</span>
                    <div style={{
                        width: "70px", height: "70px",
                        backgroundColor: "red", borderRadius: "50%", marginLeft: "auto"
                    }}
                        onClick={() => { handleExit() }}
                    >
                        Exit
                    </div>
                </nav>
                <aside className='profile__aside'>

                </aside>
                <div className='profile__elements'>

                </div>
            </div>
        </>
    );
}
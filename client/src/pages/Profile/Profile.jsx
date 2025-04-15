import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../components/UI/Background/Background';
import "./Profile.scss";
import ProfileIcon from '../../images/Profile.svg?react';
import FilesIcon from '../../images/Files.svg?react';
import SettingsIcon from '../../images/Settings.svg?react';
import LogoutIcon from '../../images/Logout.svg?react';

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [documents, setDocuments] = useState({});
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

    useLayoutEffect(() => {
        if (isDataLoaded && userData?.decoded?.id) {
            fetch("http://localhost:3000/api/getDocuments", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_user: userData?.decoded?.id
                })
            }).then(response => response.json())
                .then(data => setDocuments(data));
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

    const handleAddDocument = async (type_data) => {
        if (isDataLoaded && userData?.decoded?.id) {
            const response = await fetch("http://localhost:3000/api/addDocument", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_user: userData?.decoded?.id,
                    type_data: type_data
                })
            })

            const result = await response.json();

            if (result.success) {
                window.location.reload();
            } else {
                console.error("Something wrong...");
            }
        }
    }

    return (
        <>
            <Background />
            <div className='wrapper'>
                <div className='profile'>
                    <aside className='profile__aside'>
                        <ProfileIcon className='icon-profile' />
                        <FilesIcon className='icon-profile' />
                        <SettingsIcon className='icon-profile' />
                        <LogoutIcon className='icon-profile' />
                    </aside>
                    <div className='profile__elements'>

                    </div>
                </div>
            </div>
        </>
    );
}
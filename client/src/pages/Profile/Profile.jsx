import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
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
    const positionBlockInfo = useRef(null);

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

    const handleInfo = (e, last) => {
        const pos = e.target.getBoundingClientRect();

        if (e.target.tagName === 'svg') {
            const rect = positionBlockInfo.current;
            last !== undefined ? rect.style.top = `${pos.top - 50}px` : rect.style.top = `${pos.top - 30}px`;
        }
    }

    return (
        <>
            <Background />
            <div className='wrapper'>
                <main className='profile'>
                    <section className='profile__elements'></section>
                    <aside className='profile__aside'>
                        <ProfileIcon className='icon-profile' onMouseOver={(e) => handleInfo(e)} />
                        <FilesIcon className='icon-profile' onMouseOver={(e) => handleInfo(e)} />
                        <SettingsIcon className='icon-profile' onMouseOver={(e) => handleInfo(e)} />
                        <LogoutIcon className='icon-profile' onMouseOver={(e) => handleInfo(e, true)} />

                        <div className='info-block' ref={positionBlockInfo}></div>
                    </aside>
                </main>
            </div>
        </>
    );
}
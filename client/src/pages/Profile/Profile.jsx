import React, { useLayoutEffect, useEffect, useState, useRef, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../components/UI/Background/Background';
import AsideBar from './components/AsideBar';
import ProfileUser from './components/ProfileUser';
import ProfileFiles from './components/ProfileFiles';
import LoopIcon from "../../images/Loop.svg?react";
import AddFolderIcon from "../../images/AddFolder.svg?react";
import AddFileIcon from "../../images/AddFile.svg?react";
import "./Profile.scss";
import ProfileSettings from './components/ProfileSettings';
import { UserContext } from './context/UserContext';

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [documents, setDocuments] = useState({});
    const navigate = useNavigate();

    const profile = useRef(null);

    const userBlock = useRef(null);
    const filesBlock = useRef(null);
    const settingsBlock = useRef(null);

    const toolbar = useRef(null);

    document.title = "Profile";

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

    useLayoutEffect(() => {
        if (isDataLoaded && userData?.decoded?.id) {
            fetch("http://localhost:3000/api/getDocuments", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_user: userData?.decoded?.id
                })
            })
                .then(response => response.json())
                .then(data => setDocuments(data));
        }
    }, [isDataLoaded, userData]);

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
                <main className='profile' ref={profile}>
                    <section className='profile--elements'>
                        {isDataLoaded && (
                            <UserContext.Provider value={userData}>
                                <ProfileUser userData={userData} userBlock={userBlock} />
                                <ProfileFiles filesBlock={filesBlock} />
                                <ProfileSettings settingsBlock={settingsBlock} />
                            </UserContext.Provider>
                        )}
                    </section>
                    <AsideBar
                        profile={profile}
                        userBlock={userBlock}
                        filesBlock={filesBlock}
                        settingsBlock={settingsBlock}
                        toolbar={toolbar}
                    />
                    <div className='profile__toolbar' ref={toolbar}>
                        <input type="text" placeholder='my_file...' className='profile__toolbar--input-search' />
                        <LoopIcon className="icon icon--search" />
                        <AddFolderIcon className="icon icon--add-folder" />
                        <AddFileIcon className="icon icon--add-file" />
                    </div>
                </main>
            </div>
        </>
    );
}
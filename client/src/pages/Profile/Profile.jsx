import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../components/UI/Background/Background';
import AsideBar from './components/AsideBar';
import "./Profile.scss";

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [documents, setDocuments] = useState({});
    const navigate = useNavigate();

    const barBlock = useRef(null);

    const userBlock = useRef(null);
    const filesBlock = useRef(null);
    const settingsBlock = useRef(null);

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
            })
                .then(response => response.json())
                .then(data => setDocuments(data));
        }
    }, [isDataLoaded, userData]);

    document.title = "Profile";

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
                <main className='profile' ref={barBlock}>
                    <section className='profile__elements'>
                        <section className='profile__user' ref={userBlock} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%"
                        }}>
                            <div style={{
                                width: "320px",
                                height: "320px",
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                            }}></div>
                            <div style={{
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <span className='font-regular' style={{
                                    fontSize: "64px",
                                    marginLeft: "100px"
                                }}>{userData?.decoded?.username}</span>
                                <span className='font-regular' style={{
                                    fontSize: "40px",
                                    marginLeft: "100px"
                                }}>{userData?.decoded?.email}</span>
                            </div>
                        </section>
                        <section className='profile__files' ref={filesBlock}>
                            <span>files</span>
                        </section>
                        <section className='profile__settings' ref={settingsBlock}>
                            <span>settings</span>
                        </section>
                    </section>
                    <AsideBar
                        barBlock={barBlock}
                        userBlock={userBlock}
                        filesBlock={filesBlock}
                        settingsBlock={settingsBlock}
                    />
                </main>
            </div>
        </>
    );
}
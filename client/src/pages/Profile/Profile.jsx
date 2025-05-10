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
import FormAdd from './components/FormAdd';

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [data, setData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    const profile = useRef(null);

    const userBlock = useRef(null);
    const filesBlock = useRef(null);
    const settingsBlock = useRef(null);
    const formAdd = useRef(null);

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

    useLayoutEffect(() => {
        if (isDataLoaded && (!userData?.rights || !userData?.decoded?.id)) {
            navigate("/error");
        }
    }, [isDataLoaded, userData]);

    useLayoutEffect(() => {
        if (isDataLoaded && userData?.decoded?.id) {
            fetch("http://localhost:3000/api/getData", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: userData?.decoded?.id
                })
            })
                .then(response => response.json())
                .then(data => { setData(data); console.log(data) });

        }
    }, [isDataLoaded, userData]);



    const [name, setName] = useState("");
    const [isPassword, setIsPassword] = useState(true);
    const [password, setPassword] = useState("");
    const [files, setFiles] = useState([]);

    const addDocument = async (e) => {
        e.preventDefault();

        if (isPassword) {
            await fetch("http://localhost:3000/api/addPassword", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    password: password,
                    id: userData.decoded.id
                }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            // .finally(() => window.location.reload());
        } else {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("id", userData.decoded.id);
            files.forEach(file => {
                formData.append("files", file);
            });

            await fetch("http://localhost:3000/api/addDocument", {
                method: "POST",
                body: formData,
                credentials: "include"
            })
            // .finally(() => window.location.reload());
        }
    }

    const isFormOpen = useRef(false);
    let timeout = null;

    const handleForm = (isProfile) => {
        if (isProfile) {
            isFormOpen.current = !isFormOpen.current;
        }

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        if (!isFormOpen.current) {
            profile.current.classList.remove("open-form");
            formAdd.current.classList.add("close");
            timeout = setTimeout(() => {
                profile.current.style.gridTemplateAreas = `        
                        "profile__aside profile__toolbar profile__toolbar"
                        "profile__aside profile__elements profile__elements"`;
                formAdd.current.style.display = 'none';
                timeout = null;
            }, 265);
        } else {
            profile.current.classList.add("open-form");
            formAdd.current.classList.remove("close");
            profile.current.style.gridTemplateAreas = `        
                "profile__aside profile__toolbar profile__toolbar"
                "profile__aside profile__elements profile__form"`;
            formAdd.current.style.display = 'block';
        }
    }

    return (
        <UserContext.Provider value={userData}>
            <Background />
            <div className='wrapper'>
                <main className='profile' ref={profile}>
                    <section className='profile--elements'>
                        {isDataLoaded && (
                            <>
                                <ProfileUser userData={userData} userBlock={userBlock} />
                                <ProfileFiles filesBlock={filesBlock} data={data} />
                                <ProfileSettings settingsBlock={settingsBlock} />
                            </>
                        )}
                    </section>
                    <AsideBar
                        profile={profile}
                        userBlock={userBlock}
                        filesBlock={filesBlock}
                        settingsBlock={settingsBlock}
                        toolbar={toolbar}
                        isFormOpen={isFormOpen}
                        handleForm={handleForm}
                    />
                    <div className='profile__toolbar' ref={toolbar}>
                        <input type="text" placeholder='my_file...' className='profile__toolbar--input-search' />
                        <LoopIcon className="icon icon--search" />
                        <AddFolderIcon className="icon icon--add-folder" />
                        <AddFileIcon className="icon icon--add-file" onClick={() => handleForm(true)} />
                    </div>

                    <FormAdd
                        setName={setName}
                        isPassword={isPassword}
                        setIsPassword={setIsPassword}
                        setFiles={setFiles}
                        addDocument={addDocument}
                        formAdd={formAdd}
                        setPassword={setPassword}
                    />
                </main>
            </div>
        </UserContext.Provider>
    );
}
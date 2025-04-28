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



    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(() => { console.log(name) }, [name]);
    useEffect(() => { console.log(files) }, [files]);

    const addDocument = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });
        formData.append("name", name);

        const response = await fetch("http://localhost:3000/api/addDocument", {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        console.log(response);
    }

    const isFormOpen = useRef(false);
    let timeout = null;

    const handleForm = () => {
        isFormOpen.current = !isFormOpen.current;

        if(timeout){
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
                "profile__aside profile__elements add_document"`;
            formAdd.current.style.display = 'block';
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
                        <AddFileIcon className="icon icon--add-file" onClick={handleForm} />
                    </div>

                    <form className="add-document close" onSubmit={addDocument} ref={formAdd}>
                        <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                        <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files))} />
                        <button type="submit">submit</button>
                    </form>
                </main>
            </div>
        </>
    );
}
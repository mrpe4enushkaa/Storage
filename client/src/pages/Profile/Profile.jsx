import React, { useLayoutEffect, useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../../components/UI/Background/Background';
import AsideBar from './components/AsideBar';
import ProfileUser from './components/ProfileUser';
import ProfileFiles from './components/ProfileFiles';
import LoopIcon from "../../images/Loop.svg?react";
import AddFileIcon from "../../images/AddFile.svg?react";
import ProfileSettings from './components/ProfileSettings';
import { UserContext } from './context/UserContext';
import FormAdd from './components/FormAdd';
import "./Profile.scss";

export default function Profile({ showToast }) {
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

    const [isPassword, setIsPassword] = useState(true);

    const setName = useRef("");
    const setPassword = useRef("");
    const setFiles = useRef([]);
    const buttonSubmit = useRef(null);

    const [isValidate, setIsValidate] = useState(false);

    const isFormOpen = useRef(false);
    let timeout = null;

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
                .then(data => setData(data));
        }
    }, [isDataLoaded, userData]);

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

    const addDocument = async (e) => {
        e.preventDefault();

        let goToGet = false;

        if (isValidate) {
            if (isPassword) {
                const response = await fetch("http://localhost:3000/api/addPassword", {
                    method: "POST",
                    body: JSON.stringify({
                        name: setName.current,
                        password: setPassword.current,
                        id: userData.decoded.id
                    }),
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const result = await response.json();

                goToGet = result.result;
            } else {
                const formData = new FormData();
                formData.append("name", setName.current);
                formData.append("id", userData.decoded.id);
                Array.from(setFiles.current).forEach(file => {
                    formData.append("files", file);
                });

                const response = await fetch("http://localhost:3000/api/addDocument", {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                });

                const result = await response.json();

                goToGet = result.result;
            }

            if (goToGet) {
                fetch("http://localhost:3000/api/getData", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: userData?.decoded?.id
                    })
                })
                    .then(response => response.json())
                    .then(data => setData(data));

                handleForm(true);
            }
        }
    }

    useEffect(() => {
        if (data && data.data) {
            setSearchData(data);
        }
    }, [data]);

    const open = () => {
        buttonSubmit.current.classList.remove('disabled');
        setIsValidate(true);
    }

    const close = () => {
        buttonSubmit.current.classList.add('disabled');
        setIsValidate(false);
    }

    const [searchState, setSearchState] = useState("");
    const [searchData, setSearchData] = useState({});

    const handleSearch = () => {
        if (searchState === "") {
            setSearchData(data);
            return;
        }

        setSearchData(data?.data?.filter((item) => searchState === item.name));
    };

    const [animationsKey, setAnimationsKey] = useState(localStorage.getItem("animations"));

    return (
        <UserContext.Provider value={userData}>
            <Background animationsKey={animationsKey} />
            <div className='wrapper'>
                <main className='profile' ref={profile}>
                    <section className='profile--elements'>
                        {isDataLoaded && (
                            <>
                                <ProfileUser userData={userData} userBlock={userBlock} data={data} />
                                <ProfileFiles filesBlock={filesBlock} data={searchData} />
                                <ProfileSettings settingsBlock={settingsBlock} setAnimationsKey={setAnimationsKey}/>
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
                        <input type="text" onInput={(e) => setSearchState(e.target.value)} placeholder='My_file...' className='profile__toolbar--input-search' />
                        <LoopIcon className="icon icon--search" onClick={handleSearch} />
                        <AddFileIcon className="icon icon--add-file"
                            onClick={() => {
                                handleForm(true);
                                formAdd.current.reset();
                                setIsPassword(true);
                                close();
                            }}
                        />
                    </div>

                    <FormAdd
                        setName={setName}
                        isPassword={isPassword}
                        setIsPassword={setIsPassword}
                        setFiles={setFiles}
                        addDocument={addDocument}
                        formAdd={formAdd}
                        setPassword={setPassword}
                        showToast={showToast}
                        buttonSubmit={buttonSubmit}
                        open={open}
                        close={close}
                        isValidate={isValidate}
                        setIsValidate={setIsValidate}
                    />
                </main>
            </div>
        </UserContext.Provider>
    );
}
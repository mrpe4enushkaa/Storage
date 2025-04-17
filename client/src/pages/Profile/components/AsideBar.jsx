import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../../images/Profile.svg?react';
import FilesIcon from '../../../images/Files.svg?react';
import SettingsIcon from '../../../images/Settings.svg?react';
import LogoutIcon from '../../../images/Logout.svg?react';
import HamburgerIcon from "../../../images/Hamburger.svg?react";
import CloseIcon from "../../../images/Close.svg?react";

export default function AsideBar({ profile, userBlock, filesBlock, settingsBlock, toolbar }) {
    const navigate = useNavigate();
    // const positionBlockInfo = useRef(null);
    const hamburgerButton = useRef(null);
    const closeButton = useRef(null);
    const indicator = useRef(null);
    const [barIsOpen, serBarIsOpen] = useState(false); //need to open or close popub under files icon

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/api/logout", {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();

        result ? navigate("/") : console.error("Something wrone...");
    }

    const handleOpenBar = () => {
        profile.current.classList.add("open");
        hamburgerButton.current.classList.add("hidden");
        closeButton.current.classList.remove("hidden");
    }

    const handleCloseBar = () => {
        profile.current.classList.remove("open");
        hamburgerButton.current.classList.remove("hidden");
        closeButton.current.classList.add("hidden");
    }

    const handleClickIcon = (e) => {
        const pos = e.target.getBoundingClientRect();
        indicator.current.style.top = `${pos.top - 18}px`;
    }

    const handleBlock = (type) => {
        userBlock.current.classList.add("hidden");
        filesBlock.current.classList.add("hidden");
        settingsBlock.current.classList.add("hidden");
        profile.current.classList.remove("files");
        toolbar.current.classList.remove("open");

        switch (type) {
            case "user":
                userBlock.current.classList.remove("hidden");
                break;
            case "files":
                filesBlock.current.classList.remove("hidden");
                toolbar.current.classList.add("open");
                profile.current.classList.add("files");
                break;
            case "settings":
                settingsBlock.current.classList.remove("hidden");
                break;
            default:
                console.error("Wrone type...");
                break;
        }
    }

    return (
        <aside className='profile__aside'>
            <div className='indicator' ref={indicator}></div>
            <nav className='conteiner-icon'>
                <div className='conteiner-button' ref={hamburgerButton} onClick={handleOpenBar} >
                    <HamburgerIcon className='icon icon--hamburger' />
                </div>
                <div className='conteiner-button hidden' ref={closeButton} onClick={handleCloseBar} >
                    <CloseIcon className='icon icon--close' />
                </div>
            </nav>
            <nav className='conteiner-icon' onClick={(e) => { handleClickIcon(e); handleBlock("user"); }}>
                <ProfileIcon className='icon icon--profile' />
                <span className='font-regular conteiner-icon__text'>Profile</span>
            </nav>
            <nav className='conteiner-icon' onClick={(e) => { handleClickIcon(e); handleBlock("files"); }}>
                <FilesIcon className='icon icon--files' />
                <span className='font-regular conteiner-icon__text' style={{ fontSize: "1.5rem", marginLeft: "3px", userSelect: 'none' }}>Files</span>
            </nav>
            <nav className='conteiner-icon' onClick={(e) => { handleClickIcon(e); handleBlock("settings"); }}>
                <SettingsIcon className='icon icon--settings' />
                <span className='font-regular conteiner-icon__text' >Settings</span>
            </nav>
            <nav className='conteiner-icon' onClick={handleLogout}>
                <LogoutIcon className='icon icon--logout' />
                <span className='font-regular conteiner-icon__text'>Logout</span>
            </nav>

            {/* <div className='info-block' ref={positionBlockInfo}></div> */}
        </aside>
    );
}

// const handleInfo = (e, last) => {
//     const pos = e.target.getBoundingClientRect();

//     if (e.target.tagName === 'svg') {
//         const rect = positionBlockInfo.current;
//         last !== undefined ? rect.style.top = `${pos.top - 42}px` : rect.style.top = `${pos.top - 33}px`;
//     }
// }
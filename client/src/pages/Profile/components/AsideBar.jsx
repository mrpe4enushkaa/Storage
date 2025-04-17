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
        profile.current.classList.add("profile--open");
        hamburgerButton.current.style.display = 'none';
        closeButton.current.style.display = 'block';
    };

    const handleCloseBar = () => {
        profile.current.classList.remove("profile--open");
        hamburgerButton.current.style.display = 'block';
        closeButton.current.style.display = 'none';
    };

    const handleClickIcon = (e) => {
        console.log(e.target)

        const pos = e.target.getBoundingClientRect();
        console.log(pos)
        indicator.current.style.top = `${pos.top - 18}px`;

    }

    const handleBlock = (type) => {
        userBlock.current.style.display = "none";
        filesBlock.current.style.display = "none";
        settingsBlock.current.style.display = "none";
        toolbar.current.style.display = "none";
        profile.current.classList.remove("profile--files");

        switch (type) {
            case "user":
                userBlock.current.style.display = "flex";
                break;
            case "files":
                filesBlock.current.style.display = "flex";
                toolbar.current.style.display = "block";
                profile.current.classList.add("profile--files");
                break;
            case "settings":
                settingsBlock.current.style.display = "flex";
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
                <div ref={hamburgerButton} onClick={handleOpenBar} >
                    <HamburgerIcon className='icon icon--hamburger' />
                </div>
                <div ref={closeButton} onClick={handleCloseBar} style={{ display: "none" }} >
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
import React, { useRef } from 'react';
import ProfileIcon from '../../../images/Profile.svg?react';
import FilesIcon from '../../../images/Files.svg?react';
import SettingsIcon from '../../../images/Settings.svg?react';
import LogoutIcon from '../../../images/Logout.svg?react';
import HamburgerIcon from "../../../images/Hamburger.svg?react";
import CloseIcon from "../../../images/Close.svg?react";

export default function AsideBar({ bar }) {
    // const positionBlockInfo = useRef(null);
    const hamburgerButton = useRef(null);
    const closeButton = useRef(null);
    const indicator = useRef(null);

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/api/logout", {
            method: "GET",
            credentials: "include"
        });

        const result = await response.json();

        result ? navigate("/") : console.error("Something wrone");
    }

    const handleOpenBar = () => {
        bar.current.classList.add("profile--open");
        hamburgerButton.current.style.display = 'none';
        closeButton.current.style.display = 'block';
    };

    const handleCloseBar = () => {
        bar.current.classList.remove("profile--open");
        hamburgerButton.current.style.display = 'block';
        closeButton.current.style.display = 'none';
    };

    const handleClickIcon = (e) => {
        const pos = e.target.getBoundingClientRect();
        indicator.current.style.top = `${pos.top - 18}px`;
    }

    return (
        <aside className='profile__aside'>
            <div className='indicator' ref={indicator}></div>
            <div className='conteiner-icon'>
                <div ref={hamburgerButton} onClick={handleOpenBar} >
                    <HamburgerIcon className='icon icon--hamburger' />
                </div>
                <div style={{ display: "none" }} ref={closeButton} onClick={handleCloseBar}>
                    <CloseIcon className='icon icon--close' />
                </div>
            </div>
            <div className='conteiner-icon' >
                <ProfileIcon className='icon icon--profile' onClick={(e) => handleClickIcon(e)} />
                <span className='font-regular' style={{ fontSize: "1.5rem", userSelect: 'none' }}>Profile</span>
            </div>
            <div className='conteiner-icon' >
                <FilesIcon className='icon icon--files' onClick={(e) => handleClickIcon(e)} />
                <span className='font-regular' style={{ fontSize: "1.5rem", marginLeft: "3px", userSelect: 'none' }}>Files</span>
            </div>
            <div className='conteiner-icon' >
                <SettingsIcon className='icon icon--settings' onClick={(e) => handleClickIcon(e)} />
                <span className='font-regular' style={{ fontSize: "1.5rem", userSelect: 'none' }}>Settings</span>
            </div>
            <div className='conteiner-icon' >
                <LogoutIcon className='icon icon--logout' onClick={handleLogout} />
                <span className='font-regular' style={{ fontSize: "1.5rem", userSelect: 'none' }}>Logout</span>
            </div>

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
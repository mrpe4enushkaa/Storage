import React, { useContext, useEffect, useRef } from "react";
import AddIcon from "../../../images/Add.svg?react";
import PencilIcon from "../../../images/Pencil.svg?react";
import DeleteIcon from "../../../images/Delete.svg?react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";

export default function ProfileSettings({ settingsBlock }) {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const checkboxRef = useRef(null);

    const handleAnimations = () => {
        let key = localStorage.getItem("animations");

        if (key === "false") {
            document.body.classList.remove("no-transition");
            localStorage.setItem("animations", "true");
            checkboxRef.current.checked = true;
        } else {
            document.body.classList.add("no-transition");
            localStorage.setItem("animations", "false");
            checkboxRef.current.checked = false;
        }
    };

    const handleDeleteAccount = async () => {
        const user_id = userContext.decoded.id;

        await fetch("http://localhost:3000/api/deleteAccount", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                id: user_id
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.delete === true) {
                    navigate("/");
                }
            })
    }

    useEffect(() => {
        if (!localStorage.getItem("animations")) {
            localStorage.setItem("animations", true);
        }

        handleAnimations();
    }, []);

    return (
        <section className='profile--settings hidden' ref={settingsBlock}>
            <div className="profile--settings__conteiner">
                <div className="profile--settings__user-data">
                    <div className="profile--settings__avatar"></div>
                    <nav className="profile--settings__user-data__data">
                        <span className="font-regular">Username</span>
                        <span className="font-regular">Password</span>
                        <span className="font-regular">Email</span>
                    </nav>
                </div>
                <div className="profile--settings__blocked">
                    <nav className="profile--settings__blocked--name">
                        <span className="font-regular">Blocked ip addresses</span>
                        <AddIcon className="icon icon--add" />
                    </nav>
                    <div className="profile--user__about--blocks profile--settings__blocked--blocks">
                        <div className="profile--user__about--block">
                            <span>321</span>
                            <span>dwsqdf</span>
                            <DeleteIcon className="icon icon--delete" />
                        </div>
                        <div className="profile--user__about--block">
                            <span>321</span>
                            <span>dwsqdf</span>
                            <DeleteIcon className="icon icon--delete" />
                        </div>
                        <div className="profile--user__about--block">
                            <span>321</span>
                            <span>dwsqdf</span>
                            <DeleteIcon className="icon icon--delete" />
                        </div>
                        <div className="profile--user__about--block">
                            <span>321</span>
                            <span>dwsqdf</span>
                            <DeleteIcon className="icon icon--delete" />
                        </div>
                    </div>
                </div>
                {/* <div className="profile--settings__theme">
                    <span className="font-regular profile--settings__theme--name">Theme</span>
                    <nav className="profile--settings__theme--conteiner">
                        <div className="profile--settings__theme--circle">
                            <span className="font-regular">L</span>
                        </div>
                        <div className="profile--settings__theme--circle selected">
                            <span className="font-regular">D</span>
                        </div>
                        <div className="profile--settings__theme--circle">
                            <span className="font-regular">S</span>
                        </div>
                    </nav>
                </div> */}
            </div>
            <div className="profile--settings__conteiner">
                {/* <div className="profile--settings__theme">
                    <span className="font-regular profile--settings__theme--name">Languages</span>
                    <nav className="profile--settings__theme--conteiner">
                        <div className="profile--settings__theme--circle">
                            <span className="font-regular">Ru</span>
                        </div>
                        <div className="profile--settings__theme--circle selected">
                            <span className="font-regular">En</span>
                        </div>
                        <div className="profile--settings__theme--circle">
                            <span className="font-regular">De</span>
                        </div>
                    </nav>
                </div> */}
                <div className="profile--settings__theme">
                    <span className="font-regular profile--settings__theme--name">Animations</span>
                    <nav className="profile--settings__theme--conteiner">
                        <input type="checkbox" className="profile--settings__theme--checkbox" onChange={handleAnimations} ref={checkboxRef}/>
                    </nav>
                </div>
                <div className="profile--settings__theme">
                    <span className="font-regular profile--settings__theme--name">Delete account</span>
                    <div className="profile--settings__theme--conteiner">
                        <button className="profile--settings--delete-button font-regular" onClick={handleDeleteAccount}>Delete</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
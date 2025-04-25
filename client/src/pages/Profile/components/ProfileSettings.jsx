import React, { useContext } from "react";
import AddIcon from "../../../images/Add.svg?react";
import PencilIcon from "../../../images/Pencil.svg?react";
import DeleteIcon from "../../../images/Delete.svg?react";
import { UserContext } from '../context/UserContext';

export default function ProfileSettings({ settingsBlock }) {
    const userContext = useContext(UserContext);

    const handleAnimations = () => document.body.classList.toggle("no-transition");

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
                <div className="profile--settings__theme">
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
                </div>
            </div>
            <div className="profile--settings__conteiner"></div>
        </section>
    );
}
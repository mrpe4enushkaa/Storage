import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import AddIcon from "../../../images/Add.svg?react";
import PencilIcon from "../../../images/Pencil.svg?react";
import DeleteIcon from "../../../images/Delete.svg?react";
import { UserContext } from '../context/UserContext';
import { data, useNavigate } from "react-router-dom";
import Edit from "../../../components/UI/Edit/Edit";
import User from "../../../components/UI/User/User";

export default function ProfileSettings({ settingsBlock, setAnimationsKey }) {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const checkboxRef = useRef(null);

    const [hoveredField, setHoveredField] = useState(null);

    const handleAnimations = () => {
        let key = localStorage.getItem("animations");

        if (key === "false") {
            document.body.classList.remove("no-transition");
            localStorage.setItem("animations", "true");
            checkboxRef.current.checked = true;
            setAnimationsKey("true");
        } else {
            document.body.classList.add("no-transition");
            localStorage.setItem("animations", "false");
            checkboxRef.current.checked = false;
            setAnimationsKey("false");
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

    useLayoutEffect(() => {
        getBlocks();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("animations")) {
            localStorage.setItem("animations", "true");
            setAnimationsKey("true")
        }

        handleAnimations();
    }, []);

    const [blocks, setBlocks] = useState([]);

    const getBlocks = () => {
        const user_id = userContext.decoded.id;

        fetch("http://localhost:3000/api/getBlocks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                id: user_id
            })
        })
            .then(response => response.json())
            .then(data => setBlocks(data.reverse()));
    }

    const dialogAdd = useRef(null);
    const inputIP = useRef(null);

    const handleAddNewIP = () => {
        const user_id = userContext.decoded.id;

        fetch("http://localhost:3000/api/addBlock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                ip: inputIP.current.value,
                id: user_id
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "success") {
                    getBlocks();
                    dialogAdd.current.close();
                    inputIP.current.value = "";
                }
            });
    }

    const deleteBlock = (id_user, id_ip) => {
        fetch("http://localhost:3000/api/deleteBlock", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                id_user, id_ip
            })
        })
            .then(response => response.json())
            .then(data => { if (data.message === "success") getBlocks() });
    }

    const dialogEdit = useRef(null);
    const [click, setClick] = useState("");

    return (
        <>
            <dialog ref={dialogAdd} className="dialogAddIp font-regular">
                <div className="dialogAddIp--conteiner">
                    <div className="dialogAddIp--block">
                        <svg onClick={() => dialogAdd.current.close()} className="icon-close" width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 42L42 1M1 1L42 42" stroke="black" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span className="dialogAddIp--text">Block an IP address</span>
                        <label htmlFor="add-ip" style={{ fontSize: "24px", marginTop: "5px" }}>An IP address</label>
                        <input type="text" id="add-ip" className="dialogAddIp--input" ref={inputIP} />
                        <button className="dialogAddIp--button" onClick={handleAddNewIP}>Add</button>
                    </div>
                </div>
            </dialog>
            <dialog ref={dialogEdit} className="dialogAddIp font-regular">
                <div className="dialogAddIp--conteiner">
                    <div className="dialogAddIp--block">
                        <svg onClick={() => dialogEdit.current.close()} className="icon-close" width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 42L42 1M1 1L42 42" stroke="black" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        {click === "avatar" ? <span>Avatar</span> :
                            click === "username" ? <span>Username</span> :
                                click === "email" ? <span>Email</span> :
                                    click === "password" ? <span>Password</span> :
                                        null}
                    </div>
                </div>
            </dialog>
            <section className='profile--settings hidden' ref={settingsBlock}>
                <div className="profile--settings__conteiner">
                    <div className="profile--settings__user-data">
                        <div
                            className="profile--settings__avatar"
                            onMouseEnter={() => setHoveredField("avatar")}
                            onMouseLeave={() => setHoveredField(null)}
                            style={{ position: "relative", display: "inline-block", width: "fit-content" }}
                        >
                            <User settings={true} />
                            <Edit dialogEdit={dialogEdit.current} visible={hoveredField === "avatar"} avatar={true} setClick={setClick} tag={hoveredField} />
                        </div>
                        <nav className="profile--settings__user-data__data">
                            <div
                                className="profile--settings__user-data__data-flex"
                                onMouseEnter={() => setHoveredField("username")}
                                onMouseLeave={() => setHoveredField(null)}
                            >
                                <span className="font-regular">Username: {userContext?.decoded?.username}</span>
                                <Edit dialogEdit={dialogEdit.current} visible={hoveredField === "username"} setClick={setClick} tag={hoveredField} />
                            </div>

                            <div
                                className="profile--settings__user-data__data-flex"
                                onMouseEnter={() => setHoveredField("email")}
                                onMouseLeave={() => setHoveredField(null)}
                            >
                                <span className="font-regular">Email: {userContext?.decoded?.email}</span>
                                <Edit dialogEdit={dialogEdit.current} visible={hoveredField === "email"} setClick={setClick} tag={hoveredField} />
                            </div>

                            <div
                                className="profile--settings__user-data__data-flex"
                                onMouseEnter={() => setHoveredField("password")}
                                onMouseLeave={() => setHoveredField(null)}
                            >
                                <span className="font-regular">Password: *******</span>
                                <Edit dialogEdit={dialogEdit.current} visible={hoveredField === "password"} setClick={setClick} tag={hoveredField} />
                            </div>
                        </nav>
                    </div>
                    <div className="profile--settings__blocked">
                        <nav className="profile--settings__blocked--name">
                            <span className="font-regular">Blocked ip addresses</span>
                            <AddIcon className="icon icon--add" onClick={() => dialogAdd.current.showModal()} />
                        </nav>
                        <div className="profile--user__about--blocks profile--settings__blocked--blocks font-regular">
                            {blocks.length > 0 ? blocks.map(item => (
                                <div className="profile--user__about--block" key={item.ID_IP}>
                                    <span>{item.IP}</span>
                                    <span>{new Date(item.UPLOADED).toLocaleString()}</span>
                                    <DeleteIcon className="icon icon--delete" onClick={() => deleteBlock(item.ID_USER, item.ID_IP)} />
                                </div>
                            )) : <span className="font-regular">No account blocks</span>}
                        </div>
                    </div>
                </div>
                <div className="profile--settings__conteiner">
                    <div className="profile--settings__theme">
                        <span className="font-regular profile--settings__theme--name">Animations</span>
                        <nav className="profile--settings__theme--conteiner">
                            <input type="checkbox" className="profile--settings__theme--checkbox" onChange={handleAnimations} ref={checkboxRef} />
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
        </>
    );
}
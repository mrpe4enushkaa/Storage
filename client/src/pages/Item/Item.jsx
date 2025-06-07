import React, { useState, useLayoutEffect, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Item.scss";
import Background from "../../components/UI/Background/Background";
import FileIcon from "../../images/File.svg?react";
import PasswordIcon from "../../images/Password.svg?react";
import BackIcon from "../../images/Logout.svg?react";

export default function Item() {
    const [userData, setUserData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({});

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
        if (userData?.decoded?.id) {
            fetch(`http://localhost:3000/api${window.location.pathname}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_user: userData?.decoded?.id
                })
            })
                .then(response => response.json())
                .then(data => { setData(data); console.log(data); });
        }
    }, [userData]);

    useEffect(() => {
        if (data && data?.error === true) {
            navigate("/error");
        }
    }, [data]);

    return (
        <>
            <Background />
            <div className="wrapper">
                <div className="wrapper__inner">
                    <BackIcon className="icon--item back" onClick={() => navigate("/profile")} />
                    <div className="wrapper__block">
                        {/* Or or (img) */}
                        <FileIcon className="icon--item" />
                        <PasswordIcon className="icon--item password" />
                        <span className="font-regular item--name">Name item</span>
                    </div>
                    <div className="wrapper__block">
                        {/* Or or (text) */}
                        <span className="font-regular">Description</span>
                    </div>
                </div>
            </div>
        </>
    );
}
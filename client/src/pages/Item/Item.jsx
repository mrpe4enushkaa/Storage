import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Item.scss";
import Background from "../../components/UI/Background/Background";
import FileIcon from "../../images/File.svg?react";
import PasswordIcon from "../../images/Password.svg?react";
import BackIcon from "../../images/Logout.svg?react";

export default function Item() {
    const [userData, setUserData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

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

    return (
        <>
            <Background />
            <div className="wrapper">
                <div className="wrapper__inner">
                    <BackIcon className="icon--item back" onClick={() => navigate("/profile")} />
                    <div className="wrapper__block">
                        <span>Page item</span>
                        <FileIcon className="icon--item" />
                        <PasswordIcon className="icon--item password" />
                    </div>
                    <div className="wrapper__block">
                        <span>;ldsfjk;lfsdj;l</span>
                    </div>
                </div>
            </div>
        </>
    );
}
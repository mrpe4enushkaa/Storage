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
            });
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

    useLayoutEffect(() => {
        if (data && data?.error === true) {
            navigate("/error");
        }
    }, [data]);

    const handleDownload = (src) => {
        window.location.href = src;
    }

    return (
        <>
            <Background />
            <div className="wrapper">
                <div className="wrapper__inner">
                    <BackIcon className="icon--item back" onClick={() => navigate("/profile")} />
                    <div className="wrapper__block">
                        {data.type === 'password'
                            ? <PasswordIcon className="icon--item password" />
                            : <FileIcon className="icon--item file" />}
                        <span className="font-regular item--name">{data.name}</span>
                    </div>
                    <div className="wrapper__block items">
                        {data && data?.type === "document" ?
                            <span className="item--description font-regular">Document(s)</span> :
                            <span className="item--description font-regular">Password</span>}
                        <div className="item--div-item">
                            {data?.files?.map((src, index) => {
                                return <button className="item--button font-regular" key={index} onClick={() => handleDownload(src)}>Document {index + 1}</button>
                            })}
                            {data?.password && <span className="item--password font-regular">{data?.password}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
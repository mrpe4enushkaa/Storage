import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../components/UI/Background/Background";
import MainBlock from "./components/MainBlock";
import "./Identification.scss";

export default function Indentification({ showToast }) {
    const [userData, setUserData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        fetch("http://localhost:3000/api/rights", {
            method: "GET",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                setUserData(data.data);
                setIsDataLoaded(true);
            });
    }, []);

    useLayoutEffect(() => {
        if (isDataLoaded && (userData?.rights && userData?.decoded)) {
            navigate("/profile");
        }
    }, [userData]);

    document.title = "Identification";

    return (
        <div className="indentification--inner">
            <Background />
            <MainBlock showToast={showToast} />
        </div>
    );
}
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../../components/UI/Background/Background";
import MainBlock from "./components/MainBlock";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Identification.scss";

export default function Indentification() {
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

    useEffect(() => {
        if (isDataLoaded && (userData?.rights && userData?.decoded)) {
            navigate("/profile");
        }
    }, [userData]);

    return (
        <div className="indentification--inner">
            <Background />
            <MainBlock showToast={showToast} />
            <ToastContainer
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

const showToast = (type, text) => {
    switch (type) {
        // case "info":
        //     toast.info();
        //     break;
        case "success":
            toast.success(text);
            break;
        case "warning":
            toast.warn(text);
            break;
        case "error":
            toast.error(text);
            break;
        default:
            break;
    }
};
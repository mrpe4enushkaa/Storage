import React from "react";
import Background from "../../components/UI/Background/Background";
import MainBlock from "./components/MainBlock";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Identification.scss";

export default function Indentification() {
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
import React from "react";
import Background from "../../components/UI/Background/Background";
import MainBlock from "../../components/Indentification/MainBlock";
// import "./Indefication.scss";

export default function Identification() {
    return (
        <div style={{ position: "relative", height: '100vh' }}>
            <Background />
            <MainBlock />
        </div>
    );
}
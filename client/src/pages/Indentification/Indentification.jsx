import React from "react";
import Background from "../../components/UI/Background/Background";
import MainBlock from "../../components/Indentification/MainBlock";
import "./Indentification.scss";

export default function Indentification() {
    return (
        <div className="indentification--inner">
            <Background />
            <MainBlock />
        </div>
    );
}
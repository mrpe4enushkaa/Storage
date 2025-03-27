import React, { useEffect, useState } from "react";
import Background from "../../components/UI/Background/Background";
import MainBlock from "./components/MainBlock";
import "./Identification.scss";

export default function Indentification() {
    return (
        <div className="indentification--inner">
            <Background />
            <MainBlock />
        </div>
    );
}
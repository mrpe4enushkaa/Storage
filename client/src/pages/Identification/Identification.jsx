import React, { useEffect, useState } from "react";
import Background from "../../components/UI/Background/Background";
import MainBlock from "../../components/Identification/MainBlock";
import "./Identification.scss";

export default function Indentification() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    });

    return (
        <div className="indentification--inner">
            <Background />
            {isReady === true && <MainBlock />}
        </div>
    );
}
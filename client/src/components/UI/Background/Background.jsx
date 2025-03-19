import React from "react";
import Threads from "../../react-bits/Threads/Threads";
import './Background.scss'

export default function Background() {
    return (
        <div className="conteiner">
            <Threads
                amplitude={2}
                distance={1.4}
                enableMouseInteraction={true}
                color={[255, 255, 255]}
            />
        </div>
    );
}
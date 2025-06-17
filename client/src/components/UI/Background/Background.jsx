import { useEffect } from "react";
import Threads from "../../react-bits/Threads/Threads";
import './Background.scss'
import { useState } from "react";

export default function Background({ animationsKey }) {
    const [amplitude, setAmplitude] = useState(2);

    useEffect(() => {
        if (animationsKey === "false") {
            setAmplitude(0);
        } else {
            setAmplitude(2);
        }
    }, [animationsKey]);

    return (
        <div className="conteiner">
            <Threads
                amplitude={amplitude}
                distance={1.4}
                enableMouseInteraction={false}
                color={[255, 255, 255]}
            />
        </div>
    );
}
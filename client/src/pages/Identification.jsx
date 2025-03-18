import React from "react";
import Threads from "../components/UI/Threads/Threads";
import SpotlightCard from "../components/UI/SpotlightCard/SpotlightCard";
import Stepper, { Step } from "../components/UI/Stepper/Stepper"

export default function Identification() {
    return (
        <>
            <div style={{ position: "relative" }}>
                <div style={{ width: '100%', height: '99vh', position: 'absolute' }}>
                    <Threads
                        amplitude={2}
                        distance={1.4}
                        enableMouseInteraction={true}
                        color={[255, 255, 255]}
                    />
                </div>
            </div>
            <Stepper initialStep={1}>
                <Step>
                    <h1 style={{ color: "#fff" }}>Hello</h1>
                </Step>
                <Step>
                    <h1 style={{ color: "#fff" }}>Bye</h1>
                </Step>
            </Stepper>
        </>
    );
}
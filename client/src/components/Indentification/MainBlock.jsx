import React, { useState } from "react";
import Stepper, { Step } from "../react-bits/Stepper/Stepper";
import FadeContent from "../react-bits/FadeContent/FadeContent";
import Block from "./Block";
import Form from "./Form";

export default function MainBlock() {
    const fadeDuration = 1000;
    const [isSignIn, setSignIn] = useState(true);

    return (
        <Stepper initialStep={1} disableStepIndicators={true}>
            <Step>
                <FadeContent duration={fadeDuration}>
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: "flex-start" }}>
                        <span className="splite-text font-medium" style={{ color: "#fff", fontSize: "2rem" }}>Welcome to the storage!</span>
                        <span className="font-regular" style={{ color: "#fff", fontSize: "1rem", marginTop: "10px" }}>Please sign in to continue or sign up if you don’t have an account.</span>
                    </div>
                </FadeContent>
            </Step>
            <Step>
                <FadeContent duration={fadeDuration}>
                    <Form isSignIn={isSignIn} setSignIn={setSignIn}/>
                </FadeContent>
            </Step>
            <Step>
                <FadeContent duration={fadeDuration}>
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: "flex-start" }}>
                        <span style={{ color: "#fff", fontSize: "2rem" }} className="font-medium">Welcome, [Name]!</span>
                        <span className="font-regular" style={{ color: "#fff", fontSize: "1rem", marginTop: "10px" }}>Your storage is ready.</span>
                    </div>
                </FadeContent>
            </Step>
        </Stepper>
    );
}
import React from "react";
import { Step } from "../react-bits/Stepper/Stepper";
import FadeContent from "../react-bits/FadeContent/FadeContent";

export default function Block({ children }) {
    const fadeDuration = 1000;

    return (
        <Step>
            <FadeContent duration={fadeDuration}>
                {children}
            </FadeContent>
        </Step>
    );
}
import React from "react";
import { Step } from "../../react-bits/Stepper/Stepper";
import FadeContent from "../../react-bits/FadeContent/FadeContent";

export default function StepContainer({ children }) {
    const fadeDuration = 700;

    return (
        <Step>
            <FadeContent duration={fadeDuration}>
                {children}
            </FadeContent>
        </Step>
    );
}
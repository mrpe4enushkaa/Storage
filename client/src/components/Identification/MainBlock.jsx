import React, { useEffect, useState } from "react";
import Stepper from "../react-bits/Stepper/Stepper";
import StepContainer from "../UI/StepContainer/StepContainer";
import Indentificator from "./Identificator";
import Block from "../UI/Block/Block";

export default function MainBlock() {
    const [isSignIn, setSignIn] = useState(true);

    return (
        <Stepper initialStep={1} disableStepIndicators={true} >
            <StepContainer key="welcome">
                <Block
                    heading="Welcome to the storage!"
                    text="Please sign in to continue or sign up if you don’t have an account"
                />
            </StepContainer>
            <StepContainer key="form">
                <Indentificator isSignIn={isSignIn} setSignIn={setSignIn} />
            </StepContainer>
            <StepContainer key="hello">
                <Block
                    heading="Welcome, [Name]!"
                    text="Your storage is ready"
                />
            </StepContainer>
        </Stepper>
    );
}
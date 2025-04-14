import React, { useState } from "react";
import Stepper from "../../../components/react-bits/Stepper/Stepper";
import StepContainer from "../../../components/UI/StepContainer/StepContainer";
import Indentificator from "./Identificator";
import Block from "../../../components/UI/Block/Block";
import Loader from "../../../components/UI/Loader/Loader";
import { useIdentification } from "../hooks/useIdentification";

export default function MainBlock({ showToast }) {
    const [isSignIn, setSignIn] = useState(true);
    const [validate, setValidate] = useState({});
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);

    useIdentification(isSignIn, validate, data, step, setStep, showToast);

    return (
        <Stepper
            initialStep={step}
            disableStepIndicators={true}
            onStepChange={(step) => setStep(step)}
        >
            <StepContainer key="welcome">
                <Block
                    heading="Welcome to the storage!"
                    text="Please sign in to continue or sign up if you don’t have an account"
                />
            </StepContainer>
            <StepContainer key="form">
                <Indentificator
                    isSignIn={isSignIn} setSignIn={setSignIn}
                    validate={validate} setValidate={setValidate}
                    data={data} setData={setData}
                />
                <Loader />
            </StepContainer>
            <StepContainer key="hello">
                <Block
                    heading={`Hello, ${data.username}!`}
                    text="Your storage is ready"
                />
            </StepContainer>
        </Stepper>
    );
}
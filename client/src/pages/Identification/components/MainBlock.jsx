import React, { useLayoutEffect, useState } from "react";
import Stepper from "../../../components/react-bits/Stepper/Stepper";
import StepContainer from "../../../components/UI/StepContainer/StepContainer";
import Indentificator from "./Identificator";
import Block from "../../../components/UI/Block/Block";
import { handleCheckUser } from "../../../utils/handleCheckUser";
import { useAuthForm } from "../../../hooks/useAuthForm";

export default function MainBlock() {
    const { isSignIn, setSignIn, validate, setValidate, data, setData, step, setStep } = useAuthForm(handleCheckUser);

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
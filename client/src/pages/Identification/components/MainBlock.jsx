import React, { useLayoutEffect, useState } from "react";
import Stepper from "../../../components/react-bits/Stepper/Stepper";
import StepContainer from "../../../components/UI/StepContainer/StepContainer";
import Indentificator from "./Identificator";
import Block from "../../../components/UI/Block/Block";

export default function MainBlock() {
    const [isSignIn, setSignIn] = useState(true);
    const [validate, setValidate] = useState({});
    const [data, setData] = useState({});
    const [step, setStep] = useState(1);

    useLayoutEffect(() => {
        console.log(validate);
        if (step === 2) {
            if (
                !validate?.username ||
                !validate?.password ||
                (validate?.email !== undefined && !validate.email) ||
                (validate?.repeatPassword !== undefined && !validate.repeatPassword)
            ) {
                document.querySelector('.next-button').disabled = true;
            } else {
                document.querySelector('.next-button').disabled = false;
            }
        }
        if (step === 3) {
            document.querySelector('.back-button').disabled = true;
            document.querySelector('.back-button').innerHTML = '';
        }
    }, [validate, step])

    return (
        <Stepper
            initialStep={1}
            disableStepIndicators={true}
            onStepChange={(step) => setStep(step)}>
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
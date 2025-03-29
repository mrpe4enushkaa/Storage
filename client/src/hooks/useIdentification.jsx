import React, { useLayoutEffect } from "react";
import { handleAddUser } from "../utils/handleAddUser";
import { handleCheckUser } from "../utils/handleCheckUser";

export const useIdentification = (isSignIn, validate, data, step, setStep) => {
    useLayoutEffect(() => {
        const button = document.querySelector('.next-button');

        const normalButtonNext = () => {
            const button = document.querySelector('.next-button');

            button.style.border = "none";
            button.style.background = "#fff";
            button.style.color = "#000";
        }

        const errorButtonNext = () => {
            const button = document.querySelector('.next-button');

            button.style.border = "2px solid #fff";
            button.style.background = "transparent";
            button.style.color = "#fff";
        }

        const handleValidation = async (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (isSignIn) {
                if (!validate?.username || !validate?.password) {
                    errorButtonNext();
                    return;
                }

                const responseOfCheck = await handleCheckUser(data.username, data.password);

                if (responseOfCheck === false) {
                    errorButtonNext();
                    return;
                }

                normalButtonNext();

                setStep(3);
            } else {
                if (
                    !validate?.username || !validate?.password ||
                    !validate.email || !validate.repeatPassword
                ) {
                    errorButtonNext();
                    return;
                }
                const responseOfCreation = await handleAddUser(data.email, data.username, data.password);

                if (!responseOfCreation) {
                    errorButtonNext();
                    return;
                }

                normalButtonNext();

                setStep(3);
            }
        };

        const Reload = () => {
            window.location.reload();
        }

        if (step === 1) {
            button.style.border = "none";
            button.style.background = "#fff";
            button.style.color = "#000";
        }

        if (step === 2) {
            button.addEventListener("click", handleValidation);

            return () => {
                button.removeEventListener("click", handleValidation);
            };
        }

        if (step === 3) {
            document.querySelector('.back-button').disabled = true;
            document.querySelector('.back-button').innerHTML = '';
            
            button.addEventListener('click', Reload);
        }
    }, [validate, step]);
}
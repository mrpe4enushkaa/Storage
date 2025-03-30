import React, { useLayoutEffect } from "react";
import { handleAddUser } from "../utils/handleAddUser";
import { handleCheckUser } from "../utils/handleCheckUser";

export const useIdentification = (isSignIn, validate, data, step, setStep, showToast) => {

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

            button.style.border = "2px solid rgb(34, 34, 34)";
            button.style.background = "transparent";
            button.style.color = "#fff";
        }

        const handleValidation = async (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (isSignIn) {
                if (!validate?.username || !validate?.password) {
                    if (!validate?.username) {
                        showToast("error", "The username must contain from 3 to 30 characters.");
                    } 
                    else if (!validate?.password) {
                        showToast("error", "The password must contain from 6 to 30 characters.");
                    }
                    errorButtonNext();
                    return;
                }

                const responseOfCheck = await handleCheckUser(data.username, data.password);

                if (responseOfCheck === false) {
                    showToast("error", "The user was not found");
                    errorButtonNext();
                    return;
                }

                normalButtonNext();
                showToast("success", `Hello ${data.username}`);
                setStep(3);
            } else {
                if (
                    !validate.email || !validate?.username ||
                    !validate?.password || !validate.repeatPassword
                ) {
                    if (!validate.email) {
                        showToast("error", "Incorrectly entered email.");
                    } else if(!validate?.username){
                        showToast("error", "The username must contain from 3 to 30 characters.");
                    } else if(!validate?.password){
                        showToast("error", "The password must contain from 6 to 30 characters.");
                    } else if (!validate.repeatPassword) {
                        showToast("error", "Passwords must match.");
                    }
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

        const Reload = async () => {
            return new Promise((resolve) => {
                resolve(setTimeout(() => { window.location.reload(); }, 500));
            });
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
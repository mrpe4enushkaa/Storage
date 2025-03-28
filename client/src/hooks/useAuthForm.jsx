import { useState, useLayoutEffect } from "react";

export function useAuthForm(handleCheckUser, initialData = {}) {
    const [isSignIn, setSignIn] = useState(true);
    const [validate, setValidate] = useState({});
    const [data, setData] = useState(initialData);
    const [step, setStep] = useState(1);

    useLayoutEffect(() => {
        const button = document.querySelector('.next-button');

        const handleValidation = async (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (
                !validate?.username ||
                !validate?.password ||
                (validate?.email !== undefined && !validate.email) ||
                (validate?.repeatPassword !== undefined && !validate.repeatPassword)
            ) {
                button.style.border = "2px solid #fff";
                button.style.background = "transparent";
                button.style.color = "#fff";
                return;
            }

            let user = await handleCheckUser();
            console.log(user);

            if (user === false) {
                button.style.border = "2px solid #fff";
                button.style.background = "transparent";
                button.style.color = "#fff";
                return;
            }

            button.style.border = "none";
            button.style.background = "#fff";
            button.style.color = "#000";
            setStep(3);
        };

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
        }
    }, [validate, step]);

    return { isSignIn, setSignIn, validate, setValidate, data, setData, step, setStep };
}
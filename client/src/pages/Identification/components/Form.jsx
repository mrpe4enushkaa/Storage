import React, { useLayoutEffect } from "react";
import Input from "../../../components/UI/Input/Input";

export default function Form({ settings, data, setData, validate, setValidate }) {
    useLayoutEffect(() => {
        const newInputs = { ...settings?.inputs };
        setData(newInputs);
        setValidate(Object.fromEntries(Object.keys(newInputs).map(key => [key, false])));
    }, [JSON.stringify(settings)]);

    const validateForm = () => {
        const validateEmail = (email) => {
            const symbols = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setValidate(prev => ({ ...prev, email: symbols.test(email) }));
        };

        const validateUsername = (username) => {
            const hasSymbols = (name) => /[^a-zA-Z0-9_]/.test(name);
            setValidate(prev => ({ ...prev, username: username.length >= 3 && username.length <= 20 && !hasSymbols(username) }));
        };

        const validatePassword = (password) => {
            password = String(password);
            const isValid = password.length >= 6 && password.length <= 30;
            setValidate(prev => ({ ...prev, password: isValid }));
            return isValid;
        };

        const validateRepeatPassword = (password, repeatPassword) => {
            if (!validatePassword(repeatPassword) || repeatPassword !== password) {
                setValidate(prev => ({ ...prev, repeatPassword: false }));
            } else {
                setValidate(prev => ({ ...prev, repeatPassword: true }));
            }
        };

        if (settings.email) {
            validateEmail(data.email);
        }
        validateUsername(data.username);
        validatePassword(data.password);
        if (settings.repeatPassword) {
            validateRepeatPassword(data.password, data.repeatPassword);
        }
    }

    return (
        <form className="block--center font-regular" id="form-indefication">
            <span className="heading font-medium">{settings?.name}</span>

            {settings?.email && (
                <Input label="Email" id="email" type="email"
                    value={data?.email || ""} name="email" setData={setData}
                    validate={validateForm}
                />
            )}

            <Input label="Username" id="login" type="text"
                value={data?.username || ""} name="username" setData={setData}
                validate={validateForm}
            />

            <Input label="Password" id="password"
                type="password" value={data?.password || ""} name="password" setData={setData}
                validate={validateForm}
            />

            {settings.repeatPassword && (
                <Input label="Repeat the password" id="password-repeat" type="password"
                    value={data?.repeatPassword || ""} name="repeatPassword" setData={setData}
                    validate={validateForm}
                />
            )}
        </form>
    );
}
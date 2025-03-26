import React, { useEffect } from "react";

export default function Form({ settings, data, setData }) {
    useEffect(() => {
        const newInputs = { ...settings?.inputs };
        setData(newInputs);
    }, [JSON.stringify(settings)]);

    const validateEmail = (email) => {
        const symbols = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return symbols.test(email);
    };

    const validateUsername = (username) => {
        const hasSymbols = (name) => /[^a-zA-Z0-9_]/.test(name);

        return username.length >= 3 && username.length <= 20 && !hasSymbols(username);
    };

    const validatePassword = (password) => {
        password = String(password);
        return password.length >= 6 && password.length <= 30;
    }

    const validateRepeatPassword = (target, password, repeatPassword) => {
        if (!validatePassword(repeatPassword) && repeatPassword.toUpperCase() !== password.toUpperCase()) {
            target.classList.toggle('input--error');
        } else {
            target.classList.toggle('input--error');
        }
    }

    return (
        <form className="block--center font-regular" id="form-indefication">
            <span className="heading font-medium">{settings?.name}</span>

            {settings?.email && (
                <>
                    <label htmlFor="email">Email</label>
                    <input
                        key="email"
                        id="email"
                        type="email"
                        value={data?.email || ""}
                        onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                    // onBlur={(e) => { console.log(validateEmail(e.target.value)) }}
                    />
                </>
            )}

            <label htmlFor="login">Username</label>
            <input
                key="username"
                id="login"
                type="text"
                value={data?.username || ""}
                onChange={(e) => setData(prev => ({ ...prev, username: e.target.value }))}
            // onBlur={(e) => { console.log(validateUsername(e.target.value)) }}
            />

            <label htmlFor="password">Password</label>
            <input
                key="password"
                id="password"
                type="password"
                value={data?.password || ""}
                onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
            // onBlur={(e) => { console.log(validatePassword(e.target.value), validateRepeatPassword(e.target.value, data?.repeatPassword)); }}
            />

            {settings.repeatPassword && (
                <>
                    <label htmlFor="password-repeat">Repeat the password</label>
                    <input
                        key="repeatPassword"
                        id="repeatPassword"
                        type="password"
                        value={data?.repeatPassword || ""}
                        onChange={(e) => setData(prev => ({ ...prev, repeatPassword: e.target.value }))}
                    // onBlur={(e) => { validateRepeatPassword(e.target, data.password, e.target.value); }}
                    />
                </>
            )}
        </form>
    );
}
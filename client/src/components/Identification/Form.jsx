import React, { useEffect, useState } from "react";

export default function Form({ data, dataFor }) {
    const [formData, setFormData] = useState(dataFor);

    useEffect(() => {
        setFormData(dataFor);
    }, [dataFor]);

    const validateEmail = (email) => {
        const symbols = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return symbols.test(email);
    };

    const validateUsername = (username) => {
        const hasSymbols = (name) => /[^a-zA-Z0-9_]/.test(name);

        return username.length >= 3 && username.length <= 20 && !hasSymbols(username);
    };

    const validatePassword = (password) => {
        return password.length >= 6 && password.length <= 30;
    }

    const validateRepeatPassword = (password, repeatPassword) => {
        return validatePassword(repeatPassword) && repeatPassword.toUpperCase() === password.toUpperCase();
    }

    return (
        <form className="block--center font-regular" id="form-indefication">
            <span className="heading font-medium">{data.name}</span>

            {data?.email && (
                <>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        onBlur={(e) => { console.log(validateEmail(e.target.value)) }}
                    />
                </>
            )}

            <label htmlFor="login">Username</label>
            <input
                id="login"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                onBlur={(e) => { console.log(validateUsername(e.target.value)) }}
            />

            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                onBlur={(e) => { console.log(validatePassword(e.target.value), validateRepeatPassword(e.target.value, formData?.repeatPassword)); }}
            />

            {data?.repeatPassword && (
                <>
                    <label htmlFor="password-repeat">Repeat the password</label>
                    <input
                        id="password-repeat"
                        type="password"
                        value={formData.repeatPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, repeatPassword: e.target.value }))}
                        onBlur={(e) => { console.log(validateRepeatPassword(formData.password, e.target.value)); }}
                    />
                </>
            )}
        </form>
    );
}
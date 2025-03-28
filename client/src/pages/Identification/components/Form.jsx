import React, { useLayoutEffect } from "react";
import { validateForm } from "../../../utils/validateForm";
import Input from "../../../components/UI/Input/Input";

export default function Form({ settings, data, setData, validate, setValidate }) {
    useLayoutEffect(() => {
        const newInputs = { ...settings?.inputs };
        setData(Object.fromEntries(Object.keys(newInputs).map(key => [key, ""])));
        setValidate(Object.fromEntries(Object.keys(newInputs).map(key => [key, false])));
    }, [JSON.stringify(settings)]);

    return (
        <form className="block--center font-regular" id="form-indefication">
            <span className="heading font-medium">{settings?.name}</span>

            {settings?.email && (
                <Input label="Email" id="email" type="email"
                    value={data?.email || ""} name="email" setData={setData}
                    validate={() => validateForm(data, settings, setValidate)}
                />
            )}

            <Input label="Username" id="login" type="text"
                value={data?.username || ""} name="username" setData={setData}
                validate={() => validateForm(data, settings, setValidate)}
            />

            <Input label="Password" id="password"
                type="password" value={data?.password || ""} name="password" setData={setData}
                validate={() => validateForm(data, settings, setValidate)}
            />

            {settings.repeatPassword && (
                <Input label="Repeat the password" id="password-repeat" type="password"
                    value={data?.repeatPassword || ""} name="repeatPassword" setData={setData}
                    validate={() => validateForm(data, settings, setValidate)}
                />
            )}
        </form>
    );
}
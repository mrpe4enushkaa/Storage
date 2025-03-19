import React from "react";

export default function Form({ data }) {
    return (
        <form className="block--center" id="form-indefication">
            <span className="heading font-medium">{data.name}</span>

            {data.email === true &&
                (<>
                    <label htmlFor="email" className="font-regular">Email</label>
                    <input id="email" type="text" className="font-regular" />
                </>)}

            <label htmlFor="login" className="font-regular">Username</label>
            <input id="login" type="text" className="font-regular" />
            <label htmlFor="password" className="font-regular">Password</label>
            <input id="password" type="text" className="font-regular" />

            {data.repeatPassword === true && (<>
                <label htmlFor="password-repeat" className="font-regular">Repeat the password</label>
                <input id="password-repeat" type="text" className="font-regular" />
            </>)}
        </form>
    );
}
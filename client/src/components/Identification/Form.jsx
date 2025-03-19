import React from "react";

export default function Form({ data }) {
    return (
        <form className="block--center font-regular" id="form-indefication">
            <span className="heading font-medium">{data.name}</span>

            {data.email === true &&
                (<>
                    <label htmlFor="email" >Email</label>
                    <input id="email" type="text" />
                </>)}

            <label htmlFor="login" >Username</label>
            <input id="login" type="text" />
            <label htmlFor="password" >Password</label>
            <input id="password" type="text" />

            {data.repeatPassword === true && (<>
                <label htmlFor="password-repeat" >Repeat the password</label>
                <input id="password-repeat" type="text" />
            </>)}
        </form>
    );
}
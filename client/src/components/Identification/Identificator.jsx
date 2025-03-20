import React, { useState } from "react";
import Form from "./Form";

export default function Indentificator({ isSignIn, setSignIn }) {
    const [keyForm, setKeyForm] = useState(0);

    return (
        <>
            {isSignIn ? (
                <Form
                    data={{ name: "Sign in" }}
                    dataFor={{
                        username: "",
                        password: ""
                    }}
                    key={keyForm}
                />
            ) : (
                <Form
                    data={{
                        name: "Sign up",
                        email: true,
                        repeatPassword: true
                    }}
                    dataFor={{
                        email: "",
                        username: "",
                        password: "",
                        repeatPassword: ""
                    }}
                    key={keyForm}
                />
            )}

            <button
                onClick={() => {
                    setSignIn(!isSignIn);
                    setKeyForm(prev => prev + 1);
                }}
                className="toggleIndentification font-regular"
            >
                {isSignIn ? "Don't have an account? Sign up" : "Do you have an account? Sign in"}
            </button>
        </>
    );
}
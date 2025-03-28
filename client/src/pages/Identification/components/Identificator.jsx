import React from "react";
import Form from "./Form";

export default function Indentificator({ isSignIn, setSignIn, validate, setValidate, data, setData }) {
    return (
        <>
            {isSignIn ? (
                <Form
                    key={1}
                    settings={{
                        name: "Sign in",
                        email: false,
                        repeatPassword: false,
                        inputs: {
                            username: "",
                            password: ""
                        }
                    }}
                    data={data}
                    setData={setData}
                    validate={validate}
                    setValidate={setValidate}
                />
            ) : (
                <Form
                    key={2}
                    settings={{
                        name: "Sign up",
                        email: true,
                        repeatPassword: true,
                        inputs: {
                            email: "",
                            username: "",
                            password: "",
                            repeatPassword: ""
                        }
                    }}
                    data={data}
                    setData={setData}
                    validate={validate}
                    setValidate={setValidate}
                />
            )}

            <button
                onClick={() => {
                    setSignIn(!isSignIn);
                }}
                className="toggleIndentification font-regular"
                id="changeForm"
            >
                {isSignIn ? "Don't have an account? Sign up" : "Do you have an account? Sign in"}
            </button>
        </>
    );
}
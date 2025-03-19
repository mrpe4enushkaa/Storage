import React from "react";
import Form from "./Form";

export default function Indentificator({ isSignIn, setSignIn }) {
    return (
        <>
            {isSignIn ? (
                <Form data={{name: "Sign in"}} />
            ) : (
                <Form
                    data={{
                        name: "Sign up",
                        email: true,
                        repeatPassword: true
                    }}
                />
            )}

            <button
                onClick={(e) => {
                    setSignIn(!isSignIn);
                    document.querySelectorAll('#form-indefication').forEach(form => form.reset());
                }}
                className="toggleIndentification font-regular"
            >
                {isSignIn ? "Don't have an account? Sign up" : "Do you have an account? Sign in"}
            </button>
        </>
    );
}
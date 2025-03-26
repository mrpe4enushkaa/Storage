import React, { useState } from "react";
import Form from "./Form";

export default function Indentificator({ isSignIn, setSignIn }) {
    const [data, setData] = useState({});
    const [keyForm, setKeyForm] = useState(0);

    return (
        <>
            {isSignIn ? (
                <Form
                    key={keyForm}
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
                />
            ) : (
                <Form
                    key={keyForm}
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
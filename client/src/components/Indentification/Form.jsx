import React from "react";

export default function Form({ isSignIn, setSignIn }) {
    return (
        <>
            {isSignIn ? (
                <form id="form-indefication" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className="font-medium" style={{ fontSize: "2rem", color: "#fff", marginBottom: "20px" }}>Sign in</span>
                    <label htmlFor="login" className="font-regular" style={{ fontSize: "1.3rem", color: "#fff" }}>Username</label>
                    <input id="login" type="text" className="font-regular" style={{ width: "91%", height: "35px", borderRadius: "20px", border: "none", marginBottom: "15px", outline: "none", padding: "0 15px" }} />
                    <label htmlFor="password" className="font-regular" style={{ fontSize: "1.3rem", color: "#fff" }}>Password</label>
                    <input id="password" type="text" className="font-regular" style={{ width: "91%", height: "35px", borderRadius: "20px", border: "none", outline: "none", padding: "0 15px" }} />
                </form>
            ) : (
                <form id="form-indefication" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span className="font-medium" style={{ fontSize: "2rem", color: "#fff", marginBottom: "20px" }}>Sign in</span>
                    <label htmlFor="email" className="font-regular" style={{ fontSize: "1.3rem", color: "#fff" }}>Email</label>
                    <input id="email" type="text" className="font-regular" style={{ width: "91%", height: "35px", borderRadius: "20px", border: "none", outline: "none", padding: "0 15px", marginBottom: "15px" }} />
                    <label htmlFor="login" className="font-regular" style={{ fontSize: "1.3rem", color: "#fff" }}>Username</label>
                    <input id="login" type="text" className="font-regular" style={{ width: "91%", height: "35px", borderRadius: "20px", border: "none", marginBottom: "15px", outline: "none", padding: "0 15px" }} />
                    <label htmlFor="password" className="font-regular" style={{ fontSize: "1.3rem", color: "#fff" }}>Password</label>
                    <input id="password" type="text" className="font-regular" style={{ width: "91%", height: "35px", borderRadius: "20px", border: "none", outline: "none", padding: "0 15px" }} />
                    <label htmlFor="password-repeat" className="font-regular" style={{ fontSize: "1.3rem", color: "#fff", marginTop: "15px" }}>Repeat the password</label>
                    <input id="password-repeat" type="text" className="font-regular" style={{ width: "91%", height: "35px", borderRadius: "20px", border: "none", outline: "none", padding: "0 15px" }} />
                </form>
            )}

            <button
                onClick={(e) => {
                    setSignIn(!isSignIn);
                    document.querySelectorAll('#form-indefication').forEach(form => form.reset());
                }}
                style={{ background: "none", border: "none", color: "#fff", fontSize: "1rem", marginTop: "25px", cursor: "pointer", textDecoration: "underline" }}
                className="font-regular"
            >
                {isSignIn ? "Don't have an account? Sign up" : "Do you have an account? Sign in"};
            </button>
        </>
    );
}
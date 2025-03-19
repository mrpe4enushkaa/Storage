import React, { useState } from "react";
import Threads from "../components/UI/Threads/Threads";
import SpotlightCard from "../components/UI/SpotlightCard/SpotlightCard";
import Stepper, { Step } from "../components/UI/Stepper/Stepper"
import SplitText from "../components/UI/SplitText/SplitText";
import FadeContent from "../components/UI/FadeContent/FadeContent";

export default function Identification() {
    const fadeDuration = 1000;
    const [isSignIn, setSignIn] = useState(true);

    return (
        <>
            <div style={{ position: "relative", height: '100vh' }}>
                <div style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: "-100" }}>
                    <Threads
                        amplitude={2}
                        distance={1.4}
                        enableMouseInteraction={true}
                        color={[255, 255, 255]}
                    />
                </div>
                <Stepper initialStep={1} disableStepIndicators={true}>
                    <Step>
                        <FadeContent duration={fadeDuration}>
                            <div style={{ display: 'flex', flexDirection: "column", alignItems: "flex-start" }}>
                                <span className="splite-text font-medium" style={{ color: "#fff", fontSize: "2rem" }}>Welcome to the storage!</span>
                                <span className="font-regular" style={{ color: "#fff", fontSize: "1rem", marginTop: "10px" }}>Please sign in to continue or sign up if you don’t have an account.</span>
                            </div>
                        </FadeContent>
                    </Step>
                    <Step>
                        <FadeContent duration={fadeDuration}>
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
                                    isSignIn ? e.target.innerHTML = "Do you have an account? Sign in" : e.target.innerHTML = "Don't have an account? Sign up";
                                    setSignIn(!isSignIn);
                                    document.querySelectorAll('#form-indefication').forEach(form => form.reset());
                                }}
                                style={{ background: "none", border: "none", color: "#fff", fontSize: "1rem", marginTop: "25px", cursor: "pointer", textDecoration: "underline" }}
                                className="font-regular"
                            >Don't have an account? Sign up</button>
                        </FadeContent>
                    </Step>
                    <Step>
                        <FadeContent duration={fadeDuration}>
                            <div style={{ display: 'flex', flexDirection: "column", alignItems: "flex-start" }}>
                                <span style={{ color: "#fff", fontSize: "2rem" }} className="font-medium">Welcome, [Name]!</span>
                                <span className="font-regular" style={{ color: "#fff", fontSize: "1rem", marginTop: "10px" }}>Your storage is ready.</span>
                            </div>
                        </FadeContent>
                    </Step>
                </Stepper>
            </div>
        </>
    );
}
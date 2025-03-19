import React from "react";
import Threads from "../components/UI/Threads/Threads";
import SpotlightCard from "../components/UI/SpotlightCard/SpotlightCard";
import Stepper, { Step } from "../components/UI/Stepper/Stepper"
import SplitText from "../components/UI/SplitText/SplitText";

export default function Identification() {
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
                        <SplitText
                            className="splite-text font-regular"
                            text="Welcome to the storage!"
                            delay={30}
                            animationFrom={{ opacity: 0, transform: 'translate3d(0,100px,0)' }}
                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                            easing="easeOutCubic"
                            threshold={0.2}
                            rootMargin="-100px"
                        />
                    </Step>
                    <Step>
                        
                    </Step>
                    <Step>
                        <h1 style={{ color: "#fff" }}>Bye</h1>
                    </Step>
                    <Step>
                        <h1 style={{ color: "#fff" }}>Bye</h1>
                    </Step>
                    <Step>
                        <h1 style={{ color: "#fff" }}>Bye</h1>
                    </Step>
                </Stepper>
            </div>
        </>
    );
}
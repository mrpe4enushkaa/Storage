import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function ProfileUser({ userData, userBlock, data }) {
    const progressBar = useRef(null);
    const nothingTextRef = useRef(null);
    const documentsTextRef = useRef(null);
    const passwordsTextRef = useRef(null);

    const textBar = useRef(null);

    const [entries, setEntries] = useState([]);
    const [activities, setActivities] = useState([]);

    const setPosition = () => {
        const pos = progressBar.current.getBoundingClientRect();
        textBar.current.style.left = `${pos.width - 10}px`;
    }

    // useEffect(() => {
    //     setPosition();

    //     const observer = new ResizeObserver(() => {
    //         setPosition();
    //     });
    //     observer.observe(progressBar.current);
    //     return () => observer.disconnect();
    // }, []);

    let split, animation;

    useEffect(() => {
        split = SplitText.create(".words", { type: "chars" });
        animation = gsap.from(split.chars, {
            x: 150,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power4",
            stagger: 0.025
        })
        // setup(); words() 
    }, []);

    useEffect(() => {
        if (
            data &&
            typeof data.documents_length === "number" &&
            typeof data.passwords_length === "number"
        ) {
            documentsTextRef.current.style.display = "flex";
            passwordsTextRef.current.style.display = "flex";
            nothingTextRef.current.style.display = "flex";

            if (data.documents_length === 0 && data.passwords_length === 0) {
                documentsTextRef.current.style.display = "none";
                passwordsTextRef.current.style.display = "none";
                return;
            }

            if (data.documents_length === 0) {
                documentsTextRef.current.style.display = "none";
            }
            if (data.passwords_length === 0) {
                passwordsTextRef.current.style.display = "none";
            }

            nothingTextRef.current.style.display = "none";
            progressBar.current.style.width = `${(data.documents_length * 100) / (data.passwords_length + data.documents_length)}%`;
        }
    }, [data]);

    useEffect(() => {
        const id = userData?.decoded?.id;

        fetch("http://localhost:3000/api/getEntries", {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => setEntries(data.entries));

        fetch("http://localhost:3000/api/getActivities", {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => setActivities(data.activities));
    }, [userData, data]);

    return (
        <section className='profile--user' ref={userBlock}>
            <div className="profile--user__data-user">
                <div className="profile--user__avatar"></div>
                <div className="profile--user__data">
                    <span className='font-regular profile--user__username'>
                        {userData?.decoded?.username}
                    </span>
                    <span className='font-regular profile--user__email'>
                        {userData?.decoded?.email}
                    </span>
                    {/* <button className="font-regular profile--user__button--edit-password">
                        Edit password
                    </button> */}
                </div>
            </div>
            <div className="profile--user__about">
                <div className="profile--user__about--statistics">
                    <span className="font-regular profile--user__about--name words" style={{ marginBottom: "10px" }}>Stored</span>
                    <div className="profile--user__about--bar">
                        <nav className="profile--user__about--repository">
                            <nav ref={progressBar} className="profile--user__about--repository-progress"></nav>
                        </nav>
                        <div className="profile--user__about--repository-names" style={{ display: "flex", alignItems: "center", columnGap: "5px", marginTop: "5px" }}>
                            <div ref={documentsTextRef} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                                <div style={{ width: "10px", height: "10px", borderRadius: "100px", backgroundColor: "#fff" }}></div>
                                <span className="font-regular" style={{ marginRight: "20px" }}>Document(s)</span>
                            </div>
                            <div ref={passwordsTextRef} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                                <div style={{ width: "10px", height: "10px", borderRadius: "100px", backgroundColor: "#545454" }}></div>
                                <span className="font-regular" style={{ marginRight: "20px" }}>Password(s)</span>
                            </div>
                            <div ref={nothingTextRef} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
                                <div style={{ width: "10px", height: "10px", borderRadius: "100px", backgroundColor: "rgb(101, 101, 101)" }}></div>
                                <span className="font-regular">Nothing</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile--user__about--activities">
                    <span className="font-regular profile--user__about--name words">Account activity</span>
                    <div className="profile--user__about--blocks">
                        {activities.length === 0 ?
                            (<span className="font-regular profile--user__about--not">No account activity</span>) :
                            [...activities].reverse().map((item, index) => (
                                <div className="profile--user__about--block" key={index}>
                                    <span className="font-regular">{item.TEXT}</span>
                                    <span className="font-regular">{new Date(item.UPLOADED).toLocaleString()}</span>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="profile--user__about--history">
                    <span className="font-regular profile--user__about--name words">Entry history</span>
                    <div className="profile--user__about--blocks">
                        {[...entries].reverse().map((item, index) => (
                            <div className="profile--user__about--block" key={index}>
                                <span className="font-regular">{item.IP_ADDRESSES}</span>
                                <span className="font-regular">{new Date(item.UPLOADED).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
import React, { useEffect, useRef } from "react";

export default function ProfileUser({ userData, userBlock }) {
    const progressBar = useRef(null);
    const textBar = useRef(null);

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
                    <button className="font-regular profile--user__button--edit-password">
                        Edit password
                    </button>
                </div>
            </div>
            <div className="profile--user__about">
                <div className="profile--user__about--statistics">
                    <span className="font-regular profile--user__about--text" style={{marginBottom: "10px"}}>Stored</span>
                    <div>
                        {/* <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{ width: "10px", height: "10px", borderRadius: "100px", backgroundColor: "#fff" }}></div>
                            <div ref={textBar} style={{ position: "relative", width: "10px", height: "10px", borderRadius: "100px", backgroundColor: "#545454" }}></div>
                        </div> */}
                        <nav className="profile--user__about--repository">
                            <nav style={{ width: "90%" }} ref={progressBar} className="profile--user__about--repository-progress"></nav>
                            {/* style={{width : "процент = кол-во 1 * 100 / сумма 2 кол-в"}} */}
                        </nav>
                        <div style={{ display: "flex", alignItems: "center", columnGap: "5px", marginTop: "5px" }}>
                            <div style={{ width: "10px", height: "10px", borderRadius: "100px", backgroundColor: "#fff" }}></div>
                            <span className="font-regular" style={{marginRight: "20px"}}>Password(s)</span>
                            <div style={{ width: "10px", height: "10px", borderRadius: "100px", backgroundColor: "#545454" }}></div>
                            <span className="font-regular">Document(s)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();

    return (
        <>
            <span>Error 404</span>
            <button onClick={() => navigate("/")}>Back</button >
        </>
    );
}
import React from "react";

export default function Block({ heading, text }) {
    return (
        <div className="block--center">
            <span className="heading font-medium">{heading}</span> 
            <span className="text font-regular">{text}</span>
            <br />
        </div>
    );
}
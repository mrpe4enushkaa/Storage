import React from "react";

export default function Input({ label, id, type, value, name, setData, validate}) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setData(prev => ({ ...prev, [name]: e.target.value }))}
                onBlur={validate}
            />
        </>
    )
}
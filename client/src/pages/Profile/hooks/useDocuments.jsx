import { useEffect, useState } from "react";

const [documents, setDocuments] = useState({});

useEffect(() => {
    if (isLoaded && userData?.decoded?.id) {
        const response = fetch("http://localhost:3000/api/getDocuments", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id_user: userData?.decoded?.id
            })
        });

        setDocuments(response.json());
    }
}, [isLoaded])

module.exports = [documents, setDocuments];
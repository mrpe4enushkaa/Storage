import { visibleForm } from "./visibleForm";

export const handleAddUser = async (email, username, password) => {
    let statesChecking = {
        loading: true,
        result: false,
        error: false
    }

    visibleForm(statesChecking.loading);

    try {
        const response = await fetch("http://localhost:3000/api/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });

        const result = await response.json();

        statesChecking.result = result.add;
    } catch (error) {
        console.error(error);
        statesChecking.result = false;
        statesChecking.error = true;
    }

    statesChecking.loading = false;
    visibleForm(statesChecking.loading);

    return statesChecking.result;
}
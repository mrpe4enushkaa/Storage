import { visibleForm } from "./visibleForm";

export const handleCheckUser = async (username, password) => {
    let statesChecking = {
        loading: true,
        result: false,
        error: false
    }

    visibleForm(statesChecking.loading);

    try {
        const response = await fetch("http://localhost:3000/api/checkUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const result = await response.json();

        statesChecking.result = result.user;
    } catch (error) {
        console.error(error);
        statesChecking.result = false;
        statesChecking.error = true;
    }

    statesChecking.loading = false;
    visibleForm(statesChecking.loading);

    return statesChecking.result;
}
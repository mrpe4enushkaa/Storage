export const handleCheckUser = async () => {
    let statesChecking = {
        loading: true,
        result: false,
        error: false
    }

    const visibleForm = (loading) => {
        document.getElementById("form-indefication").style.display = loading ? 'none' : 'flex';
        document.getElementById("changeForm").style.display = loading ? 'none' : 'block';
    }

    visibleForm(statesChecking.loading);

    try {
        const response = await fetch("http://localhost:5000/api/checkUser");
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
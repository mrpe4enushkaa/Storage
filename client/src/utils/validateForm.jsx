export const validateForm = (data, settings, setValidate) => {
    const validateEmail = (email) => {
        const symbols = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidate(prev => ({ ...prev, email: symbols.test(email) }));
    };

    const validateUsername = (username) => {
        const hasSymbols = (name) => /[^a-zA-Z0-9_]/.test(name);
        setValidate(prev => ({ ...prev, username: username.length >= 3 && username.length <= 20 && !hasSymbols(username) }));
    };

    const validatePassword = (password) => {
        password = String(password);
        const isValid = password.length >= 6 && password.length <= 30;
        setValidate(prev => ({ ...prev, password: isValid }));
        return isValid;
    };

    const validateRepeatPassword = (password, repeatPassword) => {
        if (!validatePassword(repeatPassword) || repeatPassword !== password) {
            setValidate(prev => ({ ...prev, repeatPassword: false }));
        } else {
            setValidate(prev => ({ ...prev, repeatPassword: true }));
        }
    };

    if (settings.email) {
        validateEmail(data.email);
    }
    validateUsername(data.username);
    validatePassword(data.password);
    if (settings.repeatPassword) {
        validateRepeatPassword(data.password, data.repeatPassword);
    }
}
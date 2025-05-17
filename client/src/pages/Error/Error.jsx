import { useNavigate } from "react-router-dom";
import Background from "../../components/UI/Background/Background";
import "./Error.scss";

export default function Error() {
    const navigate = useNavigate();

    document.title = "Error";

    return (
        <>
            <Background />
            <div className="wrapper-error">
                <div className="error-information">
                    <span className="error-heading font-regular">Oops! Something went wrong.</span>
                    <span className="error-text font-regular">This page isn’t available right now. Please click the button below to go back to a safe page.</span>
                    <button className="error-button font-regular" onClick={() => navigate("/")}>Back</button >
                </div>
            </div>
        </>
    );
}
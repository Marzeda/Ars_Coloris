import { useState } from "react";

const API_URL = "http://localhost:5000";

function ForgotPassword() {
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [resetLink, setResetLink] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_URL}/api/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        });

        const data = await response.json();

        setMessage(data.message);

        if (response.ok) {
            setResetLink(data.resetLink);
        }
    };

    return (
        <div className="page">
            <div className="login-container">
                <h1>Odzyskiwanie hasła</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Podaj login"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <button type="submit">
                        Wygeneruj link resetujący
                    </button>
                </form>

                {message && <p>{message}</p>}

                {resetLink && (
                    <p>
                        Link resetujący:{" "}
                        <a href={resetLink}>
                            Przejdź do resetowania hasła
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Hasła nie są identyczne.");
            return;
        }

        const response = await fetch(
            `${API_URL}/api/reset-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            alert("Hasło zostało zmienione.");
            navigate("/login");
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="page">
            <div className="login-container">
                <h1>Reset hasła</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Nowe hasło"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Powtórz hasło"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Zmień hasło
                    </button>
                </form>

                {message && (
                    <p className="error-message">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;
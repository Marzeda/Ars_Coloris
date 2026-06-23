import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!data.success) {
                setError(data.message);
                return;
            }

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/artist");
            }

        } catch (err) {
            setError("Błąd połączenia z serwerem");
        }
    };

    return (
        <div className="page">
            <h1>Logowanie</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Login</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Hasło</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Zaloguj
                </button>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}

export default Login;
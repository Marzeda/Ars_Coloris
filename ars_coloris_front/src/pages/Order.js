import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function Order() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const { cartItems, clearCart } = useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};
        const cleanPhone = phone.replace(/[\s-]/g, "");

        if (!name.trim()) {
            newErrors.name = "Podaj imię i nazwisko";
        }

        if (!email.includes("@")) {
            newErrors.email = "Podaj poprawny adres e-mail";
        }

        if (!phone.trim()) {
            newErrors.phone = "Podaj numer telefonu";
        } else if (!/^[0-9]{9}$/.test(cleanPhone)) {
            newErrors.phone = "Numer telefonu musi zawierać 9 cyfr";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSuccess(true);
            clearCart();

            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }
    };

    return (
        <div className="page order-page">
            <h1>Zamówienie</h1>

            {success ? (
                <>
                    <div className="success-message">
                        ✓ Dziękujemy za złożenie zamówienia.
                        Skontaktujemy się z Tobą wkrótce.
                    </div>

                    <Link to="/">
                        <button className="hero-button">
                            Powrót do strony głównej
                        </button>
                    </Link>
                </>
            ) : (
                <>
                    <p>
                        Wypełnij formularz, a skontaktujemy się z Tobą
                        w sprawie realizacji zamówienia.
                    </p>

                    <div className="order-summary">
                        <h2>Twoje zamówienie</h2>

                        {cartItems.length === 0 ? (
                            <p>Twój koszyk jest pusty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="order-summary-item"
                                >
                                    <span>
                                        {item.name} × {item.quantity}
                                    </span>

                                    <span>
                                        {item.price * item.quantity} zł
                                    </span>
                                </div>
                            ))
                        )}

                        <div className="order-total">
                            Razem: {totalPrice} zł
                        </div>
                    </div>

                    <form className="order-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Imię i nazwisko"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {errors.name && (
                            <p className="error-message">{errors.name}</p>
                        )}

                        <input
                            type="email"
                            placeholder="Adres e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}

                        <input
                            type="tel"
                            placeholder="Numer telefonu"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        {errors.phone && (
                            <p className="error-message">{errors.phone}</p>
                        )}

                        <textarea
                            rows="5"
                            placeholder="Dodatkowe informacje do zamówienia"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <button type="submit">
                            Wyślij zapytanie
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}

export default Order;
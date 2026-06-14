import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="page">
            <h1>Koszyk</h1>

            {cartItems.length === 0 ? (
                <p>Twój koszyk jest obecnie pusty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.images[0]} alt={item.name} />

                                <div className="cart-info">
                                    <h3>{item.name}</h3>

                                    <div className="quantity-controls">
                                        <button onClick={() => decreaseQuantity(item.id)}>
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button onClick={() => increaseQuantity(item.id)}>
                                            +
                                        </button>
                                    </div>

                                    <p>
                                        {item.price} zł × {item.quantity}
                                    </p>

                                    <p>
                                        <strong>
                                            {item.price * item.quantity} zł
                                        </strong>
                                    </p>

                                    <button
                                        className="remove-button"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Usuń
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Razem: {totalPrice} zł</h2>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
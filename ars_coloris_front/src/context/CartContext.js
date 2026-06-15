import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

const [cartItems, setCartItems] = useState(() => {
    const savedCart =
        localStorage.getItem("cartItems");

    return savedCart
        ? JSON.parse(savedCart)
        : [];
});

    const addToCart = (product) => {
        setCartItems((previousItems) => {
            const existingProduct = previousItems.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                return previousItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [
                ...previousItems,
                { ...product, quantity: 1 }
            ];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((previousItems) =>
            previousItems.filter((item) => item.id !== productId)
        );
    };

    const increaseQuantity = (productId) => {
        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((previousItems) =>
            previousItems
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };
	
	const clearCart = () => {
    setCartItems([]);
};

		useEffect(() => {
			localStorage.setItem(
				"cartItems",
				JSON.stringify(cartItems)
			);
		}, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
				clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
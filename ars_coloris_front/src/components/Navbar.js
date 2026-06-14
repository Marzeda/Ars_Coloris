import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { CartContext } from "../context/CartContext";

import logo from "../assets/hero_mosaic_logo.jpg";
import ImageModal from "./ImageModal";

function Navbar() {
    const [showLogo, setShowLogo] = useState(false);
	const { cartItems } = useContext(CartContext);
	const totalItems = cartItems.reduce(
		(sum, item) => sum + item.quantity,
		0
		);

    return (
        <>
            <nav className="navbar">
                <div
                    className="logo-link"
                    onClick={() => setShowLogo(true)}
                >
                    <img
                        src={logo}
                        alt="Ars Coloris"
                        className="navbar-logo"
                    />
                </div>

                <ul className="nav-links">
                    <li><Link to="/">Strona główna</Link></li>
                    <li><Link to="/gallery">Galeria</Link></li>
					<li><Link to="/Cooperation">Współpraca</Link></li>
                    <li><Link to="/about">O artystce</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
					<li><Link to="/cart" className="cart-link">
							Koszyk
							{totalItems > 0 && (
								<span key={totalItems} className="cart-badge">
									{totalItems}
								</span>
							)}
						</Link>
					</li>
                </ul>
            </nav>

            <ImageModal
                image={showLogo ? logo : null}
                onClose={() => setShowLogo(false)}
            />
        </>
    );
}

export default Navbar;
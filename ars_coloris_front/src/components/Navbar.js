import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/hero_mosaic_logo.jpg";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo-link" onClick={closeMenu}>
                <img
                    src={logo}
                    alt="Ars Coloris"
                    className="navbar-logo"
                />
            </Link>

            <button
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li>
                    <Link to="/" onClick={closeMenu}>
                        Strona główna
                    </Link>
                </li>

                <li>
                    <Link to="/gallery" onClick={closeMenu}>
                        Galeria
                    </Link>
                </li>
				
				<li>
                    <Link to="/process" onClick={closeMenu}>
                        Jak powstają mozaiki
                    </Link>
                </li>
				
				<li>
                    <Link to="/projects" onClick={closeMenu}>
                        Zrealizowane projekty
                    </Link>
                </li>

                <li>
                    <Link to="/cooperation" onClick={closeMenu}>
                        Współpraca
                    </Link>
                </li>

                <li>
                    <Link to="/contact" onClick={closeMenu}>
                        Kontakt
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
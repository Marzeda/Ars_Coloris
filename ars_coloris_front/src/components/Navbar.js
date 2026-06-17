import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/hero_mosaic_logo.jpg";
import ImageModal from "./ImageModal";

function Navbar() {
    const [showLogo, setShowLogo] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

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
                        <Link to="/cooperation" onClick={closeMenu}>
                            Współpraca
                        </Link>
                    </li>

                    <li>
                        <Link to="/about" onClick={closeMenu}>
                            O artystce
                        </Link>
                    </li>

                    <li>
                        <Link to="/contact" onClick={closeMenu}>
                            Kontakt
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
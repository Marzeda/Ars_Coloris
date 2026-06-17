import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/hero_mosaic_logo.jpg";
import ImageModal from "./ImageModal";

function Navbar() {
    const [showLogo, setShowLogo] = useState(false);

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
                    <li>
                        <Link to="/">Strona główna</Link>
                    </li>

                    <li>
                        <Link to="/gallery">Galeria</Link>
                    </li>

                    <li>
                        <Link to="/cooperation">Współpraca</Link>
                    </li>

                    <li>
                        <Link to="/about">O artystce</Link>
                    </li>

                    <li>
                        <Link to="/contact">Kontakt</Link>
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
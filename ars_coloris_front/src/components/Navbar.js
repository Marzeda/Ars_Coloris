import { NavLink } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/hero_mosaic_logo.jpg";
import ImageModal from "./ImageModal";

function Navbar() {
    const [showLogo, setShowLogo] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const openLogoModal = () => {
        closeMenu();
        setShowLogo(true);
    };

    const getLinkClassName = ({ isActive }) => {
        return isActive ? "active-nav-link" : "";
    };

    return (
        <>
            <nav
                className="navbar"
                aria-label="Główna nawigacja"
            >
                <button
                    type="button"
                    className="logo-link"
                    onClick={openLogoModal}
                    aria-label="Powiększ logo Ars Coloris"
                >
                    <img
                        src={logo}
                        alt="Ars Coloris"
                        className="navbar-logo"
                    />
                </button>

                <button
                    type="button"
                    className="hamburger"
                    onClick={() => setMenuOpen((current) => !current)}
                    aria-label={
                        menuOpen
                            ? "Zamknij menu"
                            : "Otwórz menu"
                    }
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                >
                    <span aria-hidden="true">
                        {menuOpen ? "✕" : "☰"}
                    </span>
                </button>

                <ul
                    id="main-navigation"
                    className={`nav-links ${
                        menuOpen ? "open" : ""
                    }`}
                >
                    <li>
                        <NavLink
                            to="/"
                            end
                            onClick={closeMenu}
                            className={getLinkClassName}
                        >
                            Strona główna
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/gallery"
                            onClick={closeMenu}
                            className={getLinkClassName}
                        >
                            Galeria
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/cooperation"
                            onClick={closeMenu}
                            className={getLinkClassName}
                        >
                            Współpraca
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/about"
                            onClick={closeMenu}
                            className={getLinkClassName}
                        >
                            O artystce
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/contact"
                            onClick={closeMenu}
                            className={getLinkClassName}
                        >
                            Kontakt
                        </NavLink>
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
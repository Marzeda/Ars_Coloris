
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                {/* Nawigacja */}
                <div className="footer-section">
                    <h3>Nawigacja</h3>

                    <ul>
                        <li>
                            <Link to="/">Strona główna</Link>
                        </li>

                        <li>
                            <Link to="/gallery">Galeria</Link>
                        </li>

                        <li>
                            <Link to="/archive">Archiwum</Link>
                        </li>

                        <li>
                            <Link to="/cooperation">Współpraca</Link>
                        </li>

                        <li>
                            <Link to="/contact">Kontakt</Link>
                        </li>
                    </ul>
                </div>

                {/* Informacje prawne */}
                <div className="footer-section">
                    <h3>Informacje prawne</h3>

                    <ul>
                        <li>
                            <Link to="/privacy-policy">
                                Polityka prywatności
                            </Link>
                        </li>

                        <li>
                            <Link to="/cookies">
                                Polityka cookies
                            </Link>
                        </li>

                        <li>
                            <Link to="/terms">
                                Regulamin sprzedaży
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Instagram */}
                <div className="footer-section">
                    <h3>Obserwuj nas</h3>

                    <a
                        href="https://www.instagram.com/ars__coloris"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Ars Coloris na Instagramie"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            textDecoration: "none"
                        }}
                    >
                        <FaInstagram size={24} />
                        <span>Instagram</span>
                    </a>
                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} Ars Coloris.
                Wszelkie prawa zastrzeżone.
            </div>
        </footer>
    );
}

export default Footer;


import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                {/* Ars Coloris */}
                <div className="footer-section">
                    <h3>Ars Coloris</h3>

                    <p>
                        Ręcznie tworzone mozaiki artystyczne
                        inspirowane naturą i pięknem detalu.
                    </p>
                </div>

                {/* Nawigacja */}
                <div className="footer-section">
                    <h3>Nawigacja</h3>

                    <ul>
                        <li>
                            <Link to="/">
                                Strona główna
                            </Link>
                        </li>

                        <li>
                            <Link to="/gallery">
                                Galeria
                            </Link>
                        </li>

                        <li>
                            <Link to="/archive">
                                Archiwum
                            </Link>
                        </li>

                        <li>
                            <Link to="/process">
                                Proces tworzenia
                            </Link>
                        </li>

                        <li>
                            <Link to="/projects">
                                Zrealizowane projekty
                            </Link>
                        </li>

                        <li>
                            <Link to="/cooperation">
                                Współpraca
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact">
                                Kontakt
                            </Link>
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

                {/* Kontakt */}
                <div className="footer-section">
                    <h3>Kontakt</h3>

                    <p>
                        <FaEnvelope />{" "}
                        <a href="mailto:kontakt@arscoloris.pl">
                            kontakt@arscoloris.pl
                        </a>
                    </p>
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

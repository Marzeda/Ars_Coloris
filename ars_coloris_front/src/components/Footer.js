import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaUniversity
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-section">
                    <h3>Ars Coloris</h3>

                    <p>
                        Ręcznie tworzone mozaiki artystyczne
                        inspirowane naturą i pięknem detalu.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Nawigacja</h3>

                    <ul>
                        <li><Link to="/">Strona główna</Link></li>
                        <li><Link to="/gallery">Galeria</Link></li>
                        <li><Link to="/cooperation">Współpraca</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
						<li><Link to="/process">Proces tworzenia</Link></li>
						<li><Link to="/projects">Zrealizowane projekty</Link></li>
                    </ul>
                </div>

                
				<div className="footer-section">
    <h3>Kontakt</h3>

    <p><FaEnvelope /> kontakt@arscoloris.pl</p>

    <p><FaPhoneAlt /> +48 000 000 000</p>

    <p>
        <FaUniversity /> 12 1233 3212 1231 1231 1231 1231
    </p>
</div>

            </div>

            <div className="footer-bottom">
                © 2026 ARS Coloris. Wszelkie prawa zastrzeżone.
            </div>
        </footer>
    );
}

export default Footer;
import { Link } from "react-router-dom";

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
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Kontakt</h3>

                    <p>📧 kontakt@arscoloris.pl</p>
                    <p>📞 +48 000 000 000</p>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 ARS Coloris. Wszelkie prawa zastrzeżone.
            </div>
        </footer>
    );
}

export default Footer;
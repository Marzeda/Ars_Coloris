function Contact() {
    return (
        <div className="page contact-page">
            <h1>Kontakt</h1>

            <div className="contact-intro">
                <h2>Wpadło Ci coś w oko?</h2>

                <p>
                    Jeśli któraś z prac Ars Coloris ma
                    zamieszkać właśnie u Ciebie — napisz
                    do mnie.
                </p>

                <p>
                    Odpowiem na pytania, ustalimy szczegóły
                    zakupu, płatności i dostawy.
                </p>
            </div>

            <div className="contact-details">
                <p>
                    <strong>Kontakt telefoniczny:</strong>{" "}
                    <a href="tel:+48668761178">
                        +48 668 761 178
                    </a>
                </p>

                <p>
                    <strong>Adres e-mail:</strong>{" "}
                    <a href="mailto:kontakt@arscoloris.pl">
                        kontakt@arscoloris.pl
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Contact;
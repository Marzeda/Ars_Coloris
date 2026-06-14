function Cooperation() {
    return (
        <div className="page cooperation-page">
            <h1>Współpraca</h1>

            <p className="cooperation-intro">
                Ars Coloris chętnie podejmuje współpracę ze sklepami,
                butikami, galeriami sztuki oraz projektantami wnętrz.
                Oferujemy unikalne, ręcznie tworzone mozaiki, które
                wyróżniają się wysoką jakością wykonania i niepowtarzalnym charakterem.
            </p>

            <div className="cooperation-benefits">

                <div className="benefit-card">
					<div className="benefit-icon">🏪</div>
                    <h3>Dla sklepów i butików</h3>
                    <p>
                        Oryginalne produkty, które wyróżnią ofertę
                        i przyciągną klientów poszukujących wyjątkowego rękodzieła.
                    </p>
                </div>

                <div className="benefit-card">
				<div className="benefit-icon">🏡</div>
                    <h3> Dla projektantów wnętrz</h3>
                    <p>
                        Możliwość realizacji indywidualnych projektów
                        dopasowanych do konkretnej przestrzeni i stylu wnętrza.
                    </p>
                </div>

                <div className="benefit-card">
				<div className="benefit-icon">🎨</div>
                    <h3> Zamówienia indywidualne</h3>
                    <p>
                        Tworzymy mozaiki na specjalne zamówienie,
                        uwzględniając preferencje klienta i charakter projektu.
                    </p>
                </div>

            </div>

            <div className="cooperation-contact">
                <h2>Zainteresowany współpracą?</h2>

                <p>
                    Zapraszamy do kontaktu w celu omówienia szczegółów
                    oraz przygotowania indywidualnej oferty.
                </p>

                <a
                    href="mailto:kontakt@arscoloris.pl"
                    className="hero-button"
                >
                    Skontaktuj się
                </a>
            </div>
        </div>
    );
}

export default Cooperation;
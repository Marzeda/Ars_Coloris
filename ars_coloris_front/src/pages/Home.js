import heroImage from "../assets/hero_mosaic_1.jpg";

function Home() {
    return (
        <div>
            <section
                className="hero"
                style={{
                    backgroundImage: `linear-gradient(
                        rgba(0,0,0,0.55),
                        rgba(0,0,0,0.55)
                    ), url(${heroImage})`,
                }}
            >
                <div className="hero-content">
                    <h1>Ręcznie tworzone mozaiki</h1>

                    <h2>Autorskie prace Agnieszki Szelech</h2>

                    <p>
                        Unikalne mozaiki tworzone z pasją, dbałością o szczegóły i miłością do piękna.
                    </p>

                    <a href="/gallery" className="hero-button">
                        Zobacz galerię
                    </a>
                </div>
            </section>

            <section className="home-section">
                <h2>Dlaczego Ars Coloris?</h2>

                <div className="features">
                    <div className="feature-card">
                        <h3>Ręczne wykonanie</h3>

                        <p>
                            Każda mozaika jest tworzona ręcznie z najwyższą starannością.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Unikalność</h3>

                        <p>
                            Każda praca jest jedyna w swoim rodzaju i ma własny charakter.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Idealne na prezent</h3>

                        <p>
                            Mozaiki Ars Coloris to wyjątkowy prezent, który pozostaje na lata.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
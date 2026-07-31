import { Link } from "react-router-dom";

import heroImage from "../assets/hero_mosaic_1.jpg";

function Home() {
    return (
        <main>
            <section
                className="hero"
                style={{
                    backgroundImage: `linear-gradient(
                        rgba(0, 0, 0, 0.55),
                        rgba(0, 0, 0, 0.55)
                    ), url(${heroImage})`
                }}
            >
                <div className="hero-content">
                    <h1>Ręcznie tworzone mozaiki</h1>

                    <h2>
                        Autorskie prace Agnieszki Szelech
                    </h2>

                    <p>
                        Unikalne mozaiki tworzone z pasją,
                        dbałością o szczegóły i miłością do
                        piękna.
                    </p>

                    <Link
                        to="/gallery"
                        className="hero-button"
                    >
                        Zobacz galerię
                    </Link>
                </div>
            </section>

            <section
                className="home-section"
                aria-labelledby="ars-coloris-features"
            >
                <h2 id="ars-coloris-features">
                    Dlaczego Ars Coloris?
                </h2>

                <div className="features">
                    <article className="feature-card">
                        <div
                            className="feature-icon"
                            aria-hidden="true"
                        >
                            ♡
                        </div>

                        <h3>Ręczne wykonanie</h3>

                        <p>
                            Każda mozaika jest tworzona ręcznie
                            z najwyższą starannością.
                        </p>
                    </article>

                    <article className="feature-card">
                        <div
                            className="feature-icon"
                            aria-hidden="true"
                        >
                            ✦
                        </div>

                        <h3>Unikalność</h3>

                        <p>
                            Każda praca jest jedyna w swoim
                            rodzaju i ma własny charakter.
                        </p>
                    </article>

                    <article className="feature-card">
                        <div
                            className="feature-icon"
                            aria-hidden="true"
                        >
                            ✧
                        </div>

                        <h3>Idealne na prezent</h3>

                        <p>
                            Mozaiki Ars Coloris to wyjątkowy
                            prezent, który pozostaje na lata.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default Home;
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
                    ), url(${heroImage})`,
                }}
            >
                <div className="hero-content">
                    <h1>
                        Autorska pracownia mozaiki i witrażu
                    </h1>

                    <h2>
                        Ars Coloris Agnieszka Szelech
                    </h2>

                    <p>
                        Sztuka koloru. Harmonia detalu.
                        Wielkie rzeczy powstają z małych
                        cząsteczek.
                    </p>

                    <Link
                        to="/gallery"
                        className="hero-button"
                    >
                        Zobacz mozaiki
                    </Link>
                </div>
            </section>

            <section
                className="home-section"
                aria-labelledby="ars-coloris-features"
            >
                <div className="home-section-intro">
                    <h2 id="ars-coloris-features">
                        Ars Coloris znaczy „sztuka koloru”.
                    </h2>

                    <p>
                        Dla mnie kolor nie jest dodatkiem.
                        Jest początkiem. Tessera po tesserze.
                    </p>
                </div>

                <div className="features">
                    <article className="feature-card">
                        <p>
                            Ars Coloris to autorska pracownia
                            mozaiki, w której szkło, ceramika
                            i kolor układają się w przedmioty
                            tworzone powoli, ręcznie i w
                            pojedynczych egzemplarzach.
                        </p>
                    </article>

                    <article className="feature-card">
                        <p>
                            Każda tessera jest wybierana, cięta
                            i układana osobno. Nie powstają tu
                            idealne kopie ani seryjne wzory.
                            Są za to rytm, światło, faktura
                            i drobne niedoskonałości ręcznej
                            pracy, dzięki którym każdy
                            przedmiot ma własny charakter.
                        </p>
                    </article>

                    <article className="feature-card">
                        <p>
                            Tworzę mozaiki użytkowe
                            i dekoracyjne — misy, tace,
                            szkatułki, stoliki i obiekty,
                            które mają nie tylko zdobić
                            wnętrze, ale po prostu dobrze się
                            w nim czuć.
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
}

export default Home;
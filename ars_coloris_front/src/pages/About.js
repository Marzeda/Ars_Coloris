import agaPhoto from "../assets/aga.jpg";

function About() {
    return (
        <div
            className="about-page"
            style={{
                backgroundImage: `linear-gradient(
                    rgba(0,0,0,0.32),
                    rgba(0,0,0,0.32)
                ), url(${agaPhoto})`,
            }}
        >
            <div className="about-content">
                <h1>O mnie</h1>

                <p>
                    Nazywam się Agnieszka Szelech i prowadzę
                    autorską pracownię mozaiki i witrażu
                    Ars Coloris.
                </p>

                <p>
                    Moja artystyczna droga zaczęła się w
                    rodzinnym domu. To tam nauczyłam się
                    patrzeć na kolor, światło i rękodzieło
                    nie jak na dekorację, ale jak na sposób
                    opowiadania o świecie.
                </p>

                <p>
                    Mama tworzyła piękne hafty i to od niej
                    nauczyłam się wrażliwości na kolor,
                    harmonii oraz znaczenia detalu. Tata
                    wprowadził mnie w świat witrażu — nauczył
                    pracy ze szkłem, cierpliwości i szacunku
                    do rzemiosła wymagającego zarówno
                    precyzji, jak i wyobraźni.
                </p>

                <p>
                    Szkło ma w mojej rodzinie jeszcze głębsze
                    korzenie. Tata jest potomkiem wielu
                    pokoleń hutników, dlatego praca z tym
                    materiałem stała się dla mnie także
                    częścią rodzinnej historii, którą dziś
                    na swój sposób kontynuuję.
                </p>

                <p>
                    Nie jestem artystką po szkole artystycznej
                    ani samoukiem, który pewnego dnia odkrył
                    w sobie pasję do tworzenia. Moja droga
                    zaczęła się znacznie wcześniej — od
                    obserwowania, uczenia się i doświadczeń
                    przekazywanych w domu z pokolenia na
                    pokolenie.
                </p>

                <p>
                    Dziś w Ars Coloris łączę te dwa źródła
                    inspiracji. Od Mamy pozostała mi
                    wrażliwość na kolor, od Taty — fascynacja
                    szkłem i światłem. W mozaikach
                    i witrażach te dwa światy spotykają się
                    z moim własnym sposobem tworzenia.
                </p>

                <p>
                    Każdą realizację tworzę indywidualnie,
                    fragment po fragmencie, z uważnością na
                    przestrzeń, dla której powstaje. Nie
                    tworzę dwóch identycznych prac. Wierzę,
                    że przedmioty wykonane ręcznie mają swoją
                    historię i potrafią wnosić do wnętrz nie
                    tylko piękno, ale również emocje.
                </p>

                <p>
                    Ars Coloris jest więc dla mnie czymś
                    więcej niż pracownią. Jest moją własną
                    drogą twórczą, ale także kontynuacją
                    rodzinnej historii i wyrazem wdzięczności
                    wobec Rodziców, którzy nauczyli mnie
                    patrzeć na świat przez kolor, światło
                    i piękno rzeczy tworzonych ręcznie.
                </p>

                <div className="artist-quote">
                    Wierzę, że wrażliwość na piękno często ma
                    korzenie w rodzinnych historiach. Rodzi
                    się z obserwacji, wspólnych chwil i pasji
                    przekazywanej z pokolenia na pokolenie.
                    A być może odrobinę nosimy jej również
                    w genach.
                </div>
            </div>
        </div>
    );
}

export default About;
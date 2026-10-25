
import React from "react";

function CookiesPolicy() {
    return (
        <div className="page legal-page">
            <div className="legal-container">
                <header className="legal-header">
                    <h1>Polityka cookies</h1>
                    <p>
                        Ars Coloris • www.arscoloris.art
                        <span> • Aktualizacja: 18 października 2026 r.</span>
                    </p>
                </header>

                <section>
                    <h2>1. Czym są pliki cookies?</h2>
                    <p>
                        Pliki cookies (tzw. ciasteczka) to niewielkie
                        informacje, które strona internetowa może zapisywać
                        w urządzeniu użytkownika lub z niego odczytywać.
                        Podobne technologie mogą służyć m.in.
                        zapamiętywaniu ustawień, analizie odwiedzin
                        lub działaniom reklamowym. Nie każda usługa
                        internetowa wykorzystuje cookies.
                    </p>
                </section>

                <section>
                    <h2>2. Jak wygląda to obecnie na arscoloris.art?</h2>
                    <p>
                        Zgodnie z informacjami przekazanymi przez osobę
                        odpowiedzialną za wykonanie serwisu, w aktualnej
                        konfiguracji strona Ars Coloris nie wykorzystuje
                        plików cookies. Nie stosuje również podobnych
                        technologii służących do analityki, reklamy
                        lub profilowania odwiedzających.
                    </p>
                    <p>
                        Nie korzystamy obecnie z Google Analytics,
                        Google Tag Manager ani Meta Pixel. W obecnej
                        konfiguracji nie jest prowadzony marketing
                        oparty na śledzeniu aktywności użytkowników
                        na stronie.
                    </p>
                    <p>
                        Przy opisanej konfiguracji brak podstaw do
                        wyświetlania banera zgód na cookies analityczne
                        lub marketingowe. Gdyby w przyszłości pojawiły
                        się rozwiązania wymagające zgody, zostaną
                        uruchomione dopiero po jej uzyskaniu.
                    </p>
                </section>

                <section>
                    <h2>3. Dane techniczne a cookies</h2>
                    <p>
                        Niezależnie od plików cookies, dostawcy
                        infrastruktury (np. serwery i usługi dostarczania
                        treści) mogą przetwarzać dane techniczne
                        połączeń, takie jak adres IP, czas żądania,
                        identyfikatory przeglądarki lub informacje
                        o błędach. Samo powstanie takich logów
                        nie oznacza zapisania ciasteczka
                        w przeglądarce. Sposób przetwarzania danych
                        osobowych opisuje „Polityka prywatności”.
                    </p>
                </section>

                <section>
                    <h2>4. Odsyłacze do innych serwisów</h2>
                    <p>
                        Jeżeli użytkownik przejdzie za pomocą linku
                        ze strony Ars Coloris do serwisu zewnętrznego
                        (np. portalu społecznościowego), ten serwis
                        może stosować własne cookies zgodnie
                        z odrębnymi zasadami. Niniejsza Polityka
                        dotyczy strony arscoloris.art, a nie
                        odrębnych witryn otwieranych po kliknięciu
                        odsyłacza.
                    </p>
                </section>

                <section>
                    <h2>5. Zmiana konfiguracji strony</h2>
                    <p>
                        W przypadku uruchomienia narzędzi
                        wykorzystujących cookies lub podobne
                        technologie dokument zostanie zaktualizowany
                        o ich cele, dostawców i – gdy to wymagane –
                        informacje o okresie ich działania.
                        Jeśli będzie to konieczne, użytkownik otrzyma
                        możliwość wyboru i późniejszej zmiany zgody.
                    </p>
                </section>

                <section>
                    <h2>6. Kontakt</h2>
                    <p>
                        W sprawach dotyczących strony i prywatności
                        skontaktuj się z Ars Coloris Agnieszka Szelech:
                        {" "}
                        <a href="mailto:agnieszka_szelech@wp.pl">
                            agnieszka_szelech@wp.pl
                        </a>
                        ; ul. Polna 11, 21-150 Kock.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default CookiesPolicy;

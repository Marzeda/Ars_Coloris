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
                <h1>O artystce</h1>

                <p>
                    Agnieszka Szelech tworzy mozaiki z pasją, cierpliwością
                    i ogromną dbałością o detal. Jej prace łączą kolor, światło
                    i unikalne kompozycje, dzięki którym każdy przedmiot
                    zyskuje własną duszę.
                </p>

                <p>
                    Ars Coloris to przestrzeń, w której rękodzieło spotyka się
                    ze sztuką użytkową. Każda mozaika powstaje ręcznie i jest
                    jedyna w swoim rodzaju.
                </p>
				
				<div className="artist-quote">
    „Nie ma życia bez pieprzenia 😂
    <br />
	    Mozaiki ogląda się z daleka.”
	<br /><br />
	"Asfalt qrde ciężko zedrzeć !!!"
	<br />
</div>
            </div>
        </div>
    );
}

export default About;
import {
    FaHome,
    FaLeaf,
    FaCoffee
} from "react-icons/fa";

function Projects() {
    return (
        <div className="page">
            <h1>Zrealizowane projekty</h1>

            <p>
                Przez lata powstały dziesiątki autorskich mozaik
                dla klientów indywidualnych, sklepów i przestrzeni
                użytkowych.
            </p>

            <div className="cooperation-benefits">

                <div className="benefit-card">
                    
					<div className="benefit-icon">
    <FaHome />
</div>

<h3>Mozaiki do wnętrz</h3>
                    <p>
                        Dekoracje ścienne i elementy wyposażenia.
                    </p>
                </div>

                <div className="benefit-card">
                    
					<div className="benefit-icon">
    <FaLeaf />
</div>

<h3>Projekty ogrodowe</h3>
                    <p>
                        Mozaiki odporne na warunki zewnętrzne.
                    </p>
                </div>

                <div className="benefit-card">
                   
				   <div className="benefit-icon">
    <FaCoffee />
</div>

<h3>Stoliki mozaikowe</h3>
                    <p>
                        Indywidualnie projektowane meble artystyczne.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Projects;
import {
    FaLightbulb,
    FaPencilAlt,
    FaPalette,
    FaCheckCircle
} from "react-icons/fa";

function Process() {
    return (
        <div className="page">
            <h1>Proces tworzenia</h1>

            <div className="cooperation-benefits">

                <div className="benefit-card">
                    <div className="benefit-icon">
    <FaLightbulb />
</div>
                    <h3>Pomysł</h3>
                    <p>
                        Każda mozaika rozpoczyna się od inspiracji
                        naturą, kolorem i światłem.
                    </p>
                </div>

                <div className="benefit-card">
                    
					<div className="benefit-icon">
    <FaPencilAlt />
</div>
                    <h3>Projekt</h3>
                    <p>
                        Powstaje szkic oraz dobór kolorów
                        i materiałów.
                    </p>
                </div>

                <div className="benefit-card">
                   
				   <div className="benefit-icon">
    <FaPalette />
</div>
                    <h3>Tworzenie</h3>
                    <p>
                        Każdy element jest ręcznie układany
                        z najwyższą starannością.
                    </p>
                </div>

                <div className="benefit-card">
                    
					<div className="benefit-icon">
    <FaCheckCircle />
</div>
                    <h3>Gotowa praca</h3>
                    <p>
                        Ostateczne wykończenie i przygotowanie
                        do ekspozycji lub wysyłki.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Process;
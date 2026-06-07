import { useState } from "react";
import { Link } from "react-router-dom";

import products from "../data/products";

function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

/* Kategorie produktów - na stronie galeria */
    
	const categories = [
    "Wszystkie",
    "Mozaiki ścienne",
    "Stoliki mozaikowe",
    "Mozaiki ogrodowe",
    "Zamówienia indywidualne",
];

    const filteredProducts =
        selectedCategory === "Wszystkie"
            ? products
            : products.filter(
                  (product) => product.category === selectedCategory
              );

    return (
        <div className="page">
            <h1>Galeria mozaik</h1>

            <div className="category-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "active-category"
                                : ""
                        }
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
			



            <div className="products">
			
			{filteredProducts.length === 0 && (
        <div className="empty-category">
            <h2>Produkty w przygotowaniu</h2>

            <p>
                Aktualnie nie ma jeszcze produktów w tej kategorii.
                Zapraszamy ponownie wkrótce.
            </p>
        </div>
    )}
                {filteredProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                            />
                        </Link>

                        <h3>{product.name}</h3>

                        <p>{product.category}</p>

                        <p>{product.price} zł</p>

                        <Link to={`/product/${product.id}`}>
                            <button>Zobacz produkt</button>
                        </Link>
                    </div>
                ))}
            </div>
			

        </div>
    );
}

export default Gallery;
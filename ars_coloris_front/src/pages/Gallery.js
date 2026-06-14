import { useState } from "react";
import { Link } from "react-router-dom";

import products from "../data/products";

function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
	const [sortOption, setSortOption] = useState("default");

/* Kategorie produktów - na stronie galeria */
    
	const categories = [
    "Wszystkie",
    "Mozaiki ścienne",
    "Stoliki mozaikowe",
    "Mozaiki ogrodowe",
    "Zamówienia indywidualne",
];

	const getCategoryCount = (category) => {
		if (category === "Wszystkie") {
			return products.length;
		}

		return products.filter(
			(product) => product.category === category
		).length;
	};

     const filteredProducts =
    selectedCategory === "Wszystkie"
        ? products
        : products.filter(
              (product) => product.category === selectedCategory
          );

	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortOption === "name-asc") {
			return a.name.localeCompare(b.name);
		}

		if (sortOption === "name-desc") {
			return b.name.localeCompare(a.name);
		}

		if (sortOption === "price-asc") {
			return a.price - b.price;
		}

		if (sortOption === "price-desc") {
			return b.price - a.price;
		}

		return 0;
	});
	 
	 
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
					{category} ({getCategoryCount(category)})
				</button>
                ))}
            </div>
			

	<div className="sort-box">
		<label>Sortuj: </label>

		<select
			value={sortOption}
			onChange={(event) => setSortOption(event.target.value)}
		>
			<option value="default">Domyślnie</option>
			<option value="name-asc">Nazwa A-Z</option>
			<option value="name-desc">Nazwa Z-A</option>
			<option value="price-asc">Cena rosnąco</option>
			<option value="price-desc">Cena malejąco</option>
		</select>
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
                {sortedProducts.map((product) => (
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API_URL from "../config/api";
import galleryHeroImage from "../assets/tlo_gallery.jpg";

import PRODUCT_CATEGORIES from "../config/productCategories";

function Gallery() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] =
        useState("Wszystkie");
    const [sortOption, setSortOption] =
        useState("default");
    const [searchTerm, setSearchTerm] =
        useState("");



    useEffect(() => {
        const controller = new AbortController();

        const isProduction =
            process.env.NODE_ENV === "production";

        const productsUrl = isProduction
            ? "/api/products"
            : `${API_URL}/api/products`;

        async function loadProducts() {
            try {
                const response = await fetch(productsUrl, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}`
                    );
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error(
                        "Nieprawidłowy format listy produktów"
                    );
                }

                setProducts(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(
                        "Błąd pobierania produktów:",
                        error
                    );
                }
            }
        }

        loadProducts();

        return () => controller.abort();
    }, []);



    const categories = [
        "Wszystkie",
        ...PRODUCT_CATEGORIES,
    ];

    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return "";
        }

        if (imagePath.startsWith("http")) {
            return imagePath;
        }

        return `${API_URL}${imagePath}`;
    };

    const getCategoryCount = (category) => {
        if (category === "Wszystkie") {
            return products.length;
        }

        return products.filter(
            (product) =>
                product.category === category
        ).length;
    };

    const getWorksText = (count) => {
        if (count === 1) {
            return "pracę";
        }

        if (
            count % 10 >= 2 &&
            count % 10 <= 4 &&
            (count % 100 < 12 ||
                count % 100 > 14)
        ) {
            return "prace";
        }

        return "prac";
    };

    const filteredProducts = products.filter(
        (product) => {
            const categoryMatch =
                selectedCategory === "Wszystkie" ||
                product.category ===
                selectedCategory;

            const searchMatch = product.name
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                );

            return (
                categoryMatch && searchMatch
            );
        }
    );

    const sortedProducts = [
        ...filteredProducts,
    ].sort((a, b) => {
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
        <main>
            <section
                className="gallery-hero"
                style={{
                    backgroundImage: `linear-gradient(
                        rgba(0, 0, 0, 0.28),
                        rgba(0, 0, 0, 0.28)
                    ), url(${galleryHeroImage})`,
                }}
            >
                <div className="gallery-hero-content">
                    <h1>Galeria mozaik</h1>

                    <p>
                        Kolor, światło i detal.
                        Każda praca powstaje
                        tessera po tesserze.
                    </p>
                </div>
            </section>

            <section className="page gallery-page">
                <div className="category-filters">
                    {categories.map(
                        (category) => (
                            <button
                                key={category}
                                className={
                                    selectedCategory ===
                                    category
                                        ? "active-category"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                            >
                                {category} (
                                {getCategoryCount(
                                    category
                                )}
                                )
                            </button>
                        )
                    )}
                </div>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Szukaj mozaiki..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />
                </div>

                <div className="sort-box">
                    <label>Sortuj: </label>

                    <select
                        value={sortOption}
                        onChange={(event) =>
                            setSortOption(
                                event.target.value
                            )
                        }
                    >
                        <option value="default">
                            Domyślnie
                        </option>

                        <option value="name-asc">
                            Nazwa A-Z
                        </option>

                        <option value="name-desc">
                            Nazwa Z-A
                        </option>

                        <option value="price-asc">
                            Cena rosnąco
                        </option>

                        <option value="price-desc">
                            Cena malejąco
                        </option>
                    </select>
                </div>

                <p className="products-count">
                    {sortedProducts.length === 0
                        ? "Nie znaleziono prac"
                        : `Znaleziono ${
                            sortedProducts.length
                        } ${getWorksText(
                            sortedProducts.length
                        )}`}
                </p>

                <div className="products">
                    {sortedProducts.length ===
                        0 && (
                            <div className="empty-category">
                                <h2>
                                    Prace w przygotowaniu
                                </h2>

                                <p>
                                    Aktualnie nie ma
                                    jeszcze prac w tej
                                    kategorii. Zapraszamy
                                    ponownie wkrótce.
                                </p>
                            </div>
                        )}

                    {sortedProducts.map(
                        (product) => (
                            <div
                                className="product-card"
                                key={product.id}
                            >
                                {product.isNew && (
                                    <div className="product-badge">
                                        NOWOŚĆ
                                    </div>
                                )}

                                <Link
                                    to={`/product/${product.id}`}
                                >
                                    {product.images &&
                                    product.images
                                        .length >
                                    0 ? (
                                        <img
                                            src={getImageUrl(
                                                product
                                                    .images[0]
                                            )}
                                            alt={
                                                product.name
                                            }
                                        />
                                    ) : (
                                        <div className="product-no-image">
                                            Brak zdjęcia
                                        </div>
                                    )}
                                </Link>

                                <h3>
                                    {product.name}
                                </h3>

                                <p className="product-category">
                                    {
                                        product.category
                                    }
                                </p>

                                <p className="product-price">
                                    {product.price} zł
                                </p>

                                <Link
                                    to={`/product/${product.id}`}
                                >
                                    <button>
                                        Zobacz pracę
                                    </button>
                                </Link>
                            </div>
                        )
                    )}
                </div>
            </section>
        </main>
    );
}

export default Gallery;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API_URL from "../config/api";
import galleryHeroImage from "../assets/tlo_gallery.jpg";

function Archive() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const isProduction =
            process.env.NODE_ENV === "production";

        const productsUrl = isProduction
            ? "/api/products"
            : `${API_URL}/api/products`;

        async function loadProducts() {
            try {
                setLoading(true);
                setLoadError("");

                const response = await fetch(productsUrl, {
                    signal: controller.signal
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
                        "Błąd pobierania archiwum:",
                        error
                    );

                    setLoadError(
                        "Nie udało się pobrać archiwum. " +
                        "Spróbuj odświeżyć stronę."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => controller.abort();
    }, []);

    // W Archiwum znajdują się tylko
    // opublikowane prace sprzedane.
    const archivedProducts = products.filter(
        (product) => product.saleStatus === "sold"
    );

    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return "";
        }

        if (imagePath.startsWith("http")) {
            return imagePath;
        }

        return `${API_URL}${imagePath}`;
    };

    // Zachowujemy optymalizację Cloudinary
    // stosowaną w Galerii.
    const getThumbnailUrl = (imagePath) => {
        const originalUrl = getImageUrl(imagePath);

        if (!originalUrl) {
            return "";
        }

        try {
            const url = new URL(originalUrl);

            if (
                url.hostname !== "res.cloudinary.com" ||
                !url.pathname.includes("/image/upload/")
            ) {
                return originalUrl;
            }

            url.pathname = url.pathname.replace(
                "/image/upload/",
                "/image/upload/f_auto,q_auto,w_800,c_limit/"
            );

            return url.toString();
        } catch (error) {
            console.error(
                "Błąd optymalizacji zdjęcia:",
                error
            );

            return originalUrl;
        }
    };

    return (
        <main>
            <section
                className="gallery-hero"
                style={{
                    backgroundImage: `linear-gradient(
                        rgba(0, 0, 0, 0.28),
                        rgba(0, 0, 0, 0.28)
                    ), url(${galleryHeroImage})`
                }}
            >
                <div className="gallery-hero-content">
                    <h1>Archiwum</h1>

                    <p>
                        Prace, które znalazły swoje miejsce
                    </p>
                </div>
            </section>

            <section className="page gallery-page">
                <div
                    style={{
                        maxWidth: "850px",
                        margin: "0 auto 45px",
                        textAlign: "center"
                    }}
                >
                    <h2>
                        Prace, które znalazły swoje miejsce
                    </h2>

                    <p>
                        Każda mozaika ma swoją historię.
                        W archiwum prezentujemy prace,
                        które trafiły już do nowych
                        właścicieli. Choć nie są dostępne
                        do zakupu, pozostają częścią
                        artystycznej opowieści Ars Coloris
                        — inspiracją i świadectwem
                        spotkania koloru, formy i detalu.
                    </p>
                </div>

                {loading ? (
                    <p className="products-count">
                        Ładowanie archiwum...
                    </p>
                ) : loadError ? (
                    <p
                        className="products-count"
                        role="alert"
                    >
                        {loadError}
                    </p>
                ) : archivedProducts.length === 0 ? (
                    <div className="empty-category">
                        <h2>
                            Archiwum czeka na pierwsze prace
                        </h2>

                        <p>
                            Wkrótce pojawią się tutaj
                            mozaiki, które znalazły
                            już swoje miejsce.
                        </p>
                    </div>
                ) : (
                    <>
                        <p className="products-count">
                            {archivedProducts.length === 1
                                ? "1 praca w archiwum"
                                : `${archivedProducts.length} prac w archiwum`}
                        </p>

                        <div className="products">
                            {archivedProducts.map((product) => (
                                <div
                                    className="product-card"
                                    key={product.id}
                                >
                                    <Link
                                        to={`/product/${product.id}`}
                                    >
                                        {product.images &&
                                        product.images.length > 0 ? (
                                            <img
                                                src={getThumbnailUrl(
                                                    product.images[0]
                                                )}
                                                alt={product.name}
                                                loading="lazy"
                                                decoding="async"
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
                                        {product.category}
                                    </p>

                                    <p className="product-availability">
                                        Znalazła swoje miejsce
                                    </p>

                                    <Link
                                        to={`/product/${product.id}`}
                                    >
                                        <button type="button">
                                            Zobacz szczegóły
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </main>
    );
}

export default Archive;

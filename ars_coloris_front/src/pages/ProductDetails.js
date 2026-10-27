
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ImageModal from "../components/ImageModal";
import API_URL from "../config/api";

const LOGO_IMAGE = `${API_URL}/uploads/logo/ars-coloris-logo.jpg`;

const preventPolishOrphans = (text = "") => {
    return text.replace(
        /(^|[\s([{„"'])((?:a|i|o|u|w|z))\s+/gi,
        "$1$2\u00A0"
    );
};

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalIndex, setModalIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadProduct() {
            try {
                setLoading(true);
                setLoadError("");
                setProduct(null);

                const response = await fetch(
                    `${API_URL}/api/products/${id}`,
                    {
                        signal: controller.signal
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Nie znaleziono produktu"
                    );
                }

                const foundProduct = await response.json();

                const productImages = Array.isArray(
                    foundProduct.images
                )
                    ? foundProduct.images
                    : [];

                const imagesWithLogo = [
                    ...productImages
                        .filter(Boolean)
                        .map((image) =>
                            image.startsWith("http")
                                ? image
                                : `${API_URL}${image}`
                        ),
                    LOGO_IMAGE
                ];

                setProduct({
                    ...foundProduct,
                    images: imagesWithLogo
                });

                setCurrentIndex(0);
                setModalIndex(null);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error(
                        "Błąd pobierania produktu:",
                        error
                    );

                    setLoadError(
                        "Nie udało się pobrać szczegółów pracy."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        return () => controller.abort();
    }, [id]);

    if (loading) {
        return (
            <div className="product-details">
                <p>Ładowanie pracy...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details">
                <h1>Nie znaleziono produktu</h1>
                {loadError && <p>{loadError}</p>}
            </div>
        );
    }

    const saleStatus = product.saleStatus || "available";

    const isSold = saleStatus === "sold";

    const saleStatusLabel =
        saleStatus === "sold"
            ? "Znalazła swoje miejsce"
            : saleStatus === "reserved"
                ? "Zarezerwowana"
                : "Dostępna";

    const showPrice =
        !isSold &&
        product.price !== undefined &&
        product.price !== null;

    const currentImage = product.images[currentIndex];

    const nextImage = () => {
        setCurrentIndex(
            (currentIndex + 1) % product.images.length
        );
    };

    const previousImage = () => {
        setCurrentIndex(
            currentIndex === 0
                ? product.images.length - 1
                : currentIndex - 1
        );
    };

    return (
        <div className="product-details">
            <div className="product-gallery">
                <div className="carousel">
                    <button
                        type="button"
                        className="carousel-arrow left"
                        onClick={previousImage}
                        aria-label="Poprzednie zdjęcie"
                    >
                        ‹
                    </button>

                    <img
                        src={currentImage}
                        alt={product.name}
                        className="product-main-image"
                        onClick={() =>
                            setModalIndex(currentIndex)
                        }
                    />

                    <button
                        type="button"
                        className="carousel-arrow right"
                        onClick={nextImage}
                        aria-label="Następne zdjęcie"
                    >
                        ›
                    </button>
                </div>

                <div className="product-thumbnails">
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className={
                                index === currentIndex
                                    ? "active-thumbnail"
                                    : ""
                            }
                            onClick={() =>
                                setCurrentIndex(index)
                            }
                        />
                    ))}
                </div>
            </div>

            <div className="product-info">
                <h1>{product.name}</h1>

                <div className="product-meta">
                    <p>
                        <strong>Kategoria:</strong>{" "}
                        {product.category}
                    </p>

                    <p>
                        <strong>Dostępność:</strong>{" "}
                        {saleStatusLabel}
                    </p>

                    {!isSold && product.deliveryTime && (
                        <p>
                            <strong>Czas realizacji:</strong>{" "}
                            {product.deliveryTime}
                        </p>
                    )}
                </div>

                <p className="artwork-label">
                    Mozaika autorska
                </p>

                {/* OPIS PRODUKTU — ZACHOWANIE AKAPITÓW */}
                <p className="product-description">
                    {preventPolishOrphans(
                        product.description || ""
                    )}
                </p>

                {showPrice && (
                    <h2>{product.price} zł</h2>
                )}

                {isSold && (
                    <p className="artwork-label">
                        Znalazła swoje miejsce
                    </p>
                )}
            </div>

            <ImageModal
                images={product.images}
                currentIndex={modalIndex}
                onClose={() =>
                    setModalIndex(null)
                }
                onNext={() =>
                    setModalIndex(
                        (modalIndex + 1) %
                        product.images.length
                    )
                }
                onPrevious={() =>
                    setModalIndex(
                        modalIndex === 0
                            ? product.images.length - 1
                            : modalIndex - 1
                    )
                }
            />
        </div>
    );
}

export default ProductDetails;

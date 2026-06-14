import { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import products from "../data/products";
import ImageModal from "../components/ImageModal";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();

    const product = products.find((item) => item.id === Number(id));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalImage, setModalImage] = useState(null);
	const [added, setAdded] = useState(false);
	const { addToCart } = useContext(CartContext);
	const handleAddToCart = () => {
		addToCart(product);
		setAdded(true);
		setTimeout(() => {
			setAdded(false);
		}, 1500);
	};

    if (!product) {
        return <h1>Nie znaleziono produktu</h1>;
    }

    const currentImage = product.images[currentIndex];

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % product.images.length);
    };

    const previousImage = () => {
        setCurrentIndex(
            currentIndex === 0 ? product.images.length - 1 : currentIndex - 1
        );
    };

    return (
        <div className="product-details">
            <div className="product-gallery">
                <div className="carousel">
                    <button className="carousel-arrow left" onClick={previousImage}>
                        ‹
                    </button>

                    <img
                        src={currentImage}
                        alt={product.name}
                        className="product-main-image"
                        onClick={() => setModalImage(currentImage)}
                    />

                    <button className="carousel-arrow right" onClick={nextImage}>
                        ›
                    </button>
                </div>

                <div className="product-thumbnails">
                    {product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className={index === currentIndex ? "active-thumbnail" : ""}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="product-info">
                <h1>{product.name}</h1>

                <div className="product-meta">
                    <p><strong>Kategoria:</strong> {product.category}</p>

                    <p>
                        <strong>Dostępność:</strong>
                        <span className="available"> ✓ {product.availability}</span>
                    </p>

                    <p><strong>Czas realizacji:</strong> {product.deliveryTime}</p>
                </div>

                <p>{product.description}</p>

                <h2>{product.price} zł</h2>

                <button 
					className={added ? "added-button" : ""}
					onClick={handleAddToCart}
				>
					{added ? "✓ Dodano" : "Dodaj do koszyka"}
				</button>
            </div>

            <ImageModal
                image={modalImage}
                onClose={() => setModalImage(null)}
            />
        </div>
    );
}

export default ProductDetails;
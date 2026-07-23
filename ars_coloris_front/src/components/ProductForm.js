import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function ProductForm({
                         productToEdit,
                         onProductAdded,
                         onProductUpdated,
                         onCancel
                     }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "Dekoracje",
        price: "",
        availability: "Dostępny",
        deliveryTime: "3-5 dni roboczych",
        description: ""
    });

    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    const isEditMode = Boolean(productToEdit);

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name || "",
                category: productToEdit.category || "Dekoracje",
                price: productToEdit.price || "",
                availability: productToEdit.availability || "Dostępny",
                deliveryTime:
                    productToEdit.deliveryTime || "3-5 dni roboczych",
                description: productToEdit.description || ""
            });

            setImages(productToEdit.images || []);
        }
    }, [productToEdit]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        if (imagePath.startsWith("http")) return imagePath;
        return `${API_URL}${imagePath}`;
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        setSelectedFiles(files);

        const previews = files.map((file) => ({
            file,
            url: URL.createObjectURL(file)
        }));

        setPreviewImages(previews);
    };

    const uploadImages = async (productId) => {
        if (selectedFiles.length === 0) {
            return null;
        }

        const uploadData = new FormData();

        selectedFiles.forEach((file) => {
            uploadData.append("images", file);
        });

        const response = await fetch(
            `${API_URL}/api/products/${productId}/images`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                body: uploadData
            }
        );

        return response.json();
    };

    const handleSetMainImage = async (imagePath) => {
        if (!productToEdit) {
            return;
        }

        const response = await fetch(
            `${API_URL}/api/products/${productToEdit.id}/main-image`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    imagePath
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            setImages(data.images);

            onProductUpdated({
                ...productToEdit,
                images: data.images
            });
        }
    };

    const handleDeleteImage = async (imagePath) => {
        if (!productToEdit) {
            return;
        }

        const response = await fetch(
            `${API_URL}/api/products/${productToEdit.id}/images`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    imagePath
                })
            }
        );

        const data = await response.json();

        if (response.ok) {
            setImages(data.images);
        }
    };

    const clearSelectedFiles = () => {
        previewImages.forEach((preview) => {
            URL.revokeObjectURL(preview.url);
        });

        setSelectedFiles([]);
        setPreviewImages([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            ...formData,
            price: Number(formData.price),
            images
        };

        const url = isEditMode
            ? `${API_URL}/api/products/${productToEdit.id}`
            : `${API_URL}/api/products`;

        const method = isEditMode ? "PUT" : "POST";

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Wystąpił błąd zapisu produktu.");
            return;
        }

        if (isEditMode) {
            const uploadResult = await uploadImages(productToEdit.id);

            if (uploadResult && uploadResult.product) {
                setImages(uploadResult.product.images || []);
                clearSelectedFiles();
                return;
            }

            onProductUpdated(data);
        } else {
            const newProduct = data.product;
            const uploadResult = await uploadImages(newProduct.id);

            if (uploadResult && uploadResult.product) {
                onProductAdded(uploadResult.product);
            } else {
                onProductAdded(newProduct);
            }
        }

        clearSelectedFiles();
    };

    return (
        <form
            className="product-form"
            onSubmit={handleSubmit}
        >
            <h2>
                {isEditMode ? "Edytuj produkt" : "Dodaj produkt"}
            </h2>

            <input
                name="name"
                placeholder="Nazwa produktu"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
            >
                <option>Mozaiki ścienne</option>
                <option>Stoliki mozaikowe</option>
                <option>Mozaiki ogrodowe</option>
            </select>

            <input
                name="price"
                type="number"
                placeholder="Cena"
                value={formData.price}
                onChange={handleChange}
                required
            />

            <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
            >
                <option>Dostępny</option>
                <option>Na zamówienie</option>
                <option>Niedostępny</option>
            </select>

            <input
                name="deliveryTime"
                placeholder="Czas realizacji"
                value={formData.deliveryTime}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Opis produktu"
                value={formData.description}
                onChange={handleChange}
                required
            />

            {isEditMode && images.length > 0 && (
                <div className="product-images-section">
                    <h3>Zdjęcia produktu</h3>

                    <div className="admin-images-list">
                        {images.map((image, index) => (
                            <div
                                className={`admin-image-item ${
                                    index === 0 ? "main-image-item" : ""
                                }`}
                                key={image}
                            >
                                <img
                                    src={getImageUrl(image)}
                                    alt="Zdjęcie produktu"
                                />

                                {index === 0 && (
                                    <div className="main-image-label">
                                        Zdjęcie główne
                                    </div>
                                )}

                                {index !== 0 && (
                                    <button
                                        type="button"
                                        className="main-image-button"
                                        onClick={() =>
                                            handleSetMainImage(image)
                                        }
                                    >
                                        Ustaw jako główne
                                    </button>
                                )}

                                <button
                                    type="button"
                                    className="delete-image-button"
                                    onClick={() => handleDeleteImage(image)}
                                >
                                    Usuń zdjęcie
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="product-images-section">
                <h3>Dodaj zdjęcia</h3>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {previewImages.length > 0 && (
                    <div className="selected-images-preview">
                        <p>
                            Wybrano plików: {previewImages.length}
                        </p>

                        <div className="preview-images-grid">
                            {previewImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="preview-image-item"
                                >
                                    <img
                                        src={image.url}
                                        alt={image.file.name}
                                    />

                                    <span>
                                        {image.file.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="product-form-actions">
                <button
                    className="save-product-button"
                    type="submit"
                >
                    {isEditMode ? "Zapisz zmiany" : "Zapisz produkt"}
                </button>

                <button
                    className="cancel-product-button"
                    type="button"
                    onClick={onCancel}
                >
                    Anuluj
                </button>
            </div>
        </form>
    );
}

export default ProductForm;
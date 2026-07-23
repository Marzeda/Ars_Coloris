import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import ConfirmModal from "../components/ConfirmModal";

const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

function Admin() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Nie udało się pobrać dzieł.");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Błąd pobierania dzieł:", error);
            });
    }, []);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) {
            return "";
        }

        if (imagePath.startsWith("http")) {
            return imagePath;
        }

        return `${API_URL}${imagePath}`;
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/agnieszka");
    };

    const handleAddClick = () => {
        setProductToEdit(null);
        setShowForm((currentValue) => !currentValue);
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setShowForm(true);
    };

    const handleProductAdded = (newProduct) => {
        setProducts((currentProducts) => [
            ...currentProducts,
            newProduct
        ]);

        setShowForm(false);
        setProductToEdit(null);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts((currentProducts) =>
            currentProducts.map((product) =>
                product.id === updatedProduct.id
                    ? updatedProduct
                    : product
            )
        );

        setShowForm(false);
        setProductToEdit(null);
    };

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setProductToDelete(null);
        setShowDeleteModal(false);
    };

    const confirmDeleteProduct = async () => {
        if (!productToDelete) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/products/${productToDelete.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(
                    data.message ||
                    "Nie udało się usunąć dzieła."
                );

                return;
            }

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) =>
                        product.id !== productToDelete.id
                )
            );

            closeDeleteModal();
        } catch (error) {
            console.error("Błąd usuwania dzieła:", error);
            alert("Nie udało się usunąć dzieła.");
        }
    };

    return (
        <div className="page">
            <h1>Panel Artysty</h1>

            <div className="admin-toolbar">
                <button
                    className="add-product-button"
                    onClick={handleAddClick}
                >
                    {showForm
                        ? "Ukryj formularz"
                        : "+ Dodaj dzieło"}
                </button>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Wyloguj
                </button>
            </div>

            {showForm && (
                <ProductForm
                    productToEdit={productToEdit}
                    onProductAdded={handleProductAdded}
                    onProductUpdated={handleProductUpdated}
                    onCancel={() => {
                        setShowForm(false);
                        setProductToEdit(null);
                    }}
                />
            )}

            <table className="admin-table">
                <thead>
                <tr>
                    <th>Zdjęcie</th>
                    <th>ID</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Cena</th>
                    <th>Akcje</th>
                </tr>
                </thead>

                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            {product.images &&
                            product.images.length > 0 ? (
                                <img
                                    src={getImageUrl(
                                        product.images[0]
                                    )}
                                    alt={product.name}
                                    className="admin-product-thumbnail"
                                />
                            ) : (
                                <div className="admin-no-image">
                                    Brak zdjęcia
                                </div>
                            )}
                        </td>

                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price} zł</td>

                        <td>
                            <button
                                className="edit-button"
                                onClick={() =>
                                    handleEditClick(product)
                                }
                            >
                                Edytuj
                            </button>

                            {" "}

                            <button
                                className="delete-button"
                                onClick={() =>
                                    openDeleteModal(product)
                                }
                            >
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Usuń dzieło"
                message={
                    productToDelete
                        ? `Czy na pewno chcesz usunąć dzieło „${productToDelete.name}”?`
                        : ""
                }
                onConfirm={confirmDeleteProduct}
                onCancel={closeDeleteModal}
            />
        </div>
    );
}

export default Admin;
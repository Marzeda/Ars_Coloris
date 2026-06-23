import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "../components/ProductForm";
import ConfirmModal from "../components/ConfirmModal";

const API_URL = "http://localhost:5000";

function Admin() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) =>
                console.error("Błąd pobierania produktów:", err)
            );
    }, []);

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
        navigate("/login");
    };

    const handleAddClick = () => {
        setProductToEdit(null);
        setShowForm(!showForm);
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setShowForm(true);
    };

    const handleProductAdded = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowForm(false);
        setProductToEdit(null);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts(
            products.map((product) =>
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
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (response.ok) {
                setProducts(
                    products.filter(
                        (product) => product.id !== productToDelete.id
                    )
                );

                closeDeleteModal();
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error("Błąd usuwania:", err);
            alert("Nie udało się usunąć produktu.");
        }
    };

    return (
        <div className="page">
            <h1>Panel administratora</h1>

            <div className="admin-toolbar">
                <button
                    className="add-product-button"
                    onClick={handleAddClick}
                >
                    {showForm ? "Ukryj formularz" : "+ Dodaj produkt"}
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
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={getImageUrl(product.images[0])}
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
                                onClick={() => handleEditClick(product)}
                            >
                                Edytuj
                            </button>

                            {" "}

                            <button
                                className="delete-button"
                                onClick={() => openDeleteModal(product)}
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
                title="Usuń produkt"
                message={
                    productToDelete
                        ? `Czy na pewno chcesz usunąć produkt „${productToDelete.name}”?`
                        : ""
                }
                onConfirm={confirmDeleteProduct}
                onCancel={closeDeleteModal}
            />
        </div>
    );
}

export default Admin;
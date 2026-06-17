function ImageModal({ images, currentIndex, onClose, onNext, onPrevious }) {
    if (!images || images.length === 0 || currentIndex === null) {
        return null;
    }

    const currentImage = images[currentIndex];

    const handleMouseMove = (event) => {
        const image = event.currentTarget;
        const rect = image.getBoundingClientRect();

        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        image.style.transformOrigin = `${x}% ${y}%`;
    };

    return (
        <div className="modal-overlay">
            <span className="modal-close" onClick={onClose}>
                ×
            </span>

            {images.length > 1 && (
                <button
                    className="modal-arrow modal-arrow-left"
                    onClick={onPrevious}
                >
                    ‹
                </button>
            )}

            <img
                src={currentImage}
                alt="Powiększona mozaika"
                className="modal-image zoomable-image"
                onMouseMove={handleMouseMove}
            />

            {images.length > 1 && (
                <button
                    className="modal-arrow modal-arrow-right"
                    onClick={onNext}
                >
                    ›
                </button>
            )}
        </div>
    );
}

export default ImageModal;
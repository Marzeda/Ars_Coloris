function ImageModal({ image, onClose }) {
    if (!image) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <span className="modal-close">×</span>

            <img
                src={image}
                alt="Powiększona grafika"
                className="modal-image"
                onClick={(event) => event.stopPropagation()}
            />
        </div>
    );
}

export default ImageModal;
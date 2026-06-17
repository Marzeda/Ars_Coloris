import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

function ImageModal({ images, currentIndex, onClose, onNext, onPrevious }) {
    if (!images || images.length === 0 || currentIndex === null) {
        return null;
    }

    const currentImage = images[currentIndex];

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

            <TransformWrapper
    initialScale={1}
    minScale={1}
    maxScale={5}
    centerOnInit
>
    <TransformComponent>
        <img
            src={currentImage}
            alt="Powiększona mozaika"
            className="modal-image"
        />
    </TransformComponent>
</TransformWrapper>

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
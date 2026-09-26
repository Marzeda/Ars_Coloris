import { useEffect } from "react";
import {
    TransformWrapper,
    TransformComponent,
} from "react-zoom-pan-pinch";

function ImageModal({
                        image,
                        images,
                        currentIndex,
                        onClose,
                        onNext,
                        onPrevious,
                    }) {
    const isSingleImage = Boolean(image);

    const imageList = isSingleImage
        ? [image]
        : images || [];

    const activeIndex = isSingleImage
        ? 0
        : currentIndex;

    const isOpen =
        imageList.length > 0 &&
        activeIndex !== null &&
        activeIndex !== undefined;

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (
                !isSingleImage &&
                imageList.length > 1 &&
                event.key === "ArrowRight" &&
                onNext
            ) {
                onNext();
            }

            if (
                !isSingleImage &&
                imageList.length > 1 &&
                event.key === "ArrowLeft" &&
                onPrevious
            ) {
                onPrevious();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

            document.body.style.overflow = "";
        };
    }, [
        isOpen,
        isSingleImage,
        imageList.length,
        onClose,
        onNext,
        onPrevious,
    ]);

    if (!isOpen) {
        return null;
    }

    const currentImage = imageList[activeIndex];

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-label={
                isSingleImage
                    ? "Powiększone logo Ars Coloris"
                    : "Powiększone zdjęcie mozaiki"
            }
        >
            <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Zamknij"
            >
                ×
            </button>

            {!isSingleImage &&
                imageList.length > 1 &&
                onPrevious && (
                    <button
                        type="button"
                        className="modal-arrow modal-arrow-left"
                        onClick={onPrevious}
                        aria-label="Poprzednie zdjęcie"
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
                        alt={
                            isSingleImage
                                ? "Logo Ars Coloris"
                                : "Powiększona mozaika"
                        }
                        className={
                            isSingleImage
                                ? "modal-image modal-logo-image"
                                : "modal-image"
                        }
                    />
                </TransformComponent>
            </TransformWrapper>

            {!isSingleImage &&
                imageList.length > 1 &&
                onNext && (
                    <button
                        type="button"
                        className="modal-arrow modal-arrow-right"
                        onClick={onNext}
                        aria-label="Następne zdjęcie"
                    >
                        ›
                    </button>
                )}
        </div>
    );
}

export default ImageModal;
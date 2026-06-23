function ConfirmModal({
                          isOpen,
                          title,
                          message,
                          onConfirm,
                          onCancel
                      }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="confirm-modal">
                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-modal-actions">
                    <button
                        className="modal-cancel-button"
                        onClick={onCancel}
                    >
                        Anuluj
                    </button>

                    <button
                        className="modal-delete-button"
                        onClick={onConfirm}
                    >
                        Usuń
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
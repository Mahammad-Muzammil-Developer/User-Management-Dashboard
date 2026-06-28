export const ConfirmDelete = ({ isOpen, onConfirm, onCancel, userName = "", isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button className="close-btn" onClick={onCancel}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            Are you sure you want to delete <strong>{userName}</strong>? This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button
            className="btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn-delete"
            onClick={onConfirm}
            disabled={isLoading}
            style={{ background: isLoading ? "#ccc" : "#f44336" }}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

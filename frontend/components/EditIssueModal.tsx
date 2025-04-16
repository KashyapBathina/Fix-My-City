import React from "react";

interface IssueData {
  issueName: string;
  location: string;
  zip?: string;
  description?: string;
  // Removed status field because the server does not update status via PATCH
}

interface EditIssueModalProps {
  show: boolean;
  issue: IssueData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditIssueModal: React.FC<EditIssueModalProps> = ({
  show,
  issue,
  onChange,
  onClose,
  onSubmit,
}) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h4 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Edit Issue
        </h4>

        <form onSubmit={onSubmit}>
          {/* Only include fields that the server accepts */}
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <label
              htmlFor="location"
              style={{ display: "block", fontWeight: "bold" }}
            >
              Address
            </label>
            <input
              id="location"
              type="text"
              value={issue.location}
              onChange={onChange}
              required
              style={{
                display: "block",
                margin: "0.5rem auto",
                width: "80%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* New field for Zip */}
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <label
              htmlFor="zip"
              style={{ display: "block", fontWeight: "bold" }}
            >
              Zip
            </label>
            <input
              id="zip"
              type="text"
              value={issue.zip || ""}
              onChange={onChange}
              style={{
                display: "block",
                margin: "0.5rem auto",
                width: "80%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <label
              htmlFor="description"
              style={{ display: "block", fontWeight: "bold" }}
            >
              Description
            </label>
            <textarea
              id="description"
              value={issue.description}
              onChange={onChange}
              rows={3}
              style={{
                display: "block",
                margin: "0.5rem auto",
                width: "80%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditIssueModal;

interface IssueData {
  firstName: string;
  lastName: string;
  phone: string;
  issueName: string;
  location: string;
  zip?: string;
  description?: string;
  status?: string;
  image?: File; // Add this for the file object
}

interface AddIssueModalProps {
  show: boolean;
  newIssue: IssueData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview?: string;
}

const AddIssueModal: React.FC<AddIssueModalProps> = ({
  show,
  newIssue,
  onChange,
  onImageChange,
  onClose,
  onSubmit,
  imagePreview
}) => {
  if (!show) return null;

  const inputs = [
    //{ id: "firstName", label: "First Name", required: true },
    //{ id: "lastName", label: "Last Name", required: true },
    //{ id: "phone", label: "Phone", required: false },
    { id: "issueName", label: "Issue", required: true },
    { id: "location", label: "Address", required: true },
    { id: "zip", label: "Zip", required: false },
  ];

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
        if (e.target === e.currentTarget) {
          onClose();
        }
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
          maxHeight: "90vh",
          overflowY: "auto"
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
          Add Problem
        </h4>

        <form onSubmit={onSubmit}>
          {inputs.map(({ id, label, required }) => (
            <div key={id} style={{ marginBottom: "1rem", textAlign: "center" }}>
              <label htmlFor={id} style={{ display: "block", fontWeight: "bold" }}>
                {label} {required && <span style={{ color: "red" }}>*</span>}
              </label>
              <input
                id={id}
                name={id}
                type="text"
                value={(newIssue as any)[id]}
                onChange={onChange}
                required={required}
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
          ))}

          {/* Image Upload Field */}
          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <label htmlFor="image" style={{ display: "block", fontWeight: "bold" }}>
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              style={{
                display: "block",
                margin: "0.5rem auto",
                width: "80%",
              }}
            />
            {imagePreview && (
              <div style={{ 
                margin: "0.5rem auto", 
                width: "80%", 
                textAlign: "center" 
              }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: "100%", 
                    maxHeight: "150px", 
                    borderRadius: "4px" 
                  }} 
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <label htmlFor="description" style={{ display: "block", fontWeight: "bold" }}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newIssue.description}
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

          <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
            <label htmlFor="status" style={{ display: "block", fontWeight: "bold" }}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newIssue.status}
              onChange={onChange}
              style={{
                display: "block",
                margin: "0.5rem auto",
                width: "80%",
                padding: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIssueModal;

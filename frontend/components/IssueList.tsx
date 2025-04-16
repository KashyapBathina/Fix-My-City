import React, { useState } from "react";
import "../css/Issues.css";

interface IssueData {
  IssueId: number;
  firstName: string;
  lastName: string;
  phone: string;
  issueName: string;
  location: string;
  zip?: string;
  description?: string;
  status?: string;
  ImageUrl?: string;
  imageData?: string;
}

interface Props {
  issues: IssueData[];
  onDelete: (issueId: number) => void;
  onEdit: (issue: IssueData) => void;
  getStaticMapUrl: (address: string, zip?: string) => string;
}

const IssueList: React.FC<Props> = ({
  issues,
  onDelete,
  onEdit,
  getStaticMapUrl,
}) => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <div className="issue-cards">
        {issues.map((issue, index) => {
          const mapUrl = getStaticMapUrl(issue.location, issue.zip);

          return (
            <div
              key={index}
              className="issue-card w3-white w3-padding w3-margin-bottom"
              style={{
                display: "flex",
                flexWrap: "wrap",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {/* Left column - image + map */}
              <div
                style={{
                  flex: "1 1 150px",
                  paddingRight: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {issue.imageData ? (
                  <img
                    src={issue.imageData}
                    alt="Issue"
                    onClick={() => openModal(issue.imageData!)}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "6px",
                      objectFit: "cover",
                      marginBottom: "10px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <div style={{ fontStyle: "italic", color: "#888" }}>
                    No Image
                  </div>
                )}

                {/* Clickable map */}
                <img
                  src={mapUrl}
                  alt="Location Map"
                  onClick={() => openModal(mapUrl)}
                  style={{
                    maxWidth: "200px",
		    maxHeight: "140px",
                    borderRadius: "6px",
                    objectFit: "cover",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                />
              </div>

              {/* Center column - issue name and description */}
              <div style={{ flex: "2 1 300px", paddingRight: "20px" }}>
                <h5 style={{ margin: "0 0 10px 0", color: "#222" }}>
                  {issue.issueName}
                </h5>
                <p style={{ margin: 0 }}>
                  {issue.description || "No description provided."}
                </p>
              </div>

              {/* Right column - metadata and actions */}
              <div
                style={{
                  flex: "1 1 200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p style={{ margin: "5px 0" }}>
                  <strong>Address:</strong> {issue.location}
                </p>
                {issue.zip && (
                  <p style={{ margin: "5px 0" }}>
                    <strong>Zip:</strong> {issue.zip}
                  </p>
                )}
                <p style={{ margin: "5px 0" }}>
                  <strong>Phone:</strong> {issue.phone}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status-tag status-${issue.status?.toLowerCase()}`}
                  >
                    {issue.status}
                  </span>
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Reporter:</strong> {issue.firstName} {issue.lastName}
                </p>

                <div style={{ marginTop: "10px" }}>
                  <button
                    className="w3-button w3-small w3-blue"
                    style={{ marginRight: "5px" }}
                    onClick={() => onEdit(issue)}
                  >
                    Edit
                  </button>
                  <button
                    className="w3-button w3-small w3-red"
                    onClick={() => onDelete(issue.IssueId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for both image and map */}
      {modalImage && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <img
  src={modalImage}
  alt="Expanded View"
  style={{
    maxWidth: "60%",
    maxHeight: "70%",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  }}
/>

        </div>
      )}
    </>
  );
};

export default IssueList;



//import React, { useState, useEffect } from "react";
import AddIssueModal from "./AddIssueModal";
import EditIssueModal from "./EditIssueModal";
import IssueList from "./IssueList";
import { useState, useEffect } from "react";
import axios from "axios"; // Make sure axios is installed



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
  imageData?: string;
}

const Issue: React.FC = () => {
  const [issues, setIssues] = useState<IssueData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // New state for zip search
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);



  const [zipSearchTerm, setZipSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<IssueData | null>(null);

  const [newIssue, setNewIssue] = useState<IssueData>({
    IssueId: 0,
    firstName: "",
    lastName: "",
    phone: "",
    issueName: "",
    location: "",
    zip: "",
    description: "",
    status: "New",
  });









  useEffect(() => {
    // Initial fetch using main search (empty string loads all issues)
    fetchIssues("");
  }, []);









  const fetchIssues = async (search: string) => {
    try {
      const response = await fetch("/api/searchIssue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search }),
      });

      const data = await response.json();

      if (!data.error && data.results) {
      const mapped = data.results.map((issue: any) => ({
        IssueId: issue.IssueId,
        issueName: issue.issueName || issue.Title, // Handle both field names
        description: issue.description || issue.Description,
        location: issue.location || issue.Address,
        zip: issue.zip || issue.Zip,
        phone: issue.phone || "N/A",
        status: issue.status || issue.Status || "New",
        imageData: issue.imageData || issue.ImageUrl,
        firstName: issue.firstName || "User", // Make sure these match your DB fields
        lastName: issue.lastName || `#${issue.IssueId}`,
      }));


        setIssues(mapped);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };










  // New function to fetch issues by zip code
  const fetchZipIssues = async (zip: string) => {
    if (!zip) {
      fetchIssues("");
      return;
    }
    try {
      const response = await fetch("/api/searchByZip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip }),
      });
      const data = await response.json();
      if (!data.error && data.results) {
        const mapped = data.results.map((issue: any) => ({
          IssueId: issue.IssueId,
          issueName: issue.Title,
          description: issue.Description,
          location: issue.Address,
          zip: issue.Zip,
          phone: "N/A",
          status: issue.Status || "New",
          imageData: issue.ImageUrl,
          firstName: "User",
          lastName: `#${issue.IssueId}`,
        }));
        setIssues(mapped);
      }
    } catch (error) {
      console.error("Error fetching issues by zip:", error);
    }
  };








  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Clear the zip search if a main search is performed
    setZipSearchTerm("");
    fetchIssues(e.target.value);
  };











  // Handler for zip search field change
  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value;
    setZipSearchTerm(zip);
    // When zip search is used, clear the main search term
    setSearchTerm("");
    fetchZipIssues(zip);
  };

  const openModal = () => setShowModal(true);
  















  const handleNewIssueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setNewIssue((prev) => ({ ...prev, [id]: value }));
  };










const handleAddIssue = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newIssue.issueName || !newIssue.location || !newIssue.description) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");

    // Create FormData object to send multipart/form-data
    const formData = new FormData();
    
    // Append all issue data with the correct field names that match your server
    formData.append('userId', userData.id);
    // Use the field names your server expects
    formData.append('firstName', userData.firstName || ''); // Use user data
    formData.append('lastName', userData.lastName || '');
    formData.append('issueName', newIssue.issueName);
    formData.append('description', newIssue.description);
    formData.append('location', newIssue.location);
    formData.append('phone', userData.phone || 'N/A');
    if (newIssue.zip) formData.append('zip', newIssue.zip);
    
    // Append image if available
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    const response = await fetch("/api/addIssue", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!data.error) {
      alert("Issue has been reported successfully.");
      closeModal();
      setImageFile(null);
      setImagePreview(null);
      fetchIssues("");
    } else {
      alert("Error adding issue: " + data.error);
    }
  } catch (error) {
    alert("Error connecting to server.");
    console.error(error);
  }
};





const closeModal = () => {
  setShowModal(false);
  setImageFile(null);
  setImagePreview(null);
  setNewIssue({
    IssueId: 0,
    firstName: "",
    lastName: "",
    phone: "",
    issueName: "",
    location: "",
    zip: "",
    description: "",
    status: "New",
  });
};









  const handleDelete = async (issueId: number) => {
    if (!window.confirm("Are you sure you want to delete this issue?")) return;

    try {
      const response = await fetch("/api/deleteIssue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId }),
      });
      const data = await response.json();
      if (!data.error) {
        alert("Issue deleted successfully.");
        fetchIssues("");
      } else {
        alert("Error deleting issue: " + data.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error.");
    }
  };









  const handleEditClick = (issue: IssueData) => {
    setEditTarget(issue);
    setShowEditModal(true);
  };








  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (editTarget) {
      setEditTarget({ ...editTarget, [id]: value });
    }
  };











  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;

    try {
      const response = await fetch("/api/editIssue", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issueId: editTarget.IssueId,
          description: editTarget.description,
          address: editTarget.location, // sending location as address
          zip: editTarget.zip,            // include zip in the update
          imageUrl: editTarget.imageData,
        }),
      });

      const data = await response.json();
      if (!data.error) {
        alert("Issue updated successfully.");
        setShowEditModal(false);
        fetchIssues("");
      } else {
        alert("Error updating issue: " + data.error);
      }
    } catch (error) {
      console.error("Edit error:", error);
      alert("Server error.");
    }
  };



	


const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};





// Define the getStaticMapUrl function
const getStaticMapUrl = (address: string, zip?: string): string => {
  const fullAddress = zip ? `${address}, ${zip}` : address;
  const encodedAddress = encodeURIComponent(fullAddress);
  // The API key should be in quotes as it's part of the URL string
  return `https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=15&size=300x200&maptype=roadmap&markers=color:red%7C${encodedAddress}&key=AIzaSyBdsWHtFC2LAZ6qtn_GyglGoFe-eXwjM_I`;
};










  return (
    <div className="w3-container w3-margin-top">
      <div className="row align-items-center" style={{ marginBottom: "20px" }}>
        {/* Main search bar for city problems */}
        <div className="col-md-7" style={{ paddingRight: "10px" }}>
          <input
            className="form-control"
            type="text"
            placeholder="Search for City Problems..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {/* New smaller search bar for zip search */}
        <div className="col-md-3" style={{ paddingRight: "10px" }}>
          <input
            className="form-control"
            type="text"
            placeholder="Search by Zip"
            value={zipSearchTerm}
            onChange={handleZipChange}
          />
        </div>
        <div className="col-md-2" style={{ paddingLeft: "0px" }}>
          <button
            onClick={openModal}
            className="w3-button"
            style={{
              backgroundColor: "#c17767",
              color: "#fff",
              width: "100%",
              padding: "10px",
            }}
          >
            Add Problem
          </button>
        </div>
      </div>

      <IssueList 
      issues={issues} 
      onDelete={handleDelete} 
      onEdit={handleEditClick} 
      getStaticMapUrl={getStaticMapUrl}
      />


      <AddIssueModal
      show={showModal}
      newIssue={newIssue}
      onChange={handleNewIssueChange}
      onClose={closeModal}
      onSubmit={handleAddIssue}
      onImageChange={handleImageChange}
      imagePreview={imagePreview || undefined}
      />


      {editTarget && (
        <EditIssueModal
          show={showEditModal}
          issue={editTarget}
          onChange={handleEditChange}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default Issue;

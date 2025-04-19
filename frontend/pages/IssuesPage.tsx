import React from "react";
import Sidebar from "../components/Sidebar";
import Issue from "../components/Issue";
import PageTitle from "../components/PageTitle";
import LoggedInName from "../components/LoggedInName";

function doLogout(event: any): void {
    event.preventDefault();
    localStorage.removeItem("user_data")
    window.location.href = '/';
};

const IssuePage: React.FC = () => {
  return (
    <>
      <PageTitle title="City Dashboard" />
      <Sidebar />
      {/* Top blue bar */}
      <div
         className="w3-bar"
         style={{
         backgroundColor: "#5baeb2",
         color: "#fff",
         padding: "10px 20px",
         position: "fixed",
         top: 0,
         left: 0,
         width: "100%",
         zIndex: 1000,
         display: "flex",  // Added flex display
         justifyContent: "center",  // Center the content horizontally
         alignItems: "center",  // Center vertically
     }}
     >
        <div style={{
          position: "relative",
          textAlign: "center",
        }}>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            City Problem Dashboard
          </span>
        </div>
        
        {/* Position logout button absolutely to the right */}
        <div id="loggedInDiv" style={{
          position: "absolute",
          right: "20px",
          top: "50%", 
          transform: "translateY(-50%)"  // Center vertically within the header
        }}>
          <button type="button" id="logoutButton" className="buttons"
              onClick={doLogout}> Log Out </button>
        </div>
      </div>
      
      {/* Main content */}
      <div
        className="w3-main"
        style={{
          marginLeft: 300,
          marginTop: 0,
          padding: 0,
        }}
      >
        <div className="w3-container" style={{ padding: "80px 20px 20px" }}>
          <Issue />
        </div>
      </div>
    </>
  );
};
export default IssuePage;
import React, { useEffect, useState } from "react";
import LoggedInName from "./LoggedInName";

const Sidebar: React.FC = () => {
  // Optional clock state
  const [time, setTime] = useState<string>("");
  
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds} AM`);
    };
    
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <nav
      className="w3-sidebar w3-collapse w3-animate-left"
      style={{
        zIndex: 1,
        width: 300,
        position: "fixed",
        left: 0,
        top: 40,
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#b5d379", // the greenish color
      }}
      id="mySidebar"
    >
      {/* Top user section */}
      <div className="w3-container" style={{ padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <img
              src="https://www.w3schools.com/w3images/avatar3.png"
              style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%",
                marginRight: "25px"
              }}
              alt="User Avatar"
            />
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center"
          }}>
            <span style={{fontWeight: "bold", fontSize: "1.4rem", color: "#000" }}>
              Welcome!
            </span>
            <span style={{ fontWeight: "bold", fontSize: "1.4rem", color: "#000" }}>
              <LoggedInName />
            </span>
          </div>
        </div>
        
        {/* Icons section - centered horizontally */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          padding: "10px 0",
          marginBottom: "20px"
        }}>
          <a href="#" style={{ margin: "0 20px", color: "#000" }}>
            <i className="fa fa-envelope" style={{ fontSize: "24px" }} />
          </a>
          <a href="#" style={{ margin: "0 20px", color: "#000" }}>
            <i className="fa fa-user" style={{ fontSize: "24px" }} />
          </a>
          <a href="#" style={{ margin: "0 20px", color: "#000" }}>
            <i className="fa fa-cog" style={{ fontSize: "24px" }} />
          </a>
        </div>
      </div>
      
      <hr style={{ margin: "0", borderColor: "rgba(0,0,0,0.1)" }} />
      
      {/* Time display */}
      <div
        className="w3-container"
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#000",
          padding: "20px 0"
        }}
      >
        {time}
      </div>
      
      {/* Settings section */}
      <div className="w3-bar-block" >
        <div 
          className="w3-bar-item w3-padding" 
          style={{ 
            cursor: "default", 
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
	   
            justifyContent: "flex-start"
          }}
        >
          <i className="fa fa-cog fa-fw" style={{ marginLeft: " 10px", marginRight: "10px" }} /> 
          Settings
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

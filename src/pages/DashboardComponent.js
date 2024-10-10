import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axiosInstance from "../axiosInstance";

const DashboardComponent = () => {
  const navigate = useNavigate();
  const store = useAuthStore();
  const username = store.userName;
  const [lookerLink, setLookerLink] = useState("");
  const [additionalLookerLink, setAdditionalLookerLink] = useState(null);

  useEffect(() => {
    const fetchLookerLink = async () => {
      try {
        const response = await axiosInstance.get(`/auth/user-link/${username}`);
        setLookerLink(response.data.lookerLink);
        if (response.data.additionalLookerLink) {
          setAdditionalLookerLink(response.data.additionalLookerLink);
        }
      } catch (error) {
        console.error("Error fetching Looker link:", error);
      }
    };

    fetchLookerLink();
  }, [username]);

  const handleLogout = () => {
    store.addToken("");
    store.addUser("");
    navigate("/"); // Redirect to login page
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>

      {username && <h1 style={styles.greeting}>Welcome {username}!</h1>}

      {lookerLink ? (
        <iframe
          title="Looker Table"
          width="800"
          height="650"
          src={lookerLink}
          frameborder="0"
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        ></iframe>
      ) : (
        <p>No data found! Please contact administrator for more details.</p>
      )}

      {additionalLookerLink && (
        <div style={styles.sidebar}>
          <a
            href={additionalLookerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Additional Report
          </a>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "#6a1b9a",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  greeting: {
    fontSize: "24px",
    color: "#6a1b9a",
    marginBottom: "20px",
  },
  sidebar: {
    position: "absolute",
    top: "100px",
    left: "20px",
    backgroundColor: "#e0e0e0",
    padding: "10px",
    borderRadius: "5px",
  },
};

export default DashboardComponent;

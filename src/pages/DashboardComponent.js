import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const DashboardComponent = () => {
  const navigate = useNavigate();
  const store = useAuthStore();
  const username = store.userName;

  // Logout function: clears localStorage and redirects to the login page

  const handleLogout = () => {
    // localStorage.clear(); // Clear all stored data
    store.addToken("");
    store.addUser("");
    navigate("/"); // Redirect to login page
  };

  return (
    <div style={styles.container}>
      {/* Logout Button */}
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>

      {username && (
        <h1 style={styles.greeting}>Hey {username}, welcome back!</h1>
      )}

      <iframe
        title="Outward Hound"
        width="800"
        height="650"
        src="https://lookerstudio.google.com/embed/reporting/30c4671b-07c7-42dc-8aae-f35fb4dbf62b/page/p_xhxvhkcljd"
        frameborder="0"
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
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
  iframe: {
    width: "80%",
    height: "500px",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default DashboardComponent;

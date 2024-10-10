import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axiosInstance from "../axiosInstance";

const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const store = useAuthStore();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      alert("Registration successful!");
      setEmail("");
      setPassword("");
      setUsername("");
      setIsloading(false);
      setIsRegistering(false);
      // Switch back to login after registration
    } catch (error) {
      alert(error.response.data);
      setIsloading(false);

      console.error("Registration error", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const { token, username } = response.data;
      // Store token and username in localStorage
      store.addToken(token);
      store.addUser(username);
      //   localStorage.setItem("token", token);
      //   localStorage.setItem("username", username);
      setIsloading(false);
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      alert(error.response.data);
      setIsloading(false);
      console.error("Login error", error);
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    axiosInstance
      .post("/auth/google-login", {
        token: credentialResponse.credential,
      })
      .then((response) => {
        const { token, username } = response.data;
        // localStorage.setItem("token", token);
        // localStorage.setItem("username", username);

        store.addToken(token);
        store.addUser(username);

        navigate("/dashboard"); // Redirect after successful Google login
      })
      .catch((error) => {
        debugger;
        console.error("Google login error", error);
      });
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>{isRegistering ? "Register" : "Login"}</h1>

          {isRegistering ? (
            <form onSubmit={handleRegister} style={styles.form}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                style={styles.input}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={styles.input}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={styles.input}
              />
              <button
                type="submit"
                style={{
                  ...styles.button,
                  opacity: isLoading ? 0.5 : 1,
                  pointerEvents: isLoading ? "none" : "all",
                }}
              >
                Register
              </button>
              <p style={styles.switchText}>
                Already have an account?{" "}
                <span
                  onClick={() => setIsRegistering(false)}
                  style={styles.link}
                >
                  Login
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} style={styles.form}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                style={styles.input}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                style={styles.input}
              />
              <button
                type="submit"
                style={{
                  ...styles.button,
                  opacity: isLoading ? 0.5 : 1,
                  pointerEvents: isLoading ? "none" : "all",
                }}
              >
                Login
              </button>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                  console.log("Google Login Failed");
                }}
                style={styles.googleButton}
              />
              <p style={styles.switchText}>
                Don't have a google account?{" "}
                <span
                  onClick={() => setIsRegistering(true)}
                  style={styles.link}
                >
                  Register
                </span>
              </p>
            </form>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "24px",
    color: "#6a1b9a",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#6a1b9a",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#6a1b9a",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#8e44ad",
  },
  googleButton: {
    marginTop: "15px",
  },
  switchText: {
    marginTop: "15px",
    textAlign: "center",
  },
  link: {
    color: "#6a1b9a",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default AuthComponent;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthComponent from "./pages/AuthComponent";
import DashboardComponent from "./pages/DashboardComponent";
import { useAuthStore } from "./store/authStore";

function App() {
  if (process.env.REACT_APP_ENV === "production") {
    console.log = function () {};
  }

  const store = useAuthStore();
  console.log("store");
  let routes = (
    <React.Fragment>
      <Route path="/" element={<AuthComponent />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </React.Fragment>
  );
  if (store.userName) {
    routes = (
      <React.Fragment>
        <Route path="/dashboard" element={<DashboardComponent />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </React.Fragment>
    );
  }
  return (
    <Router>
      <Routes>{routes}</Routes>
    </Router>
  );
}

export default App;

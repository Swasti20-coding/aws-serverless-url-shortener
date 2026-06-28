import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Verify from "./components/Verify";
import { getUser } from "./services/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // login -> signup -> verify
  const [page, setPage] = useState("login");

  // used after signup
  const [email, setEmail] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getUser();
      setUser(currentUser);
    } catch (err) {
      setUser(null);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div
        style={{
          background: "#0D0D0D",
          color: "white",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  // Logged In
  if (user) {
    return <Dashboard />;
  }

  // Verify Email Screen
  if (page === "verify") {
    return (
      <Verify
        email={email}
        onSuccess={() => setPage("login")}
      />
    );
  }

  // Signup Screen
  if (page === "signup") {
    return (
      <Signup
        onLogin={() => setPage("login")}
        onVerify={(userEmail) => {
          setEmail(userEmail);
          setPage("verify");
        }}
      />
    );
  }

  // Login Screen
  return (
    <Login
      onSignup={() => setPage("signup")}
      onLoginSuccess={checkUser}
    />
  );
}

export default App;
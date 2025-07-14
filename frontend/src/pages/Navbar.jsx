import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import StepByStepGuide from "../pages/StepByStepGuide"; // ✅ Import the guide
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = React.useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = React.useState(false); // ✅ Guide state

  React.useEffect(() => {
    const authStatus = searchParams.get("auth");
    const userData = searchParams.get("user");

    if (authStatus === "success" && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        localStorage.setItem("user", JSON.stringify(parsedUser));
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [searchParams, navigate]);

  const login = () => navigate("/login");

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.clear();
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="navbar">  
        <div className="nav-logo">
  <div className="logo-icon">
    <span>W</span>
  </div>
  <span className="logo-text">WalmartWise</span>
</div>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          {user ? (
            <button onClick={logout} className="navbar-button">Logout</button>
          ) : (
            <button onClick={login} className="navbar-button">Login</button>
          )}
        </div>
      </nav>

      {/* Step-by-step guide modal */}
      <StepByStepGuide open={showGuide} onClose={() => setShowGuide(false)} />
    </>
  );
};

export default Navbar;

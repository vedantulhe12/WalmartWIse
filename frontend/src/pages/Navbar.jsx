import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import UserMenu from "./UserMenu";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = React.useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const authStatus = searchParams.get("auth");
    const userData = searchParams.get("user");

    if (authStatus === "success" && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    // ✅ Check localStorage for logged-in user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [searchParams, navigate]);

  // ✅ Navigate to /login
  const login = () => navigate("/login");

  // ✅ Clear session
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">WalmartWise</h1>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/guide" className="navbar-link">Step-by-Step</Link>
        {user ? (
          <UserMenu user={user} logout={logout} />
        ) : (
          <button onClick={login} className="navbar-button">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

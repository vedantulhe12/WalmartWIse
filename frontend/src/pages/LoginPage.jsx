// src/pages/LoginPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebase";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 🚀 Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          isGuest: false,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Guest",
        email: null,
        isGuest: true,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to WalmartWise</h1>
      <p className="text-gray-300 mb-8 text-center">
        Sign in with Google or continue as guest to explore your selected store.
      </p>

      <button
        onClick={handleGoogleLogin}
        className="bg-white text-black font-medium px-6 py-2 rounded shadow hover:scale-105 transition mb-4 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>

      <button
        onClick={handleGuest}
        className="border border-gray-400 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default LoginPage;

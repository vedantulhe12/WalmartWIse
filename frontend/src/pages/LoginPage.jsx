import React, { useState, useEffect } from 'react';
import { 
  Visibility, 
  VisibilityOff, 
  Email, 
  Lock, 
  AutoAwesome, 
  ShoppingCart 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Manual login submitted:', { email, password });
  };

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
      alert("Google login failed. See console for details.");
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

  const styles = `
    /* Import Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    /* Reset and Base Styles */
    * {
      font-family: 'Poppins', sans-serif;
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      cursor: default;
    }

    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3730a3 100%);
      position: relative;
      overflow: hidden;
    }

    /* Background Elements */
    .background-elements {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .bg-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
    }

    .bg-blob-1 {
      top: 80px;
      left: 80px;
      width: 288px;
      height: 288px;
      background: rgba(59, 130, 246, 0.2);
      animation: pulse 4s ease-in-out infinite;
    }

    .bg-blob-2 {
      bottom: 80px;
      right: 80px;
      width: 384px;
      height: 384px;
      background: rgba(251, 191, 36, 0.1);
      animation: pulse 4s ease-in-out infinite 1s;
    }

    .bg-blob-3 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 256px;
      height: 256px;
      background: rgba(99, 102, 241, 0.15);
      animation: pulse 4s ease-in-out infinite 0.5s;
    }

    /* Floating Particles */
    .floating-particles {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      background: rgba(251, 191, 36, 0.3);
      border-radius: 50%;
      animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    /* Main Content */
    .main-content {
      position: relative;
      z-index: 10;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .content-wrapper {
      width: 100%;
      max-width: 448px;
    }

    /* Logo Section */
    .logo-section {
      text-align: center;
      margin-bottom: 32px;
      transform: translateY(40px);
      opacity: 0;
      transition: all 1s ease-out;
    }

    .logo-section.loaded {
      transform: translateY(0);
      opacity: 1;
    }

    .logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
    }

    .logo-icon {
      position: relative;
    }

    .cart-icon {
      width: 48px !important;
      height: 48px !important;
      color: #fbbf24;
      margin-right: 8px;
    }

    .sparkles-icon {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 24px !important;
      height: 24px !important;
      color: #fde047;
      animation: pulse 2s ease-in-out infinite;
    }

    .main-title {
      font-size: 2.25rem;
      font-weight: 700;
      color: white;
      margin-bottom: 8px;
      background: linear-gradient(to right, #ffffff, #fef3c7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #d1d5db;
      font-size: 1.125rem;
      margin: 0;
    }

    /* Login Card */
    .login-card {
      backdrop-filter: blur(16px);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 32px;
      transform: translateY(40px);
      opacity: 0;
      transition: all 1s ease-out 0.3s;
    }

    .login-card.loaded {
      transform: translateY(0);
      opacity: 1;
    }

    .card-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: white;
      margin-bottom: 8px;
    }

    .card-subtitle {
      color: #d1d5db;
      margin: 0;
    }

    /* Form Container */
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Input Groups */
    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af !important;
      width: 20px !important;
      height: 20px !important;
      font-size: 20px !important;
      transition: color 0.3s ease;
      z-index: 1;
    }

    .input-group:focus-within .input-icon {
      color: #fbbf24 !important;
    }

    .form-input {
      width: 100%;
      padding: 12px 16px 12px 48px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      font-size: 16px;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
      cursor: text;
    }

    .form-input::placeholder {
      color: #9ca3af;
    }

    .form-input:focus {
      outline: none;
      border-color: #fbbf24;
      box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
    }

    .password-input {
      padding-right: 48px;
    }

    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      transition: color 0.3s ease;
      z-index: 1;
      padding: 4px;
      border-radius: 4px;
    }

    .password-toggle:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    .toggle-icon {
      width: 20px !important;
      height: 20px !important;
      font-size: 20px !important;
    }

    /* Form Options */
    .form-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.875rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
      color: #d1d5db;
      cursor: pointer;
    }

    .checkbox {
      margin-right: 8px;
      cursor: pointer;
      accent-color: #fbbf24;
    }

    .forgot-password {
      background: none;
      border: none;
      color: #fbbf24;
      cursor: pointer;
      transition: color 0.3s ease;
      font-size: 0.875rem;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .forgot-password:hover {
      color: #fde047;
      background: rgba(251, 191, 36, 0.1);
    }

    /* Login Button */
    .login-button {
      width: 100%;
      padding: 12px 0;
      background: linear-gradient(to right, #2563eb, #4f46e5);
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .login-button:hover {
      background: linear-gradient(to right, #1d4ed8, #4338ca);
      transform: scale(1.05);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
    }

    /* Divider */
    .divider {
      display: flex;
      align-items: center;
      margin: 24px 0;
    }

    .divider-line {
      flex: 1;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }

    .divider-text {
      padding: 0 16px;
      color: #9ca3af;
      font-size: 0.875rem;
    }

    /* Social Buttons */
    .social-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .social-button {
      width: 100%;
      padding: 12px 0;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      color: white;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
    }

    .google-button {
      background: rgba(255, 255, 255, 0.1);
    }

    .google-button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .guest-button {
      background: rgba(251, 191, 36, 0.2);
      border-color: rgba(251, 191, 36, 0.4);
      color: #fef3c7;
    }

    .guest-button:hover {
      background: rgba(251, 191, 36, 0.3);
      transform: scale(1.05);
    }

    .button-content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .google-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    /* Sign Up Link */
    .signup-link {
      text-align: center;
      color: #d1d5db;
      font-size: 0.875rem;
      margin-top: 24px;
    }

    .signup-button {
      background: none;
      border: none;
      color: #fbbf24;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .signup-button:hover {
      color: #fde047;
      background: rgba(251, 191, 36, 0.1);
    }

    /* Footer */
    .footer {
      text-align: center;
      margin-top: 32px;
      transform: translateY(40px);
      opacity: 0;
      transition: all 1s ease-out 0.6s;
    }

    .footer.loaded {
      transform: translateY(0);
      opacity: 1;
    }

    .footer-text {
      color: #9ca3af;
      font-size: 0.875rem;
      margin: 0;
    }

    /* Material-UI Icon Overrides */
    .MuiSvgIcon-root {
      color: inherit !important;
    }

    /* Animations */
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }

    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Responsive Design */
    @media (max-width: 640px) {
      .main-content {
        padding: 16px;
      }
      
      .login-card {
        padding: 24px;
      }
      
      .main-title {
        font-size: 1.875rem;
      }
      
      .subtitle {
        font-size: 1rem;
      }
      
      .bg-blob-1 {
        width: 200px;
        height: 200px;
        top: 40px;
        left: 40px;
      }
      
      .bg-blob-2 {
        width: 250px;
        height: 250px;
        bottom: 40px;
        right: 40px;
      }
      
      .bg-blob-3 {
        width: 180px;
        height: 180px;
      }
    }

    @media (max-width: 480px) {
      .form-options {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }
      
      .main-title {
        font-size: 1.5rem;
      }
      
      .card-title {
        font-size: 1.25rem;
      }
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="login-container">
        <div className="background-elements">
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-wrapper">
            {/* Logo Section */}
            <div className={`logo-section ${isLoaded ? 'loaded' : ''}`}>
              <div className="logo-container">
                <div className="logo-icon">
                  <ShoppingCart className="cart-icon" />
                  <AutoAwesome className="sparkles-icon" />
                </div>
              </div>
              <h1 className="main-title">WalmartWise</h1>
              <p className="subtitle">Intelligent Shopping, Elevated Experience</p>
            </div>

            {/* Login Card */}
            <div className={`login-card ${isLoaded ? 'loaded' : ''}`}>
              <div className="card-header">
                <h2 className="card-title">Welcome Back</h2>
                <p className="card-subtitle">Sign in to your account</p>
              </div>

              <div className="form-container">
                {/* Email Field */}
                <div className="input-group">
                  <Email className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                {/* Password Field */}
                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <VisibilityOff className="toggle-icon" /> : <Visibility className="toggle-icon" />}
                  </button>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="form-options">
                  <label className="remember-me">
                    <input type="checkbox" className="checkbox" />
                    Remember me
                  </label>
                  <button className="forgot-password">
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleSubmit}
                  className="login-button"
                >
                  Sign In
                </button>
              </div>

              {/* Divider */}
              <div className="divider">
                <div className="divider-line"></div>
                <span className="divider-text">or</span>
                <div className="divider-line"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="social-buttons">
                <button
                  className="social-button google-button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <div className="button-content">
                    <svg className="google-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {loading ? "Signing in..." : "Continue with Google"}
                  </div>
                </button>

                <button
                  className="social-button guest-button"
                  onClick={handleGuest}
                >
                  Continue as Guest
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="signup-link">
                Don't have an account?{' '}
                <button className="signup-button">
                  Sign up
                </button>
              </p>
            </div>

            {/* Footer */}
            <div className={`footer ${isLoaded ? 'loaded' : ''}`}>
              <p className="footer-text">
                © 2025 WalmartWise. Powered by AI Innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
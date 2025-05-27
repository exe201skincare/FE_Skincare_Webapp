import { useState } from 'react';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../features/Auth/useAuth';

import { Box } from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack, ArrowForward, Mail, Lock } from '@mui/icons-material';

import "./LoginPage.css";
import GoogleIcon from '../../assets/24px.svg';
import FaceIcon from '../../assets/F-32px.svg';
import GoogleLogo from '../../assets/272px-Google_2015_logo.png';
import Logo from "/logo skincare 2.svg";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [switched, setSwitched] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClick = () => {
    setSwitched(!switched);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      sessionStorage.setItem("GG-username", result.user.displayName);
      navigate("/role-selection");
    } catch (error) {
      console.error("Google Login Failed:", error);
      setError("Failed to login. Please try again.");
    }
  };

  const handleNormalLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(username, password);

      if (user) {
        console.log(`User ${user} has logged in`);
        setTimeout(() => {
          navigate('/'/*role === "ADMIN" ? "/AdminPage/UserManagement" : "/HomePage"*/);
        }, 100);
      }
    } catch (error) {
      console.error("Login Failed:", error);
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <div className='loginContainer'>
      <Box className={switched ? "signinBox" : "signinBox away"}>
        <div className='signinLable'>
          Account
        <span>Create your account credentials</span>  
        </div>
        <form onSubmit={handleNormalLogin}>
          <div className="input-field">
            <label><Mail/> Email address</label>
            <input
              className="input"
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label><Lock /> Password</label>
            <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <div className="input-field">
            <label><Lock /> Confirm Password</label>
            <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className='loginButton' type="submit">
            Continue <ArrowForward />
          </button>
        </form>
      </Box> 
        
      <Box className={switched ? "usernamePassLoginBox away" : "usernamePassLoginBox"}>
        <div className='loginLable'>
          Log in to your account
        </div>
        <form onSubmit={handleNormalLogin}>
          <div className="input-field">
            <label><Mail/> Email address</label>
            <input
              className="input"
              type="text"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label><Lock /> Password</label>
            <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className={`passToggle ${showPassword ? 'hide' : 'show'}`} onClick={togglePasswordVisibility}>  
                <Visibility className={showPassword ? 'show' : ''}/> <VisibilityOff className={showPassword ? '' : 'hide'}/>
              </div>
            </div>
          {error && <p className="error-message">{error}</p>}
          <button className='loginButton' type="submit">
            Continue <ArrowForward />
          </button>
        </form>
      </Box>
      <div className="account-seperation" style={{userSelect: 'none' }} >
        <div className='line' />Or continue with<div className='line' />
      </div>
      <div className='loginMethods' >
        <button onClick={handleGoogleLogin} className='GoogleLoginButton'>
          <img src={GoogleIcon} alt='Google Icon' className='GGIcon' /> Google
        </button>
        <button onClick={handleGoogleLogin} className='FaceLoginButton'>
          <img src={FaceIcon} alt='Face Icon' className='GGIcon' /> Facebook
        </button>
      </div>
      

      <div className="account-toggle" style={{userSelect: 'none' }} >
        {switched ?
          (<><div className='line' />Already have an account? <span onClick={handleClick} style={{cursor: 'pointer'}}>Login here</span><div className='line' /> </> )
            :
          (<><div className='line' />Don't have an account? <span onClick={handleClick} style={{cursor: 'pointer'}}>Sign in</span><div className='line' /> </> )
        }
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowBack />
      </button>
    </div>
  );
}
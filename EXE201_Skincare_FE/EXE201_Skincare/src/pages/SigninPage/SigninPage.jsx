import { useState } from 'react';
import { auth, provider } from "../../firebase";
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../features/Auth/useAuth';

import { Box } from '@mui/material';
import { Visibility, VisibilityOff, ArrowForward, Mail, Lock } from '@mui/icons-material';

import "../LoginPage/LoginPage.css";
import { useNavigate } from 'react-router-dom';

export default function SigninPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const togglePasswordConfirmVisibility = () => {
        setShowPasswordConfirm((prev) => !prev);
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
        
        } catch (error) {
        console.error("Sign in Failed:", error);
        setError("Failed to sign in. Please try again.");
        }
    };
    return (
        <>
            <div className='signinLable'>
                Account
                <span>Create your account credentials</span>
            </div>
            <form onSubmit={handleSignin}>
                <div className="input-field">
                    <label><Mail /> Email address</label>
                    <input
                        className="input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field">
                    <label><Lock /> Password</label>
                    <div className="passInput">
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
                </div>
                <div className="input-field">
                    <label><Lock /> Confirm Password</label>
                    <div className="passInput">
                        <input
                            className="input"
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="Enter your password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                        <div className={`passToggle ${showPasswordConfirm ? 'hide' : 'show'}`} onClick={togglePasswordConfirmVisibility}>  
                        <Visibility className={showPasswordConfirm ? 'show' : ''}/> <VisibilityOff className={showPasswordConfirm ? '' : 'hide'}/>
                        </div>
                    </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button className='loginButton' type="submit">
                    Continue <ArrowForward />
                </button>
            </form>
        </>
    )
}

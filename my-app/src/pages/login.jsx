import React from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const signin = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/expensetracker");
  };

  return (
    <div className="loginheading">
      <h1 style={{ fontSize: 80 }}>Welcome to Expense Tracker</h1>
      <div className="login">
        <p>Sign In</p>
        <button onClick={signin} className="button">
          Sign In with Google
        </button>
      </div>
    </div>
  );
}

export default Login;

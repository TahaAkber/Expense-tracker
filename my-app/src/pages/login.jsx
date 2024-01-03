import React from 'react'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
function Login() {
            const navigate = useNavigate();

    const [user] = useAuthState(auth);
    const signin = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate("/expensetracker")
    }
  return (
      <div>
          <p>Sign In</p>
          <button onClick={signin}>Sign In with Google</button>
    </div>
  )
}

export default Login
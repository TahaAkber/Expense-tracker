import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
function Navbar() {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const signout = async () => {
        try {
            await signOut(auth)
            navigate('/')
        }
        catch (error) {
            console.log(error)
        }
    }
  return (
      <div >
          <div className='signout'> {user ? (<><Link to='/expensetracker' />
          <button onClick={signout} className='button'>SignOut</button>
          </>) :
            (<Link to='/' />)}
          </div>
          <div className='photo'> {user && (<div>
              <h1 >{user.displayName}'s Expense Tracker</h1>
              <img src={user.photoURL} width="50px" height="50px" style={{borderRadius:50}} className='profile'></img>
          </div>)}</div>
    </div>
  )
}

export default Navbar
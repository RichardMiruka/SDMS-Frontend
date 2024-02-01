import React, { useState } from "react";
import './login.css';
import { useNavigate, Link} from 'react-router-dom'

const RegisterPage = ({ onLogin }) => {
  const [user_type, setUsertype] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhonenumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError]= useState('');
    
    
  const navigate=useNavigate()
  const handleRegister=async()=>{
    try { const response=await fetch('https://ourapi/api/v1/User/create',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({username, password, email, phone_number}),
  }
  );
  const data=await response.json()
  if (response.ok){
    setMessage(data.message)
    setError('')
    navigate('/login')
  }
  else{
    setError(data.error)
    setMessage('')
  }  
    } catch (error) {
      setError('An error occurred, please do try again')
    }
  }


  return (
    <div>
    <img src="client/src/images/login.png" alt="logo"/>
    {message && <p>{message}</p>}
    {error && <p>{error}</p>}
      <form onSubmit={handleRegister}>
        <h1>Sign up</h1>
        <label>Username</label>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Email</label>
        <input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Phone Number</label>
        <input
          type='text'
          placeholder='phonenumber'
          value={phone_number}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <br />
        <div className="form-group">
        <label htmlFor="user_type">User-type</label>
        <select 
        id='user_type'
        value={user_type}
        onChange={(e) => setUsertype(e.target.value)}
        className="form-input">
          <option value=''>select user_type</option>
          <option value='organizer'>organizer</option>
          <option value='coach'>coach</option>
        </select>
        </div>
        <br />

        <button type='button' onClick={handleRegister}>Register</button>
        <br />
        Already Registered?<Link to="/login">login</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
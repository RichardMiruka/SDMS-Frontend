import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link} from 'react-router-dom'
import { faCheck, faTimes, faCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;


const RegisterPage = ({ onLogin }) => {
  const [first_name, setfirst_name] = useState('');
  const [errFN, setErrFN] = useState('');
  const firstNameRef = useRef(null);

  const [last_name, setlast_name] = useState('');
  const [errLN, setErrLN] = useState('');
  const lastNameRef = useRef(null);

  const [phone_number, setPhonenumber] = useState('');

  const [email, setEmail] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const emailRef = useRef(null)

  const [password, setPassword] = useState('');
  const [errPwd, setErrPwd] = useState('');
  const pwdRef = useRef(null);

  const [conPassword, setConPassword] = useState('');
  const [errConPwd, setErrConPwd] = useState(false)
  const conPwdRef = useRef(null);

  const [message, setMessage] = useState('')
  const [errmsg, setErrMsg] = useState('')
  const [isSubmited, setIsSubmitted] = useState(false)


  // const navigate=useNavigate()
  // const handleRegister=async()=>{
  //   try { const response=await fetch('https://ourapi/api/v1/User/create',{
  //   method:'POST',
  //   headers:{
  //     'Content-Type':'application/json'
  //   },
  //   body:JSON.stringify({username, password, email, phone_number}),
  // }
  // );
  // const data=await response.json()
  // if (response.ok){
  //   setMessage(data.message)
  //   setError('')
  //   navigate('/login')
  // }
  // else{
  //   setError(data.error)
  //   setMessage('')
  // }  
  //   } catch (error) {
  //     setError('An error occurred, please do try again')
  //   }
  // }
  
  const validate = () => {
    if (!first_name) {
      setErrFN('Missing first name');
    } 
    if (!last_name) {
      setErrLN('Missing last name');
    } 
    if (!email) {
      setErrEmail('Missing Email')
    } else {
      setErrEmail('')
    }
    if (!password) {
      setErrPwd('Missing password')
    }

    if (!conPassword) {
      setErrConPwd('Missing confirm password')
    } 
  }

  const handleEmailChange = (e) => {
    if (emailRef.current.value){
      setErrEmail('')
    }
    setEmail(e.target.value);
  }

  const handleFirstName = (e) => {
    if (firstNameRef.current.value){
      setErrFN('');
    }
    setfirst_name(e.target.value);
  }

  const handleLastName = (e) => {
    if (lastNameRef.current.value){
      setErrLN('');
    }
    setlast_name(e.target.value);
  }

  const handlePassword = (e) => {
    if (pwdRef.current.value){
      setErrPwd('');
      setErrMsg('')
    }
    setPassword(e.target.value);
  }
  const handlConPassword = (e) => {
    if (conPwdRef.current.value){
      setErrConPwd('');
      setErrMsg('')
    }
    setConPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (password !== conPassword) {
      setErrMsg('paswords do not match');
      // setMessage('form formitted successfully');
      // setIsSubmitted(true);
      // setTimeout(()=>{
      //   window.location.reload();
      // }, [3000])
    } else if (password === conPassword) {
      setMessage('form formitted successfully');
      reseState();
    } else {
      setErrMsg('paswords do not match');
      setPassword("");
      setConPassword("");
    }
  };

  const reseState = () => {
    setfirst_name('');
    setlast_name('');
    setEmail('');
    setPassword('')
    setConPassword('')
    setPhonenumber('')
  }

  return (
    <div className="bg-grey-100 h-screen flex items-center justify-center px-6 mb-12">
      <div>
          {/* <img src="client/src/images/login.png" alt="logo"/> */}
          {/* {message && <p>{message}</p>}
          {error && <p>{error}</p>} */}
            <p className="text-center bg-green-300 text-white rounded-md">{message}</p>
            <form  className="w-full"> {/*onSubmit={handleRegister} */}
              <h1 className="text-center mb-4">Please Sign up</h1>
              <div className="flex space-x-8">
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium text-grey-600">First Name</label>
                        <input
                          type='text'
                          id='first_name'
                          ref={firstNameRef}
                          placeholder='First name'
                          required
                          className="mt-1 p-2 border rounded-md"
                          value={first_name}
                          onChange={handleFirstName}
                        />
                        <p className="text-red-500">{errFN}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm font-medium text-grey-600">Last Name</label>
                        <input
                          type='text'
                          id='last_name'
                          ref={lastNameRef}
                          placeholder='First name'
                          required
                          className="mt-1 p-2 border rounded-md"
                          value={last_name}
                          onChange={handleLastName}
                        />
                        <p className="text-red-500">{errLN}</p>
                    </div>
              </div>
              <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-grey-600">Email</label>
                  <input
                    type='text'
                    id='email'
                    ref={emailRef}
                    autoComplete="off"
                    placeholder='abc@abc.com'
                    required
                    className={"mt-1 p-2 w-full border rounded-md"}
                    value={email}
                    onChange={handleEmailChange}
                  /> 
                <p className="text-red-500">{errEmail}</p>
              </div>
              <div className="mb-4">
                  <label htmlFor="phone_number" className="block text-sm font-medium text-grey-600">Phone Number</label>
                  <input
                    type='tel'
                    id='phone_number'
                    placeholder='+254 700 000 000'
                    className="mt-1 p-2 w-full border rounded-md"
                    value={phone_number}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="user_type">User-type</label>
                  <select 
                  id='user_type'
                  
                  // value={user_type}
                  // onChange={(e) => setUsertype(e.target.value)}
                  className="block w-full rounded-md text-sm fornt-medium text-grey-600">
                    <option value=''>select user_type</option>
                    <option value='organizer'>organizer</option>
                    <option value='participant'>participant</option>
                  </select>
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-grey-600">password</label>
                  <input
                    type='password'
                    id='password'
                    ref={pwdRef}
                    required
                    placeholder='password'
                    className="mt-1 p-2 w-full border rounded-md"
                    value={password}
                    onChange={handlePassword}                    
                  />
                  <p className="text-red-500">{errPwd}</p>
              </div>
              <div className="">
                  <label htmlFor="conPassword" className="block text-sm font-medium text-grey-600">confirm password</label>
                  <input
                    type='password'
                    id='coPassword'
                    ref={conPwdRef}
                    placeholder='Confirm password'
                    required
                    className="mt-1 p-2 w-full border rounded-md"
                    value={conPassword}
                    onChange={handlConPassword}
                  />
                  <p className="text-red-500">{errConPwd}</p>
              </div>
              <p className="text-center text-red-500">{errmsg}</p>
              <button type='submit' onClick={handleSubmit} className="bg-blue-700 text-white px-4 py-2 mb-4 mt-4 rounded-md" >Register</button>
              <br />
              <div>
                  Already Registered?<span className="text-blue-700 underline font-semibold"><Link to="/login">login</Link></span>
              </div>
            </form>
      </div>
    </div>
  );
};

export default RegisterPage;

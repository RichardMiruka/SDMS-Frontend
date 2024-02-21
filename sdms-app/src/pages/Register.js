import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;

const RegisterPage = () => {
  const [first_name, setfirst_name] = useState("");
  const [errFN, setErrFN] = useState("");
  const firstNameRef = useRef(null);

  const [last_name, setlast_name] = useState("");
  const [errLN, setErrLN] = useState("");
  const lastNameRef = useRef(null);

  const [phone_number, setPhonenumber] = useState("");

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const emailRef = useRef(null);

  const [password, setPassword] = useState("");
  const [errPwd, setErrPwd] = useState("");
  const pwdRef = useRef(null);

  const [conPassword, setConPassword] = useState("");
  const [errConPwd, setErrConPwd] = useState(false);
  const conPwdRef = useRef(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errmsg, setErrMsg] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone_number,
          password,
        }),
      });

      const data = await response.json();

      localStorage.setItem("userData", JSON.stringify(data));

      if (response.ok) {
        setMessage(data.message);
        setError("");
        navigate("/login");
      } else {
        setError(data.error);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred, please try again");
    }
  };

  const validate = () => {
    if (!first_name) setErrFN("Missing first name");
    else if (!last_name) setErrLN("Missing last name");
    else if (!email) setErrEmail("Missing Email");
    else if (!emailRegex.test(email)) setErrEmail("Invalid Email");
    else if (!password) setErrPwd("Missing password");
    else if (!passwordRegex.test(password)) setErrPwd("Invalid password");
    else if (!conPassword) setErrConPwd("Missing confirm password");
    else setIsValid(true);
  };

  const handleEmailChange = (e) => {
    if (emailRef.current.value) setErrEmail("");
    setEmail(e.target.value);
  };

  const handleFirstName = (e) => {
    if (firstNameRef.current.value) setErrFN("");
    setfirst_name(e.target.value);
  };

  const handleLastName = (e) => {
    if (lastNameRef.current.value) setErrLN("");
    setlast_name(e.target.value);
  };

  const handlePassword = (e) => {
    if (pwdRef.current.value) {
      setErrPwd("");
      setErrMsg("");
    }
    setPassword(e.target.value);
  };

  const handlConPassword = (e) => {
    if (conPwdRef.current.value) {
      setErrConPwd("");
      setErrMsg("");
    }
    setConPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (password !== conPassword) {
      setErrMsg("Passwords do not match");
      setPassword("");
      setConPassword("");
    } else if (password && conPassword && password === conPassword) {
      handleRegister();
      resetState();
    }
  };

  const resetState = () => {
    setfirst_name("");
    setlast_name("");
    setEmail("");
    setPassword("");
    setConPassword("");
    setPhonenumber("");
  };

  return (
    <div className="flex h-screen">
      {/* Image Section */}
      <div className="w-1/2 bg-gradient-to-r from-blue-400 via-purple-400 to-purple-700 flex items-center justify-center">
        <img
          src="/images/Tournament%20Brackets.jpg"
          alt="Tournament Brackets"
          className="object-cover w-3/4 h-3/4 rounded-xl"
        />
      </div>

      {/* Form Section */}
      <div className="w-1/2 bg-indigo-300 p-8">
        {message && (
          <p className="bg-green-500 shadow-md text-center text-white p-2 rounded-md mt-4">
            {message}
          </p>
        )}
        {error && (
          <p className="bg-red-500 shadow-md text-center text-white p-2 rounded-md mt-4">
            {error}
          </p>
        )}
        <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-700 px-20 mt-4 mb-10 rounded-xl">
          <form onSubmit={handleSubmit} className="w-full text-white">
            <h1 className="text-center mb-4 text-2xl font-bold pt-4">Sign up</h1>
            <div className="flex space-x-8">
              <div className="mb-4">
                <label htmlFor="first_name" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  ref={firstNameRef}
                  placeholder="First name"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value={first_name}
                  onChange={handleFirstName}
                />
                <p className="text-red-500">{errFN}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  ref={lastNameRef}
                  placeholder="Last name"
                  required
                  className="mt-1 p-2 border rounded-md w-full"
                  value={last_name}
                  onChange={handleLastName}
                />
                <p className="text-red-500">{errLN}</p>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                placeholder="abc@abc.com"
                required
                className="mt-1 p-2 border rounded-md w-full"
                value={email}
                onChange={handleEmailChange}
              />
              <p className="text-red-500">{errEmail}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                placeholder="+254 700 000 000"
                className="mt-1 p-2 border rounded-md w-full"
                value={phone_number}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="user_type">User-type</label>
              <select
                id="user_type"
                className="block w-full rounded-md text-sm fornt-medium"
              >
                <option value="">Select user_type</option>
                <option value="organizer">Organizer</option>
                <option value="participant">Participant</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={pwdRef}
                required
                placeholder="Password"
                className="mt-1 p-2 border rounded-md w-full"
                value={password}
                onChange={handlePassword}
              />
              <p className="text-red-500">{errPwd}</p>
            </div>
            <div className="">
              <label htmlFor="conPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="conPassword"
                ref={conPwdRef}
                placeholder="Confirm password"
                required
                className="mt-1 p-2 border rounded-md w-full"
                value={conPassword}
                onChange={handlConPassword}
              />
              <p className="text-red-500">{errConPwd}</p>
            </div>
            <p className="text-center text-red-500">{errmsg}</p>
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-2 mb-4 mt-4 rounded-md"
            >
              Register
            </button>
            <br />
            <div className="mb-8">
              Already Registered?{" "}
              <span className="text-blue-700 underline font-bold text-xl">
                <Link to="/login">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

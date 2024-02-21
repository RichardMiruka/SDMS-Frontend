import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const pwdRef = useRef(null);
  const mailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data["access_token"]);
        setMessage(data.message);
        setTimeout(() => {
          navigate("/tournament");
        }, 2000);
      } else {
        setError(data.error);
        setPassword("");
        pwdRef.current.focus();
      }
    } catch (error) {
      setError("An error occurred, please try again");
    }
  };

  useEffect(() => {
    mailRef.current.focus();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gradient-to-r from-gray-300 via-green-200 to-indigo-300 p-8">
        {/* Your image */}
        <img
          src="/images/Tournament%20Brackets.jpg"
          alt="Tournament Brackets"
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md bg-gradient-to-r from-blue-500 via-purple-400 to-purple-700 rounded-xl p-8">
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
          <form onSubmit={handleLogin}>
            <h1 className="text-center text-2xl font-bold mb-6">Log in</h1>
            <div className="mb-4">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                ref={mailRef}
                placeholder="Email"
                className="w-full p-2 rounded-md shadow-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={pwdRef}
                className="w-full p-2 rounded-md shadow-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded-sm" />
                <span className="text-white">Remember me</span>
              </div>
              <button
                type="submit"
                onClick={handleLogin}
                className="bg-blue-700 transition-all duration-300 hover:bg-blue-500 text-white px-8 py-2 rounded-md"
              >
                Login
              </button>
            </div>
            <div className="text-center text-white">
              Don't have an account?{" "}
              <span className="text-blue-700 underline font-bold text-md">
                <Link to="/register">Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

